import { AccountCircle, Home, Notifications } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";
import SearchBar from "./SearchBar";
import { topBarIconsContainerStyles, topBarStyles, topBarIconsStyles } from "../styles/sxStyles";

export default function TopBar() {
    const theme = useTheme();
    return (
        <Stack sx={ topBarStyles(theme) }>
            <Stack sx={ topBarIconsContainerStyles }>
                <Home sx={ topBarIconsStyles } />
                <Typography variant="body1" sx={{ marginBottom: "-2px" }}>Dashboard</Typography>
            </Stack>

            <Stack>
                <SearchBar />
            </Stack>

            <Stack sx={ topBarIconsContainerStyles }>
                <Notifications sx={ topBarIconsStyles } />
                <AccountCircle sx={{ fontSize: "50px" }} />
            </Stack>
        </Stack>
    )
}