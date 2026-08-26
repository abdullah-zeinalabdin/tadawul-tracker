import { Box } from "@mui/material";
import SideBar from "./sidebar/SideBar.tsx";
import { mainPageStyles } from "./styles/sxStyles";
import ContentContainer from "./content/ContentContainer.tsx";
import { usePositions } from "./context/usePositions.ts";

function App() {
  const positions = usePositions();
  console.log(positions);
  return (
    <Box sx={mainPageStyles}>
      <SideBar />
      <ContentContainer />
    </Box>
  )
}

export default App
