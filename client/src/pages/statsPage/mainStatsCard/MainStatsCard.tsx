import { Stack, Typography, useTheme } from "@mui/material";
import { numberStyles, statsPageCardsStyles } from "../../../styles/sxStyles";
import PercentPill from "../../../shared/PercentPill";

interface Props {
    label: string,
    value: string,
    percent?: number,
}

export default function MainStatsCard({ label, value, percent }: Props) {
    const theme = useTheme();
    return (
        <>
            <Stack sx={statsPageCardsStyles(theme)}>
                <Typography sx={numberStyles} variant="h2">
                    <span style={{ fontSize: "1.3em" }}>{label === "Holdings" ? "" : "\u20C1 "}</span> 
                    {value}
                </Typography>
                {percent !== undefined && <PercentPill value={percent} />}
                <Typography variant="h3">{label}</Typography>
            </Stack>
        </>
    )
}