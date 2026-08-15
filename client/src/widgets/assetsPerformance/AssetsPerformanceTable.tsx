import { Stack, Typography } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import AssetsTable from "./AssetsTable";
import { useTheme } from "@mui/material";

export default function AssestsPerformanceTable() {
    const theme = useTheme();
    return (
        <Stack sx={[widgetsBaseStyles(theme)]} spacing={4}>
            <Typography variant="h2">Assets Performance</Typography>
            <AssetsTable />
        </Stack>
    )
}