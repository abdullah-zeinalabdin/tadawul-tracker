export interface Transaction {
    id: string,
    side: "buy" | "sell",
    ticker: string,
    numberOfShares: number,
    PPS: number,
    date: string,
}