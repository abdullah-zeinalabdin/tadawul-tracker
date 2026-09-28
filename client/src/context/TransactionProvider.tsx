import { useEffect, useState, type ReactNode } from "react";
import type { Transaction } from "./types";
import { TransactionContext } from "./TransactionContext";
import { useAuth } from "./Authentication/useAuth";

interface TransactionProviderProps {
    children: ReactNode
}

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("VITE_API_URL is not set");
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
    const { userData } = useAuth();

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = async(t: Transaction) => {
        try {
            const response = await fetch(`${apiUrl}/transactions`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(t), 
            });

            const data = await response.json();

            if(!response.ok) {
                const error = new Error(`Error! Status: ${response.status}`) as Error & { status: number };
                error.status = response.status;
                console.error("Adding Transaction Failed!", data.error);
                throw error;
            }
            
            setTransactions(prev => [...prev, data]);
        }
        catch(error) {
            console.error("Adding Transaction Failed", error);
            throw error;
        }
    }

    useEffect(() => {
        const resetTransactions = () => {
            setTransactions([]);
        }
        const fetchTransactions = async() => {
            try {
                const response = await fetch(`${apiUrl}/transactions`, {
                method: "GET",
                credentials: "include"
                });

                const data = await response.json()
                if(!response.ok) {
                    throw new Error(`Error! Status: ${response.status}`);
                };

                setTransactions(data);
            }
            catch(error) {
                console.error("Fetch Failed", error);
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