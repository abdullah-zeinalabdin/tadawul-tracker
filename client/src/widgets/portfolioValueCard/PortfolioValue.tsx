import { Stack, Typography } from "@mui/material";
import { numberStyles } from "../../styles/sxStyles";
import PercentPill from "../../shared/PercentPill";

interface Props {
    portfolioValue: number,
}
export default function PortfolioValue( {portfolioValue}: Props ) {
    const percentageHolder = -0.5;
    return (
        <Stack spacing={1}>
            <Typography variant="h1" sx={numberStyles}>
                <span style={{ fontSize: "1.3em" }}>{"\u20C1 "}</span>
                {(portfolioValue).toFixed(2)}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <PercentPill value={percentageHolder} />
                <Typography variant="caption" sx={numberStyles}>
                    + <span style={{ fontSize: "1em" }}>{"\u20C1 "}</span>4855.23 This Month 
                </Typography>
            </Stack>
        </Stack>
    )
}