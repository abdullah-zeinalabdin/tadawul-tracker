import { Box } from "@mui/material";
import SideBar from "./sidebar/SideBar.tsx";
import { mainPageStyles } from "./styles/sxStyles";
import ContentContainer from "./content/ContentContainer.tsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route 
      path="/"
      element={
        <ProtectedRoutes>
          <Box sx={mainPageStyles}>
            <SideBar />
            <ContentContainer />
          </Box>
        </ProtectedRoutes>
      }
      />
    </Routes>
  )
}

export default App
