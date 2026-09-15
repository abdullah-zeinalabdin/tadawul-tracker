import type { Transaction } from "./types";

interface Position {
    ticker: string,
    shares: number,
    avgCost: number,
}

const derivePositions = (transactions: Transaction[]): Position[] => {
    const grouped = transactions.reduce((acc, t) => {
        if (!acc[t.ticker]) {
            acc[t.ticker] = { shares: 0, totalCost: 0 };
        }

        const current = acc[t.ticker];

        if (t.side === "buy") {
            current.shares += t.numberOfShares;
            current.totalCost += t.numberOfShares * t.PPS;
        } else {
            const avgCost = current.totalCost / current.shares;
            current.shares -= t.numberOfShares;
            current.totalCost -= t.numberOfShares * avgCost;
        }

        return acc;
    }, {} as Record<string, { shares: number; totalCost: number }>);

    const positions: Position[] = Object.entries(grouped).filter(([, data]) => data.shares !== 0).map(([ticker, data]) => {
        return {
            ticker: ticker,
            shares: data.shares,
            avgCost: data.totalCost / data.shares,
        };
    });
    return positions;
} 

export default derivePositions;