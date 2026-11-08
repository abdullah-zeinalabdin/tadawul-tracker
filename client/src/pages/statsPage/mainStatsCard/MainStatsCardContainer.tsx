import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../../styles/sxStyles";
import MainStatsCard from "./MainStatsCard.tsx";


const stats = [
    { label: "Total Value", value: "48,230.50" },
    { label: "Total Cost", value: "45,100.00" },
    { label: "Unrealized P/L", value: "+3,130.50 (+6.9%)" },
    { label: "Holdings", value: "12" },
    { label: "Today's Change", value: "+215.30 (+0.45%)" },
];

export default function MainStatsCardContainer() {
    const theme = useTheme();

    return (
        <Stack sx={widgetsBaseStyles(theme)} spacing={3}>
            <Typography variant="h2">
                Main Statistics
            </Typography>
            <Grid container spacing={2}  sx={{ flex: 1, justifyContent: "center" }}>
                {stats.map((s) => (
                    <Grid key={s.label} size={{ xs: 6, sm: 4 }}>
                        <MainStatsCard label={s.label} value={s.value} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}