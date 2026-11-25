import { Stack, Typography, useTheme } from "@mui/material";
import { widgetsBaseStyles } from "../../../styles/sxStyles";

export default function PerformanceAttributionContainer() {
    const theme = useTheme();

    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Typography variant="h2">Contribution to Return</Typography>
        </Stack>
    )
}