import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../../styles/sxStyles";
import TopSectorBreakdownContainer from "./TopSectorBreakdownContainer";

export default function SectorAllocationContainer() {
    const theme = useTheme();

    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Typography variant="h2">Top Sectors Breakdown</Typography>
            <TopSectorBreakdownContainer />
        </Stack>
    )
}