import { Stack, Typography } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import AssetsTable from "./AssetsTable";
import { useTheme } from "@mui/material";
import type { AssetsPerformanceItem } from './types';
import { usePositions } from '../../context/usePositions';
import { usePrices } from "../../context/usePrices";
import { useMemo } from "react";

export default function AssestsPerformanceTable() {
    const theme = useTheme();
    const positions = usePositions();
    const tickers = useMemo(() => positions.map((p) => p.ticker), [positions]);
    const prices = usePrices(tickers);
    const rows: AssetsPerformanceItem[] = positions.map((position) => {
        const priceData = prices[position.ticker];
        const currentPrice = priceData?.price ?? position.avgCost;
        const marketValue = currentPrice * position.shares;
        const portfolioValue = positions.reduce((acc, next) => {
            return acc + next.shares * (prices[next.ticker]?.price ?? next.avgCost)
        }, 0);

        return {
            code: position.ticker,
            name: prices[position.ticker]?.name_en ?? position.ticker,
            weight: portfolioValue > 0 ? (marketValue / portfolioValue) * 100 : 0,
            gain: priceData ? ((currentPrice - position.avgCost) / position.avgCost) * 100 : 0,
            contribution: marketValue,
        }
    })
    return (
        <Stack sx={[widgetsBaseStyles(theme)]} spacing={4}>
            <Typography variant="h2">Assets Performance</Typography>
            <AssetsTable rows={rows}/>
        </Stack>
    )
}