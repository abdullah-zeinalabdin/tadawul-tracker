import express from "express";
import { triggerSnapshot } from "../controllers/internalController.js";

export const internalRouter = express.Router();

internalRouter.post("/run-snapshot", triggerSnapshot);