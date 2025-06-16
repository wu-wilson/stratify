import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TimeProvider } from "./contexts/time/TimeProvider.tsx";
import { ThemeProvider } from "./contexts/theme/ThemeProvider.tsx";
import { AuthProvider } from "./contexts/auth/AuthProvider.tsx";
import App from "./App.tsx";
import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimeProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </TimeProvider>
  </StrictMode>
);
