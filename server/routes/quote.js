import express from 'express';
import { quoteByTicker } from '../controllers/quoteControllers.js';

export const quoteRouter = express.Router();

// GET one Single Quote Using Ticker
quoteRouter.get("/:ticker", quoteByTicker);