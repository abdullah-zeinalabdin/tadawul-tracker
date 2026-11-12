import type { Position } from "./derivePositions";
import type { TickerData } from "./usePrices";

export interface MainStats {
    totalValue: number;
    totalCost: number;
    unrealizedPL: number;
    unrealizedPLPercent: number;
    holdingsCount: number;
    dayChange: number;
    dayChangePercent: number;
}

export function deriveMainStats(
    positions: Position[],
    prices: Record<string, TickerData>
): MainStats {
    let totalValue = 0;
    let totalCost = 0;
    let dayChange = 0;
    let previousDayValue = 0;

    for (const position of positions) {
        const priceData = prices[position.ticker];
        const currentPrice = priceData?.price ?? position.avgCost;
        const marketValue = currentPrice * position.shares;
        const cost = position.avgCost * position.shares;

        totalValue += marketValue;
        totalCost += cost;

        const change = priceData?.change ?? 0;
        dayChange += change * position.shares;
        previousDayValue += (currentPrice - change) * position.shares;
    }

    const unrealizedPL = totalValue - totalCost;
    const unrealizedPLPercent = totalCost > 0 ? (unrealizedPL / totalCost) * 100 : 0;
    const dayChangePercent = previousDayValue > 0 ? (dayChange / previousDayValue) * 100 : 0;

    return {
        totalValue,
        totalCost,
        unrealizedPL,
        unrealizedPLPercent,
        holdingsCount: positions.length,
        dayChange,
        dayChangePercent,
    };
}