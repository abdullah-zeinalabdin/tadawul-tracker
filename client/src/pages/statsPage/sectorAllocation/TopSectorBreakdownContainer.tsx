import { Grid, Stack, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../../styles/sxStyles";
import { usePositions } from "../../../context/usePositions";
import { usePricesContext } from "../../../context/usePricesContext";
import { deriveTopSectorBreakdown } from "./deriveTopSectorBreakdown";
import SectorDonut from "./SectorAllocationDonut";
import { useMemo } from "react";

export default function TopSectorBreakdownContainer() {
    const theme = useTheme();
    const positions = usePositions();
    const { prices } = usePricesContext();

    const sectorData = useMemo(() => deriveTopSectorBreakdown(positions, prices), [positions, prices]);

    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Grid container spacing={3}>
                {sectorData.map((sector) => (
                    <Grid key={sector.sector} size={4}>
                        <SectorDonut sector={sector} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}