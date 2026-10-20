import { Box, Stack, useTheme } from "@mui/material";
import { Dashboard, DesktopMac, QueryStats, Wallet, History, Settings } from '@mui/icons-material'
import { sideBarIconsContainerStyles, sideBarStyles } from "../styles/sxStyles";
import { NavLink } from "react-router-dom";

const sideBarItems = [
    {id: "dashboard", icon: <Dashboard />, path: "/"},
    {id: "desktop", icon: <DesktopMac />, path: null},
    {id: "stats", icon: <QueryStats />, path: "/stats"},
    {id: "wallet", icon: <Wallet />, path: null},
    {id: "history", icon: <History />, path: "/history"},
]

export default function SideBar() {
    const theme = useTheme();
    return (
        <Stack sx={ sideBarStyles(theme) } >
            <Stack>
                {/* PlaceHolder */}
                8
            </Stack>
            <Stack spacing={5} sx={ sideBarIconsContainerStyles }>
                {sideBarItems.map((item) =>
                    item.path ? (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end
                            style={({ isActive }) => ({
                                color: isActive ? theme.palette.primary.main : "inherit",
                                display: "flex",
                            })}
                        >
                            {item.icon}
                        </NavLink>
                    ) : (
                        <Box key={item.id}>{item.icon}</Box>
                    )
                )}
            </Stack>
            <Stack>
                <Settings sx={{ fontSize: "22px" }} />
            </Stack>
        </Stack>
    )
}