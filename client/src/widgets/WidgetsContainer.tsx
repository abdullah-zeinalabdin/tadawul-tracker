import { Grid, Stack } from "@mui/material";
import PortfolioValueCard from "./portfolioValueCard/PortfolioValueCard";
import AssestsPerformanceTable from "./assetsPerformance/AssetsPerformanceTable";
import DailyPerformance from "./dailyPerformance/DailyPerformance";
import PerformanceChartContainer from "./performanceChart/PerformanceChartContainer";
import { usePositions } from "../context/usePositions";
import { useMemo } from "react";
import { usePrices } from "../context/usePrices";
import type { AssetsPerformanceItem } from "./assetsPerformance/types";
import type { DailyPerformanceItem } from "./dailyPerformance/types";
import { useSnapshots } from "../context/useSnapshots";
import { deriveChartData } from "./performanceChart/deriveChartData";
import { deriveAllocation } from "./portfolioValueCard/deriveAllocation";
import tickersData from "../data/tickers.json"

export default function WidgetsContainer() {
    const positions = usePositions();
    const tickers = useMemo(() => positions.map((p) => p.ticker), [positions]);
    const { prices } = usePrices(tickers);

    const snapshots = useSnapshots();
    const chartData = useMemo(() => deriveChartData(snapshots), [snapshots]);

    const portfolioValue = useMemo(() => {
        return positions.reduce((acc, p) => {
            return acc + p.shares * (prices[p.ticker]?.price ?? p.avgCost);
        }, 0);
    }, [positions, prices]);

    const rows: AssetsPerformanceItem[] = positions.map((position) => {
        const priceData = prices[position.ticker];
        const currentPrice = priceData?.price ?? position.avgCost;
        const marketValue = currentPrice * position.shares;
        const tickerDetails = tickersData.find((t) => t.ticker === position.ticker);
    
        return {
            code: position.ticker,
            name: prices[position.ticker]?.name_en ?? position.ticker,
            domain: tickerDetails?.domain ?? null,
            weight: portfolioValue > 0 ? (marketValue / portfolioValue) * 100 : 0,
            gain: priceData ? ((currentPrice - position.avgCost) / position.avgCost) * 100 : 0,
            contribution: marketValue,
        }
    })

    const dailyPerformance: DailyPerformanceItem[] = positions.map((position) => {
        const priceData = prices[position.ticker];
        const currentPrice = priceData?.price ?? position.avgCost;
        const tickerDetails = tickersData.find((t) => t.ticker === position.ticker);

        return {
            ticker: position.ticker,
            domain: tickerDetails?.domain ?? null,
            todayPrice: currentPrice,
            priceChangePercent: Number(priceData?.change_percent ?? 0),
            change: Number(priceData?.change ?? 0),
        }
    });

    const allocationData = useMemo(() => deriveAllocation({ positions, prices }), [positions, prices]);

    return(
        <Grid container spacing={3}>
            <Grid size={4}>
                <PortfolioValueCard portfolioValue={portfolioValue} allocationData={allocationData}/>
            </Grid>
            <Grid size={8}>
                <Stack>
                    <PerformanceChartContainer chartData={chartData} />
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    <AssestsPerformanceTable rows={rows}/>
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    <DailyPerformance dailyPerformance={dailyPerformance}/>
                </Stack>
            </Grid>
        </Grid>
    )
}