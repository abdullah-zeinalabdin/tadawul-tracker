import { Grid, Stack } from "@mui/material";
import MainStatsCardContainer from "./mainStatsCard/MainStatsCardContainer";

export default function StatsPageContainer() {
    return (
        <Grid container spacing={3}>
            <Grid size={12}>
                <Stack>
                    <MainStatsCardContainer />
                </Stack>
            </Grid>
        </Grid>
    )
}