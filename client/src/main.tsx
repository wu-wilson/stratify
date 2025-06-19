import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./contexts/theme/ThemeProvider.tsx";
import { AuthProvider } from "./contexts/auth/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
