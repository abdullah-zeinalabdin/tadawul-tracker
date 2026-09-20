import express from 'express';
import { quoteByTicker } from '../controllers/quoteControllers.js';
import { requireAuth } from '../middlewares/requireAuth.js';

export const quoteRouter = express.Router();

// GET one Single Quote Using Ticker
quoteRouter.get("/:ticker", requireAuth, quoteByTicker);