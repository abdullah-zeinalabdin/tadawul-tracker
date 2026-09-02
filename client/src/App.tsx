import { Box } from "@mui/material";
import SideBar from "./sidebar/SideBar.tsx";
import { mainPageStyles } from "./styles/sxStyles";
import ContentContainer from "./content/ContentContainer.tsx";

function App() {
  return (
    <Box sx={mainPageStyles}>
      <SideBar />
      <ContentContainer />
    </Box>
  )
}

export default App
