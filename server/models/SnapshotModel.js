import mongoose from "mongoose";

const Schema = mongoose.Schema;

const snapshotSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    walletValue: {
        type: Number,
        required: true,
    },
    tasiValue: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

snapshotSchema.index({ userId: 1, date: 1 }, { unique: true });

export const Snapshot = mongoose.model("Snapshot", snapshotSchema);