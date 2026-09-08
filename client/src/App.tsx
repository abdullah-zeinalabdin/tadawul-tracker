import { Box } from "@mui/material";
import SideBar from "./sidebar/SideBar.tsx";
import { mainPageStyles } from "./styles/sxStyles";
import ContentContainer from "./content/ContentContainer.tsx";
import { useAuth } from "./context/Authentication/useAuth.ts";

function App() {
  const data = useAuth();
  console.log(data)
  return (
    <Box sx={mainPageStyles}>
      <SideBar />
      <ContentContainer />
    </Box>
  )
}

export default App
