import { Transaction } from "../models/TransactionModel.js";

export const getTransactions = async(req, res) => {
    const { userId } = req.user; 

    try {
        const transactions = await Transaction.find({ userId });
        res.status(200).json(transactions);
    }
    catch(error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong, Please try again!"});
    }
};

export const createTransaction = async(req, res) => {
    const { side, ticker, numberOfShares, PPS, date } = req.body;
    const { userId } = req.user;

    try {
        if(side !== "buy" && side !== "sell") {
            return res.status(400).json({error: "Invalid side option"});
        }

        if(typeof(ticker) !== "string" || ticker.length !== 4) {
            return res.status(400).json({error: "Wrong form of stock's ticker, e.g: 2222"});
        }

        if(numberOfShares <= 0) {
            return res.status(400).json({error: "You can't buy/sell less than 1 share"});
        }

        if(PPS <= 0) {
            return res.status(400).json({error: "You can't buy/sell less than 1 SAR Per PPS"});
        }

        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({error: "Invalid date provided"});
        }

        const tickersTransactions = await Transaction.find({ userId, ticker });

        if(side === "sell") {
            const avaliableShares = tickersTransactions.reduce((acc, t) => {
                return t.side === "buy" ? acc + t.numberOfShares : acc - t.numberOfShares;
            }, 0)

            if(avaliableShares - numberOfShares < 0) {
                return res.status(400).json({error: "You don't have the desired amount to sell"});
            }
        }

        const transaction = await Transaction.create({ side, ticker, numberOfShares, PPS, date, userId });
        res.status(201).json(transaction);
    }

    catch(error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong, Please try again!"});
    }
};