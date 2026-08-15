import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import type { DailyPerformanceItem } from "./types";
import DailyPerformanceGrid from "./DailyPerformanceGrid";

export default function DailyPerformance() {
    const dailyPerformance: DailyPerformanceItem[] = [
    { ticker: "2280",  priceChange: 0.85, percentage: 1.56 },
    { ticker: "7202",  priceChange: -1.40, percentage: -0.63 },
    { ticker: "4013",  priceChange: 2.50, percentage: 1.16 },
    { ticker: "4264",  priceChange: -0.28, percentage: -0.55 },
    { ticker: "7010", priceChange: 25.2, percentage: 8.21 },
    { ticker: "4016", priceChange: -5.3, percentage: -2.11 },
    { ticker: "4265",  priceChange: -0.28, percentage: -0.55 },
    { ticker: "7011", priceChange: 25.2, percentage: 8.21 },
    { ticker: "4055", priceChange: -5.3, percentage: -2.11 },
    ];
    const theme = useTheme();

    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Typography variant="h2">
                Today's Performance
            </Typography>
            <DailyPerformanceGrid dailyPerformance={dailyPerformance} />
        </Stack>
    )
}