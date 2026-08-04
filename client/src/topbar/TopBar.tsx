import { AccountCircle, Home, Notifications } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { topBarIconsContainerStyles, topBarStyles, topBarIconsStyles } from "../styles/sxStyles";
export default function TopBar() {
    return (
        <Stack sx={ topBarStyles }>
            <Stack sx={ topBarIconsContainerStyles }>
                <Home sx={ topBarIconsStyles } />
                <Typography sx={{ marginBottom: "-2px" }}>Dashboard</Typography>
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