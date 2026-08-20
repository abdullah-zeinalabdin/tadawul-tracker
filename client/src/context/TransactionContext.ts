import { createContext } from "react";
import type { Transaction } from "./types";

export interface TransactionContextType {
    transactions: Transaction[],
    addTransaction: (t: Transaction) => void
}

export const TransactionContext = createContext<TransactionContextType | null>(null)
