import type { Position } from "../../../context/derivePositions";
import type { TickerData } from "../../../context/usePrices";
import tickers from "../../../data/tickers.json"

interface TickerBreakdown {
    ticker: string;
    name: string;
    percent: number;
    value: number;
}

export interface SectorBreakdown {
    sector: string;
    totalValue: number;
    holdings: TickerBreakdown[];
}

export const deriveTopSectorBreakdown = (positions: Position[], prices: Record<string, TickerData>) : SectorBreakdown[] => {
    // Map to get shape of { marketValue, sector, ticker }
    const allocationPositions = positions.map((p) => {

        const tickerDetails = tickers.find((item) => item.ticker === p.ticker);
        const sector = tickerDetails?.sector ?? "unknown";

        const priceData = prices[p.ticker];
        const currentPrice = priceData?.price ?? p.avgCost;
        const marketValue = currentPrice * p.shares;

        return {
            marketValue,
            sector,
            ticker: p.ticker,
            name: tickerDetails?.short_name ?? priceData?.name_en ?? p.ticker,
        }
    });
    // Add on every same sector's value 
    const allocationSectorValues = allocationPositions.reduce((acc, i) => {

        if(!acc[i.sector]) {
            acc[i.sector] = { value: 0 };
        };

        const current = acc[i.sector];
        current.value += i.marketValue;

        return acc;
    }, {} as Record<string, { value: number }> );
    // Get the top 3 sectors
    const topSectors = Object.entries(allocationSectorValues)
    .sort(([, dataA], [, dataB]) => dataB.value - dataA.value)
    .slice(0, 3)
    .map(([sector]) => sector);

    const sectorAllocationByStock: SectorBreakdown[] = topSectors.map((topSector) => {
        const filteredPositions = allocationPositions.filter((p) => p.sector === topSector);
        const sectorTotal = allocationSectorValues[topSector].value;

        const holdings: TickerBreakdown[] = filteredPositions
        .map((p) => {
            const holding = {
                ticker: p.ticker,
                name: p.name,
                value: p.marketValue,
                percent: (p.marketValue / sectorTotal) * 100,
            }
            return holding
        })
        .sort((a, b) => b.percent - a.percent);

        return {
            sector: topSector,
            totalValue: sectorTotal,
            holdings,
        };
    });

    return sectorAllocationByStock;
}