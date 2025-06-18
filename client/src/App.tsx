import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectsProvider } from "./contexts/projects/ProjectsProvider";
import { TimeFormatProvider } from "./contexts/time-format/TimeFormatProvider";
import { useTheme } from "./contexts/theme/ThemeProvider";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/error-page/ErrorPage";
import NotFound from "./pages/not-found/NotFound";

const App = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <TimeFormatProvider>
                  <ProjectsProvider>
                    <Dashboard />
                  </ProjectsProvider>
                </TimeFormatProvider>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
