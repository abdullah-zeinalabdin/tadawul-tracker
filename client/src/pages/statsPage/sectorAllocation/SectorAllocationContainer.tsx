import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../../styles/sxStyles";
import { usePositions } from "../../../context/usePositions";
import { usePricesContext } from "../../../context/usePricesContext";
import { useMemo } from "react";
import { deriveAllocation } from "../../../widgets/portfolioValueCard/deriveAllocation";
import SectorAllocationDonut from "./SectorAllocationDonut";

export default function SectorAllocationContainer() {
    const theme = useTheme();
    const positions = usePositions();
    const { prices } = usePricesContext();

    const allocationData = useMemo(() => deriveAllocation({positions, prices}), [positions, prices]);


    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Typography variant="h2">Sector Allocation</Typography>
            <SectorAllocationDonut allocationData={allocationData}/>
        </Stack>
    )
}