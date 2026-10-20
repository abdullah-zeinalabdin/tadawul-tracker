import { Box } from "@mui/material";
import SideBar from "./sidebar/SideBar.tsx";
import { mainPageStyles } from "./styles/sxStyles";
import ContentContainer from "./content/ContentContainer.tsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import WidgetsContainer from "./widgets/WidgetsContainer.tsx";
import TransactionHistoryPage from "./pages/transactionHistory/TransactionHistoryPage.tsx";
import StatsPage from "./pages/statsPage/StatsPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoutes>
            <Box sx={mainPageStyles}>
              <SideBar />
              <ContentContainer />
            </Box>
          </ProtectedRoutes>
        }
      >
        <Route index element={<WidgetsContainer />} />
        <Route path="history" element={<TransactionHistoryPage />} />
        <Route path="stats" element={<StatsPage />} />
      </Route>
    </Routes>
  )
}

export default App
