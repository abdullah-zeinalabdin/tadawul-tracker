import { Stack, Typography } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import PerformanceChart from "./PerformanceChart";
import { useTheme } from "@mui/material";
import type { ChartData } from "./deriveChartData";

export interface ChartDataProps {
    chartData: ChartData
}

export default function PerformanceChartContainer({ chartData }: ChartDataProps) {
    const theme = useTheme();
    return (
        <Stack sx={ widgetsBaseStyles(theme) }>
            <Typography variant="h2">Performance Comparison</Typography>
            <PerformanceChart chartData={chartData}/>
        </Stack>
    )
}