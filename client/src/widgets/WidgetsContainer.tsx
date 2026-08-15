import { Grid, Stack } from "@mui/material";
import PortfolioValueCard from "./portfolioValueCard/PortfolioValueCard";
import AssestsPerformanceTable from "./assetsPerformance/AssetsPerformanceTable";
import DailyPerformance from "./dailyPerformance/DailyPerformance";
import PerformanceChartContainer from "./performanceChart/PerformanceChartContainer";

export default function WidgetsContainer() {
    return(
        <Grid container spacing={3}>
            <Grid size={4}>
                <PortfolioValueCard />
            </Grid>
            <Grid size={8}>
                <Stack>
                    <PerformanceChartContainer />
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    <AssestsPerformanceTable />
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    <DailyPerformance />
                </Stack>
            </Grid>
        </Grid>
    )
}