import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./contexts/theme/ThemeProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
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
