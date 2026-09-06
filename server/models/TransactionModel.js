import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    side: {
        type: String,
        enum: ["buy", "sell"],
        required: true,
    },
    ticker: {
        type: String,
        required: true,
    },
    numberOfShares: {
        type: Number,
        required: true,
    },
    PPS: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

export const Transaction = mongoose.model("Transaction", transactionSchema);