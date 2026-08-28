import { Stack, Typography } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import AssetsTable from "./AssetsTable";
import { useTheme } from "@mui/material";
import type { AssetsPerformanceItem } from './types';
import { usePositions } from '../../context/usePositions';
export default function AssestsPerformanceTable() {
    const theme = useTheme();
    const positions = usePositions();
    const rows: AssetsPerformanceItem[] = positions.map((position) => {
        return {
            code: position.ticker,
            name: "###PLACEHOLDER",
            weight: 13.1, // ###PLACEHOLDER
            gain: 2.2, // ###PLACEHOLDER
            contribution: 850, // ###PLACEHOLDER
        }
    })
    return (
        <Stack sx={[widgetsBaseStyles(theme)]} spacing={4}>
            <Typography variant="h2">Assets Performance</Typography>
            <AssetsTable rows={rows}/>
        </Stack>
    )
}