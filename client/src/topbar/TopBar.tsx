import { Add, Home, History } from "@mui/icons-material";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import SearchBar from "./SearchBar";
import { topBarIconsContainerStyles, topBarStyles, topBarIconsStyles, topBarButtonStyles } from "../styles/sxStyles";
import DialogTransaction from "./dialog/DialogTransaction";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useLocation } from "react-router-dom";


const pageTitles: Record<string, { label: string; icon: React.ReactNode }> = {
    "/": { label: "Dashboard", icon: <Home sx={topBarIconsStyles} /> },
    "/history": { label: "Transaction History", icon: <History sx={topBarIconsStyles} /> },
};

export default function TopBar() {
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    const { pathname } = useLocation();
    const page = pageTitles[pathname] ?? pageTitles["/"];

    return (
        <Stack sx={ topBarStyles(theme) }>
            <Stack sx={ topBarIconsContainerStyles }>
                {page.icon}
                <Typography variant="body1" sx={{ marginBottom: "-2px" }}>{page.label}</Typography>
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