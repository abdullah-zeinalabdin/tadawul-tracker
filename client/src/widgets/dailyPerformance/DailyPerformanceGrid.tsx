import { Stack, Typography } from "@mui/material";
import type { DailyPerformanceProps } from "./types";
import { numberStyles, todaysPerformanceCardStyles } from "../../styles/sxStyles";
import { useTheme } from "@mui/material";
import PercentPill from "../../shared/PercentPill";
export default function DailyPerformanceGrid({ dailyPerformance }: DailyPerformanceProps) {
    const theme = useTheme();
    return (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: "20px", marginTop: "32px" }}>
            {dailyPerformance.map((item) => {
                return (
                    <Stack key={item.ticker} sx={ todaysPerformanceCardStyles(theme) } spacing={2}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>{item.ticker}</Typography>
                            <PercentPill value={item.priceChangePercent}/>
                        </Stack>
                        <Stack>
                            <Typography sx={numberStyles}>{item.todayPrice} SAR</Typography>
                        </Stack>
                    </Stack>
                )
            })}
        </Stack>
    )
}