import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/userControllers.js";
import { requireAuth } from "../middlewares/requireAuth.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/me", requireAuth, getMe);