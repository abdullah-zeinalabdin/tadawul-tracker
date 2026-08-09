import { Stack } from "@mui/material";
import PortfolioBarAllocation from "./PortfolioBarAllocation";
import PortfolioLegendAllocation from "./PortfolioLegendAllocation";
import type { AllocationItem } from "./types";
const allocation: AllocationItem[] = [
    { label: "Income", percent: 40, color: "#378ADD" },
    { label: "Growth", percent: 20, color: "#22C55E" },
    { label: "Defensive", percent: 15, color: "#9F77DD" },
    { label: "Banking", percent: 25, color: "#EF9F27" },
];

export default function PortfolioAllocation() {
    return (
        <Stack>
            <Stack spacing={2} sx={{ marginTop: "30px"}}>
                <PortfolioBarAllocation allocation={allocation} />
                <PortfolioLegendAllocation allocation={allocation} />
            </Stack>
        </Stack>
    )
}