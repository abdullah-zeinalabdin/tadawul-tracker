import { Stack, Typography } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import AssetsTable from "./AssetsTable";
import { useTheme } from "@mui/material";
import type { AssetsPerformanceProps } from './types';

export default function AssestsPerformanceTable( {rows}: AssetsPerformanceProps ) {
    const theme = useTheme();
    return (
        <Stack sx={[widgetsBaseStyles(theme)]} spacing={4}>
            <Typography variant="h2">Assets Performance</Typography>
            <AssetsTable rows={rows}/>
        </Stack>
    )
}