import { Transaction } from "../models/TransactionModel.js";

export const getTransactions = async(req, res) => {
    const { userId } = req.user; 

    try {
        const transactions = await Transaction.find({ userId });
        res.status(200).json(transactions);
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
};

export const createTransaction = async(req, res) => {
    const { side, ticker, numberOfShares, PPS, date } = req.body;
    const { userId } = req.user; 

    try {
        const transaction = await Transaction.create({ side, ticker, numberOfShares, PPS, date, userId });
        res.status(201).json(transaction);
    }

    catch(error) {
        res.status(400).json({error: error.message});
    }
};