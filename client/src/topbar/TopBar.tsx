import { AccountCircle, Add, Home } from "@mui/icons-material";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import SearchBar from "./SearchBar";
import { topBarIconsContainerStyles, topBarStyles, topBarIconsStyles, topBarButtonStyles } from "../styles/sxStyles";
import DialogTransaction from "./dialog/DialogTransaction";
import { useState } from "react";
import { useAuth } from "../context/Authentication/useAuth";

export default function TopBar() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const { logout } = useAuth();
    const handleLogout = async() => {
        try {
            await logout();
        }
        catch(error) {
            console.log("User did not log out", error);
        }
    }
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
                <Button variant="contained" startIcon={<Add />} onClick={() => {setOpen(true)}} sx={topBarButtonStyles}>
                    Add Transaction
                </Button>
                <AccountCircle onClick={handleLogout} sx={{ fontSize: "50px", cursor: "pointer" }} />
                <DialogTransaction open={open} setOpen={setOpen}/>
            </Stack>
        </Stack>
    )
}