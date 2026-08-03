import { Box } from "@mui/material";
import SideBar from "./sidebar/SideBar.tsx";
import { mainPageStyles } from "./styles/sxStyles";

function App() {
  return (
    <Box sx={mainPageStyles}>
      <SideBar />
    </Box>
  )
}

export default App
