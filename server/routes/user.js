import express from "express";
import { getMe, loginUser, logoutUser, registerUser } from "../controllers/userControllers.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiter.js";

export const userRouter = express.Router();

userRouter.post("/register", registerLimiter, registerUser);

userRouter.post("/login", loginLimiter, loginUser);

userRouter.post("/logout", logoutUser);

userRouter.get("/me", requireAuth, getMe);