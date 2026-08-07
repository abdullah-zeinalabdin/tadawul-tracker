import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../styles/sxStyles";
import PortfolioValue from "./PortfolioValue";
import PortfolioAllocation from "./PortfolioAllocation";

export default function PortfolioValueCard() {
    const theme = useTheme();
    return (
        <Stack sx={ widgetsBaseStyles(theme) } spacing={3}>
            <Typography variant="h2">
                Portfolio Value
            </Typography>
            <PortfolioValue />
            <PortfolioAllocation />
        </Stack>
    )
}