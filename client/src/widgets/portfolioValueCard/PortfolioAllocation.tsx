import { Stack } from "@mui/material";
import PortfolioBarAllocation from "./PortfolioBarAllocation";
import PortfolioLegendAllocation from "./PortfolioLegendAllocation";
import type { AllocationItem } from "./types";

interface Props {
    allocationData: AllocationItem[],
    portfolioValue: number,
}

export default function PortfolioAllocation({ allocationData, portfolioValue }: Props) {
    return (
        <Stack>
            <Stack spacing={2} sx={{ marginTop: "30px"}}>
                <PortfolioBarAllocation allocationData={allocationData} />
                <PortfolioLegendAllocation allocationData={allocationData} portfolioValue={portfolioValue} />
            </Stack>
        </Stack>
    )
}