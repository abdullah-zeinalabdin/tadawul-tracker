import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../../styles/sxStyles";
import MainStatsCard from "./MainStatsCard.tsx";
import { usePositions } from "../../../context/usePositions.ts";
import { usePricesContext } from "../../../context/usePricesContext.ts";
import { deriveMainStats } from "../../../context/deriveMainStats.ts";
import { useMemo } from "react";

export default function MainStatsCardContainer() {
    const positions = usePositions();
    const { prices } = usePricesContext();
    const theme = useTheme();

    const summary = useMemo(() => deriveMainStats(positions, prices), [positions, prices]);

    const stats = [
        { label: "Total Value", value: summary.totalValue.toFixed(2) },
        { label: "Total Cost", value: summary.totalCost.toFixed(2) },
        { label: "Unrealized P/L", value: `${summary.unrealizedPL >= 0 ? "+" : ""}${summary.unrealizedPL.toFixed(2)}`, percent: summary.unrealizedPLPercent },
        { label: "Holdings", value: String(summary.holdingsCount) },
        { label: "Today's Change", value: `${summary.dayChange >= 0 ? "+" : ""}${summary.dayChange.toFixed(2)}`, percent: summary.dayChangePercent },
    ];

    return (
        <Stack sx={widgetsBaseStyles(theme)} spacing={3}>
            <Typography variant="h2">Main Statistics</Typography>
            <Grid container spacing={2}  sx={{ flex: 1, justifyContent: "center" }}>
                {stats.map((s) => (
                    <Grid key={s.label} size={{ xs: 6, sm: 4 }}>
                        <MainStatsCard label={s.label} value={s.value} percent={s.percent}/>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}