import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionControllers.js';
import { requireAuth } from '../middlewares/requireAuth.js';

export const transactionRouter = express.Router();

// GET All Transactions
transactionRouter.get("/", requireAuth, getTransactions);

// POST One Single Transaction
transactionRouter.post("/", requireAuth, createTransaction);
