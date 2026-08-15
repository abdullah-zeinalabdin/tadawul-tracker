export interface DailyPerformanceItem {
    ticker: string,
    priceChange: number,
    percentage: number,
}

export interface DailyPerformanceProps {
    dailyPerformance: DailyPerformanceItem[],
}