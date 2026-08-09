import { Stack, Typography, Box } from "@mui/material";
import { allocationRowStyles, numberStyles } from "../../styles/sxStyles";
import { alpha } from "@mui/material/styles";
import type { AllocationBarProps } from "./types";

export default function PortfolioLegendAllocation({ allocation }: AllocationBarProps) {
    const totalPortfolioValue = 92628.30;
    return (
        <Stack>
            { 
            allocation.map((item) => {
                const value = (totalPortfolioValue * item.percent) / 100
                return (
                    <Stack key={item.label} sx={allocationRowStyles}>
                        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }} >
                            <Box sx={{ 
                                width: "8px", 
                                height: "8px", 
                                borderRadius: "2px", 
                                backgroundColor: item.color 
                            }} />
                            <Typography variant="body1">{item.label}</Typography>
                            <Typography variant="caption"
                                sx={{ 
                                    backgroundColor: alpha(item.color, 0.15),
                                    color: item.color,
                                    padding: "1px 6px",
                                    borderRadius: "4px",
                                    fontSize: "10px",
                                    display: "inline-block",
                                    width: "40px",
                                    textAlign: "center",
                                }}
                            >
                                {item.percent}%
                            </Typography>
                        </Stack>
                        <Typography variant="body2" sx={numberStyles}>
                            {value.toFixed(2)} SAR
                        </Typography>
                    </Stack>
                )})
            }
        </Stack>
    )
}