import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "./contexts/theme/ThemeProvider";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  const theme = useTheme();

  return (
    <div className={theme.darkMode ? "dark-mode" : "light-mode"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
