import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";

export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if(context === null) {
        throw Error("Not Using Provider");
    }
    else {
        return context;
    }
}