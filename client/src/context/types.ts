export interface Transaction {
    _id?: string,
    side: "buy" | "sell",
    ticker: string,
    numberOfShares: number,
    PPS: number,
    date: string,
}