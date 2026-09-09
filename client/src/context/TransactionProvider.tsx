import { useEffect, useState, type ReactNode } from "react";
import type { Transaction } from "./types";
import { TransactionContext } from "./TransactionContext";
import { useAuth } from "./Authentication/useAuth";

interface TransactionProviderProps {
    children: ReactNode
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
    const { userData } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const addTransaction = (t: Transaction) => {
        setTransactions(prev => [...prev, t])
    }

    useEffect(() => {
        const resetTransactions = () => {
            setTransactions([]);
        }
        const fetchTransactions = async() => {
            try {
                const response = await fetch("http://localhost:4000/transactions", {
                method: "GET",
                credentials: "include"
                });

                const data = await response.json()
                if(!response.ok) {
                    console.log("Data fetch failed", data.error);
                    return;
                };

                setTransactions(data);
            }
            catch(error) {
                console.log("Fetch Failed", error);
            }
        }

        if(userData) {
            fetchTransactions();
        }

        else {
            resetTransactions();
        }
    }, [userData])
    return (
        <TransactionContext.Provider value={{transactions, addTransaction}}>
            { children }
        </TransactionContext.Provider>
    )
}