import type { Position } from "../../../context/derivePositions";
import type { TickerData } from "../../../context/usePrices";

interface ContributionItem {
    ticker: string;
    name: string;
    contribution: number;
}

export const deriveContributionToReturn = (positions: Position[], prices: Record<string, TickerData>): ContributionItem[] => {
    const contribution = positions.map((p) => {
        const priceData = prices[p.ticker];
        const currentPrice = priceData?.price ?? p.avgCost;
        const stockUnrealizedPL = (currentPrice - p.avgCost) * p.shares;

        return { ticker: p.ticker, name: priceData?.name_en ?? p.ticker, contribution: stockUnrealizedPL };
    });
    const sortedContribution = contribution.sort((a, b) => b.contribution - a.contribution);

    return sortedContribution;
};