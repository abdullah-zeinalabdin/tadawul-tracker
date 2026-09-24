import { AccountCircle } from "@mui/icons-material";
import { Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/Authentication/useAuth";

export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { logout, userData } = useAuth();

    const handleOpenMenu = (e: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
        setAnchorEl(e.currentTarget as HTMLElement);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleLogout = async() => {
        try {
            await logout();
        }
        catch(error) {
            console.log("User did not log out", error);
        }
    }

    return (
        <>
            <AccountCircle onClick={handleOpenMenu} sx={{ fontSize: "50px", cursor: "pointer" }} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <Stack sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {userData?.email}
                    </Typography>
                </Stack>
                <Divider />
                <MenuItem disabled>Language (coming soon)</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}