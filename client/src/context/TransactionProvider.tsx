import { useState, type ReactNode } from "react";
import type { Transaction } from "./types";
import { TransactionContext } from "./TransactionContext";

interface TransactionProviderProps {
    children: ReactNode
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const addTransaction = (t: Transaction) => {
        setTransactions(prev => [...prev, t])
    }
    return (
        <TransactionContext.Provider value={{transactions, addTransaction}}>
            { children }
        </TransactionContext.Provider>
    )
}