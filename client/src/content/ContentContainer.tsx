import { Stack } from "@mui/material";
import TopBar from "../topbar/TopBar";

export default function ContentContainer() {
    return (
        <Stack sx={{ flex: 1, padding: "24px" }}>
            <TopBar />
        </Stack>
    )
}