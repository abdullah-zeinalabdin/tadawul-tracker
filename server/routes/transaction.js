import express from 'express';
import { Transaction } from "../models/TransactionModel.js";

export const transactionRouter = express.Router();

// GET All Transactions
transactionRouter.get("/", async(_req,res) => {
    try {
        const transactions = await Transaction.find({});
        res.status(200).json(transactions);
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
});

// POST One Single Transaction
transactionRouter.post("/", async(req,res) => {
    const { side, ticker, numberOfShares, PPS, date } = req.body;

    try {
        const transaction = await Transaction.create({ side, ticker, numberOfShares, PPS, date });
        res.status(201).json(transaction);
    }

    catch(error) {
        res.status(400).json({error: error.message});
    }
});
