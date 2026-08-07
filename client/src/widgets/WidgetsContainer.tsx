import { Grid, Stack } from "@mui/material";
import PortfolioValueCard from "./portfolioValueCard/PortfolioValueCard";

export default function WidgetsContainer() {
    return(
        <Grid container spacing={3}>
            <Grid size={4}>
                <PortfolioValueCard />
            </Grid>
            <Grid size={8}>
                <Stack>
                    
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>

                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    
                </Stack>
            </Grid>
        </Grid>
    )
}