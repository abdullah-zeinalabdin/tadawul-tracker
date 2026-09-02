export interface DailyPerformanceItem {
    ticker: string,
    todayPrice: number,
    priceChangePercent: number,
    change: number,
}

export interface DailyPerformanceProps {
    dailyPerformance: DailyPerformanceItem[],
}