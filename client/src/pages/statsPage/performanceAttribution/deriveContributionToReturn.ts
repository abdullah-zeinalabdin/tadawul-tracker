import type { Position } from "../../../context/derivePositions";
import type { TickerData } from "../../../context/usePrices";
import tickers from "../../../data/tickers.json";

export interface ContributionItem {
    ticker: string;
    name: string;
    costBasis: number;
    pl: number;
    returnPercent: number;
    weight: number;
    contributionPercent: number;
}

export const deriveContributionToReturn = (positions: Position[], prices: Record<string, TickerData>): ContributionItem[] => {
    const contribution = positions.map((p) => {
        const priceData = prices[p.ticker];
        const currentPrice = priceData?.price ?? p.avgCost;
        const tickerDetails = tickers.find((item) => item.ticker === p.ticker);

        const costBasis = p.avgCost * p.shares;
        const pl = (currentPrice - p.avgCost) * p.shares;
        const returnPercent = costBasis !== 0 ? (pl / costBasis) * 100 : 0;

        return {
            ticker: p.ticker,
            name: tickerDetails?.short_name ?? priceData?.name_en ?? p.ticker,
            costBasis,
            pl,
            returnPercent,
        };
    });

    const totalCostBasis = contribution.reduce((acc, item) => acc + item.costBasis, 0);

    const withContribution: ContributionItem[] = contribution.map((item) => {
        const weight = totalCostBasis !== 0 ? item.costBasis / totalCostBasis : 0;
        const contributionPercent = weight * item.returnPercent;

        return { ...item, weight, contributionPercent };
    });

    const sorted = withContribution.sort((a, b) => b.contributionPercent - a.contributionPercent);

    return sorted;
};