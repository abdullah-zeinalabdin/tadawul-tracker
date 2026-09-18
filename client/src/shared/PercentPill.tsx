import { Stack, Typography, useTheme } from "@mui/material";
import { numberStyles, pillIndicator } from "../styles/sxStyles";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface Props {
    value: number,
}

export default function PercentPill({ value }: Props) {
    const theme = useTheme();
    const pillStatus = value > 0 ? "positive" : value < 0 ? "negative" : "neutral";

    return (
        <Stack sx={pillIndicator(theme, pillStatus)} direction="row">
            { pillStatus === "positive" && <ArrowUpward sx={{ fontSize: "18px" }} /> }
            { pillStatus === "negative" && <ArrowDownward sx={{ fontSize: "18px" }} /> }
            <Typography sx={numberStyles}>
                { value >= 0 ? "+" : "" }
                { value.toFixed(2) }%
            </Typography>
        </Stack>
    );
}