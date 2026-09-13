import cron from "node-cron";
import { User } from "../models/UserModel.js";
import { Transaction } from "../models/TransactionModel.js";
import { fetchMarketSummary, fetchQuote } from "../services/sahm.js";
import { Snapshot } from "../models/SnapshotModel.js";

export const runDailySnapshot = async() => {
    const users = await User.find({});

    const marketData = await fetchMarketSummary();
    const tasiValue = marketData.index_value;
    
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    for(const user of users) {
        const transactions = await Transaction.find({ userId: user._id });
        const grouped = transactions.reduce((acc, t) => {
            if (!acc[t.ticker]) {
                acc[t.ticker] = { shares: 0, totalCost: 0 };
            }

            const current = acc[t.ticker];

            if (t.side === "buy") {
                current.shares += t.numberOfShares;
                current.totalCost += t.numberOfShares * t.PPS;
            } else {
                const avgCost = current.totalCost / current.shares;
                current.shares -= t.numberOfShares;
                current.totalCost -= t.numberOfShares * avgCost;
            }

            return acc;
        }, {});

        const positions = Object.entries(grouped).map(([ticker, data]) => {
            return {
                ticker: ticker,
                shares: data.shares,
                avgCost: data.totalCost / data.shares,
            };
        });

        let walletValue = 0;
        for (const position of positions) {
            try {
                const priceData = await fetchQuote(position.ticker);
                walletValue += position.shares * priceData.price;
            }
            catch(error) {
                console.log(`Failed to fetch ${position.ticker} for user ${user._id}`, error);
                walletValue += position.shares * position.avgCost;
            }
        }

        try {
            await Snapshot.findOneAndUpdate(
                { userId: user._id, date },
                { userId: user._id, date, walletValue, tasiValue },
                { upsert: true, new: true },
            )
        }
        catch(error) {
            console.log(`Failed to save snapshot for user ${user._id}`, error);
        }
    }
}

cron.schedule("0 17 * * 0-4", runDailySnapshot, {
    timezone: "Asia/Dubai"
});