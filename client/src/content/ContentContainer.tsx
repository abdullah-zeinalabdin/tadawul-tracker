import { Stack } from "@mui/material";
import TopBar from "../topbar/TopBar";
import WidgetsContainer from "../widgets/WidgetsContainer";
export default function ContentContainer() {
    return (
        <Stack sx={{ flex: 1, padding: "24px", gap: "24px", overflow: "hidden" }}>
            <TopBar />
            <Stack sx={{ flex: 1, overflow: "auto" }}>
                <WidgetsContainer />
            </Stack>
        </Stack>
    )
}