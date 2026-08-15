import { Stack, Typography } from "@mui/material";
import type { DailyPerformanceProps } from "./types";
import { numberStyles, pillIndicator, todaysPerformanceCardStyles } from "../../styles/sxStyles";
import { useTheme } from "@mui/material";
export default function DailyPerformanceGrid({ dailyPerformance }: DailyPerformanceProps) {
    const theme = useTheme();
    return (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: "20px", marginTop: "32px" }}>
            {dailyPerformance.map((item) => {
                return (
                    <Stack key={item.ticker} sx={ todaysPerformanceCardStyles(theme) } spacing={2}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>{item.ticker}</Typography>
                            <Typography sx={[pillIndicator(theme, item.percentage >= 0), numberStyles]}>{item.percentage}%</Typography>
                        </Stack>
                        <Stack>
                            <Typography sx={numberStyles}>{50 + item.priceChange} SAR</Typography>
                        </Stack>
                    </Stack>
                )
            })}
        </Stack>
    )
}