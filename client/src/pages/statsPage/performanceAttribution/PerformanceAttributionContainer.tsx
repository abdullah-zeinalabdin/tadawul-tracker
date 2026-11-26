import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../../styles/sxStyles";
import PerformanceAttributionChart from "./PerformanceAttributionChart";
import { usePositions } from "../../../context/usePositions";
import { usePricesContext } from "../../../context/usePricesContext";
import { deriveContributionToReturn } from "./deriveContributionToReturn";
import { useMemo } from "react";

export default function PerformanceAttributionContainer() {
    const theme = useTheme();
    const positions = usePositions();
    const { prices } = usePricesContext();

    const chartData = useMemo(() => deriveContributionToReturn(positions, prices), [positions, prices]);

    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Typography variant="h2">Contribution to Return</Typography>
            <PerformanceAttributionChart data={chartData}/>
        </Stack>
    )
}