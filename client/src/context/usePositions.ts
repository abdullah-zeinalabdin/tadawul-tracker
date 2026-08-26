import { useMemo } from "react";
import derivePositions from "./derivePositions";
import { useTransactions } from "./useTransactions";

export const usePositions = () => {
    const { transactions } = useTransactions()
    const positions = useMemo(() => {
        return derivePositions(transactions);
    }, [transactions])
    return positions;
}