import cron from "node-cron";
import { User } from "../models/UserModel.js";
import { Transaction } from "../models/TransactionModel.js";
import { fetchMarketSummary, fetchQuotes } from "../services/dataProvider.js";
import { Snapshot } from "../models/SnapshotModel.js";

export const runDailySnapshot = async() => {
    try {
        const users = await User.find({});

        const marketData = await fetchMarketSummary();
        const tasiValue = marketData.index_value;
        
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

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

            const positions = Object.entries(grouped).filter(([, data]) => data.shares !== 0).map(([ticker, data]) => {
                return {
                    ticker: ticker,
                    shares: data.shares,
                    avgCost: data.totalCost / data.shares,
                };
            });

            const positionsTickers = positions.map((p) => p.ticker);

            let unrealizedPL = 0;
            let totalCostBasis = 0;

            try {
                if(positionsTickers.length === 0) {
                    continue;
                }

                const priceData = await fetchQuotes(positionsTickers);

                positions.forEach((p) => {
                    const price = priceData[p.ticker]?.price;
                    if (price === undefined) {
                        throw new Error(`No price for ${p.ticker}`);
                    }
                    unrealizedPL += (price * p.shares) - (p.avgCost * p.shares);
                    totalCostBasis += (p.avgCost * p.shares);
                });
            }
            catch(error) {
                console.error(`Skipping snapshot for user ${user._id}`, error);
                continue;
            }

            try {
                await Snapshot.findOneAndUpdate(
                    { userId: user._id, date },
                    { userId: user._id, date, 
                    unrealizedPL: Number(unrealizedPL.toFixed(2)), 
                    totalCostBasis: Number(totalCostBasis.toFixed(2)), 
                    tasiValue },
                    { upsert: true },
                )
            }
            catch(error) {
                console.error(`Failed to save snapshot for user ${user._id}`, error);
            }
        }
    }
    catch(error) {
        console.error("Daily snapshot job failed entirely:", error);
    }
}

cron.schedule("0 17 * * 0-4", runDailySnapshot, {
    timezone: "Asia/Dubai"
});