import { Stack } from "@mui/material";
import TopBar from "../topbar/TopBar";
import { Outlet } from "react-router-dom";
export default function ContentContainer() {
    return (
        <Stack sx={{ flex: 1, padding: "24px", gap: "24px", overflow: "hidden" }}>
            <TopBar />
            <Stack sx={{ flex: 1, overflow: "auto" }}>
                <Outlet />
            </Stack>
        </Stack>
    )
}