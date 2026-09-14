import express from 'express';
import { getSnapshot } from '../controllers/snapshotController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

export const snapshotRouter = express.Router();

// GET the User Snapshots
snapshotRouter.get("/", requireAuth, getSnapshot);