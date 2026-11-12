import { Stack, Typography, useTheme } from "@mui/material";
import { numberStyles, statsPageCardsStyles } from "../../../styles/sxStyles";

interface Props {
    label: string,
    value: string,
}

export default function MainStatsCard({ label, value }: Props) {
    const theme = useTheme();
    return (
        <>
            <Stack sx={statsPageCardsStyles(theme)}>
                <Typography sx={numberStyles} variant="h2">
                    <span style={{ fontSize: "1.3em" }}>{label === "Holdings" ? "" : "\u20C1 "}</span> 
                    {value}
                </Typography>
                <Typography variant="h3">{label}</Typography>
            </Stack>
        </>
    )
}