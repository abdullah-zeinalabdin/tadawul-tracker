import { Stack, Typography, Box } from "@mui/material";
import { allocationRowStyles, numberStyles } from "../../styles/sxStyles";
import { alpha } from "@mui/material/styles";
import type { AllocationItem } from "./types";

interface Props {
    allocationData: AllocationItem[],
    portfolioValue: number,
}
export default function PortfolioLegendAllocation({ allocationData, portfolioValue }: Props) {
    return (
        <Stack>
            { 
            allocationData.map((item) => {
                const value = (portfolioValue * item.percent) / 100
                return (
                    <Stack key={item.label} sx={allocationRowStyles}>
                        <Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap", flex: 1, minWidth: 0 }} >
                            <Box sx={{ 
                                width: "8px", 
                                height: "8px", 
                                borderRadius: "2px", 
                                backgroundColor: item.color 
                            }} />
                            <Typography variant="body1" sx={{ minWidth: 0, fontSize: "12px" }}>{item.label}</Typography>
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
                                    flexShrink: 0
                                }}
                            >
                                {(item.percent).toFixed(0)}%
                            </Typography>
                        </Stack>
                        <Typography variant="body2" sx={numberStyles}>
                            <span style={{ fontSize: "1.3em" }}>{"\u20C1 "}</span>
                            {value.toFixed(2)}
                        </Typography>
                    </Stack>
                )})
            }
        </Stack>
    )
}