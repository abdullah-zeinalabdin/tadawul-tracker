import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/Theme.ts';
import { TransactionProvider } from './context/TransactionProvider.tsx';
import { AuthProvider } from './context/Authentication/AuthProvider.tsx';
import { PricesProvider } from './context/PricesProvider.tsx';
import { BrowserRouter } from "react-router-dom";
/* Fonts Import */
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/jetbrains-mono/500.css'
/* === Fonts Import === */ 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <PricesProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </PricesProvider>
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
