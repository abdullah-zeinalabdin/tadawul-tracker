import { Stack, Typography, Box } from "@mui/material";
import { allocationRowStyles, numberStyles } from "../../styles/sxStyles";
import { alpha } from "@mui/material/styles";
const allocation = [
    { label: "Income", percent: 40, color: "#378ADD" },
    { label: "Growth", percent: 20, color: "#22C55E" },
    { label: "Defensive", percent: 15, color: "#9F77DD" },
    { label: "Banking", percent: 25, color: "#EF9F27" },
]

export default function PortfolioAllocation() {
    const totalPortfolioValue = 92628.30;
    return (
        <Stack>
            <Stack spacing={2} sx={{ marginTop: "30px"}}>
                <Typography variant="h3">
                    Asset Breakdown
                </Typography>
                <Stack direction="row" sx={{ height: "25px", borderRadius: "4px", overflow: "hidden", gap: "4px" }}>
                    {
                    allocation.map((item) => (
                        <Box 
                            key={item.label} 
                            sx={{ width: `${item.percent}%`,backgroundColor: item.color, borderRadius: "2px",}} 
                        />
                    ))}
                </Stack>
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
            </Stack>
        </Stack>
    )
}