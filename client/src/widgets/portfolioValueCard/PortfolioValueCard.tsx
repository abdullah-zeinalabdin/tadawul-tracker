import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import PortfolioValue from "./PortfolioValue";
import PortfolioAllocation from "./PortfolioAllocation";
import type { AllocationItem } from "./types";

interface Props {
    portfolioValue: number,
    allocationData: AllocationItem[],
}

export default function PortfolioValueCard( { portfolioValue, allocationData }: Props ) {
    const theme = useTheme();
    return (
        <Stack sx={ widgetsBaseStyles(theme) } spacing={3}>
            <Typography variant="h2">
                Portfolio Value
            </Typography>
            <PortfolioValue portfolioValue={portfolioValue}/>
            <PortfolioAllocation allocationData={allocationData} portfolioValue={portfolioValue}/>
        </Stack>
    )
}