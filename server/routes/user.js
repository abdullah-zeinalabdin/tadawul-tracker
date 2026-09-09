import express from "express";
import { getMe, loginUser, logoutUser, registerUser } from "../controllers/userControllers.js";
import { requireAuth } from "../middlewares/requireAuth.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

userRouter.get("/me", requireAuth, getMe);