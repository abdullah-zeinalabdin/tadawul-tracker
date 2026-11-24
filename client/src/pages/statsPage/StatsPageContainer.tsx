import { Grid, Stack } from "@mui/material";
import MainStatsCardContainer from "./mainStatsCard/MainStatsCardContainer";
import SectorAllocationContainer from "./sectorAllocation/SectorAllocationContainer";

export default function StatsPageContainer() {
    return (
        <Grid container spacing={3}>
            <Grid size={12}>
                <Stack>
                    <MainStatsCardContainer />
                </Stack>
            </Grid>
            <Grid size={12}>
                <SectorAllocationContainer />
            </Grid>
        </Grid>
    )
}