import type { Position } from "../../context/derivePositions";
import type { TickerData } from "../../context/usePrices";
import tickers from "../../data/tickers.json"
import type { AllocationItem } from "./types";

interface Props {
    positions: Position[],
    prices: Record<string, TickerData>
}

const colorArr = ["#EF9F27", "#9F77DD", "#22C55E", "#378ADD"];

export const deriveAllocation = ({ positions, prices }: Props): AllocationItem[] => {
    // Map to get shape of { marketValue, sector }
    const allocationPositions = positions.map((p) => {

        const tickerDetails = tickers.find((item) => item.ticker === p.ticker);
        const sector = tickerDetails?.sector ?? "unknown";

        const priceData = prices[p.ticker];
        const currentPrice = priceData?.price ?? p.avgCost;
        const marketValue = currentPrice * p.shares;

        return {
            marketValue,
            sector
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
    // Switch it into Arr to sort
    const allocationSectorValuesArr = Object.entries(allocationSectorValues).map(([sector, obj]) => {
        return {
            sector,
            value: obj.value,
        }
    });
    // Start sorting by comparsion
    const sortedAllocationSectorValues = allocationSectorValuesArr.sort((itemA, itemB) => {
        return itemB.value - itemA.value;
    });
    // Get top 4 & the rest
    const biggestAllocationSectors = sortedAllocationSectorValues.slice(0, 4);
    const smallestAllocationSectors = sortedAllocationSectorValues.slice(4);
    // Sum up the "others" sector value
    const otherSectorValue = smallestAllocationSectors.reduce((acc, item) => {
        return acc + item.value;
    }, 0);
    // Sum all sectors value
    const allSectorsValue = allocationSectorValuesArr.reduce((acc, item) => {
        return acc + item.value;
    }, 0);
    // Turn top 4 into AllocationItem[]
    const biggestAllocationItems: AllocationItem[] = biggestAllocationSectors.map((item, i) => {
        return {
            label: item.sector,
            percent: (item.value / allSectorsValue) * 100,
            color: colorArr[i],
        }
    });
    // Push "others" sector
    if(smallestAllocationSectors.length > 0) {
        const smallestAllocationItems: AllocationItem = {
            label: "Others",
            percent: (otherSectorValue / allSectorsValue) * 100,
            color: "#6B7280",
        };
        biggestAllocationItems.push(smallestAllocationItems);
    };
    return biggestAllocationItems;
}