import { Stack, Typography, Box } from "@mui/material";
import type { AllocationBarProps } from "./types";

export default function PortfolioBarAllocation({ allocationData }: AllocationBarProps) {
    return (
        <>
            <Typography variant="h3">
                Asset Breakdown
            </Typography>
            <Stack direction="row" sx={{ height: "25px", borderRadius: "4px", overflow: "hidden", gap: "4px" }}>
                {
                allocationData.map((item) => (
                    <Box 
                        key={item.label} 
                        sx={{ width: `${item.percent}%`,backgroundColor: item.color, borderRadius: "2px",}} 
                    />
                ))}
            </Stack>
        </>
    )
}