import { Stack, Typography } from "@mui/material";
import { numberStyles, pillIndicator } from "../../styles/sxStyles";
import { useTheme } from '@mui/material'
export default function PortfolioValue() {
    const theme = useTheme();
    const percentageHolder = -0.5;
    return (
        <Stack spacing={1}>
            <Typography variant="h1" sx={numberStyles}>
                $92,628.30 {/* Placeholder Value */}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="caption" sx={ [numberStyles, pillIndicator(theme, percentageHolder >= 0 )] }>
                    { percentageHolder >= 0 ? "+" : ""}{percentageHolder}%
                </Typography>
                <Typography variant="caption" sx={numberStyles}>
                    +$4855.23 This Month 
                </Typography>
            </Stack>
        </Stack>
    )
}