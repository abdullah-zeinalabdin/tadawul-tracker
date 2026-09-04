import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionControllers.js';

export const transactionRouter = express.Router();

// GET All Transactions
transactionRouter.get("/", getTransactions);

// POST One Single Transaction
transactionRouter.post("/", createTransaction);
