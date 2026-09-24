import { Add, Home } from "@mui/icons-material";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import SearchBar from "./SearchBar";
import { topBarIconsContainerStyles, topBarStyles, topBarIconsStyles, topBarButtonStyles } from "../styles/sxStyles";
import DialogTransaction from "./dialog/DialogTransaction";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

export default function TopBar() {
    const [open, setOpen] = useState(false);

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
                <Button variant="contained" startIcon={<Add />} onClick={() => {setOpen(true)}} sx={topBarButtonStyles}>
                    Add Transaction
                </Button>
                <ProfileMenu />
                <DialogTransaction open={open} setOpen={setOpen}/>
            </Stack>
        </Stack>
    )
}