import { Box, Stack, useTheme } from "@mui/material";
import { Dashboard, DesktopMac, QueryStats, Wallet, History, Settings } from '@mui/icons-material'
import { sideBarIconsContainerStyles, sideBarStyles } from "../styles/sxStyles";
const sideBarItems = [
    {id: "dashboard", icon: <Dashboard />, path: "/dashboard"},
    {id: "desktop", icon: <DesktopMac />, path: "/desktop"},
    {id: "stats", icon: <QueryStats />, path: "/stats"},
    {id: "wallet", icon: <Wallet />, path: "/wallet"},
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
                {
                sideBarItems.map((item) => (<Box key={item.id}>{item.icon}</Box >))
                }
            </Stack>
            <Stack>
                <Settings sx={{ fontSize: "22px" }} />
            </Stack>
        </Stack>
    )
}