export interface DailyPerformanceItem {
    ticker: string,
    domain: string | null,
    todayPrice: number,
    priceChangePercent: number,
    change: number,
}

export interface DailyPerformanceProps {
    dailyPerformance: DailyPerformanceItem[],
}