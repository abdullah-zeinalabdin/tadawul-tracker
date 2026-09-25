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
            {
            chartData.myPerformance.length === 0 || chartData.tasiPerformance.length === 0 ?
            <Stack sx={{ height: '400px', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h2">No Data History Yet</Typography>
            </Stack> :
            <PerformanceChart chartData={chartData}/>
            }
        </Stack>
    )
}