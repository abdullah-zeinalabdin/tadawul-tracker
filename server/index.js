import express from "express";
import 'dotenv/config'
import cors from "cors";
import mongoose from "mongoose";
import { transactionRouter } from "./routes/transaction.js";
import { quoteRouter } from "./routes/quote.js";
import { userRouter } from "./routes/user.js";

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(4000, () => {
            console.log("Listening on Port 4000");
        });
    }

    catch(error) {
        console.log(`Error While trying to connect to the DB, Status: ${error}`)
        process.exit(1);
    }
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRouter);
app.use("/quote", quoteRouter);
app.use("/user", userRouter)

startServer();
