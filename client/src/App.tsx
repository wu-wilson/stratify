import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectsProvider } from "./contexts/projects/ProjectsProvider";
import { useTheme } from "./contexts/theme/ThemeProvider";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/error-page/ErrorPage";

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
                <ProjectsProvider>
                  <Dashboard />
                </ProjectsProvider>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
