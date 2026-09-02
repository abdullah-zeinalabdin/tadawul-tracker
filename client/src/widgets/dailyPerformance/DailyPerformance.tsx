import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import type {  DailyPerformanceProps } from "./types";
import DailyPerformanceGrid from "./DailyPerformanceGrid";


export default function DailyPerformance( {dailyPerformance}: DailyPerformanceProps ) {
    const theme = useTheme();

    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Typography variant="h2">
                Today's Performance
            </Typography>
            <DailyPerformanceGrid dailyPerformance={dailyPerformance}/>
        </Stack>
    )
}