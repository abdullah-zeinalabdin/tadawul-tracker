export interface Transaction {
    side: "buy" | "sell",
    ticker: string,
    numberOfShares: number,
    PPS: number,
    date: string,
}