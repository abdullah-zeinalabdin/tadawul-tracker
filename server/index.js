import express from "express";
import 'dotenv/config'
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { transactionRouter } from "./routes/transaction.js";
import { quoteRouter } from "./routes/quote.js";
import { userRouter } from "./routes/user.js";
import { snapshotRouter } from "./routes/snapshot.js";

const port = process.env.PORT || 4000
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log("Listening on Port", port);
        });
    }

    catch(error) {
        console.log(`Error While trying to connect to the DB, Status: ${error}`)
        process.exit(1);
    }
}

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send("ok");
});

app.use("/transactions", transactionRouter);
app.use("/quote", quoteRouter);
app.use("/users", userRouter);
app.use("/snapshots", snapshotRouter);
startServer();
