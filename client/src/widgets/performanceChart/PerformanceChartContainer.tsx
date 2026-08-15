import { Stack, Typography } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import PerformanceChart from "./PerformanceChart";
import { useTheme } from "@mui/material";
export default function PerformanceChartContainer() {
    const theme = useTheme();
    return (
        <Stack sx={ widgetsBaseStyles(theme) }>
            <Typography variant="h2">Performance Comparison</Typography>
            <PerformanceChart />
        </Stack>
    )
}