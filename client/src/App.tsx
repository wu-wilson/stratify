import { Routes, Route, Navigate } from "react-router-dom";
import { useSmallScreenRedirect } from "./hooks/useSmallScreenRedirect";
import { ProjectsProvider } from "./contexts/projects/ProjectsProvider";
import { TimeFormatProvider } from "./contexts/time-format/TimeFormatProvider";
import { useTheme } from "./hooks/useTheme";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/error-page/ErrorPage";
import NoSupport from "./pages/no-support/NoSupport";
import NotFound from "./pages/not-found/NotFound";

const App = () => {
  useSmallScreenRedirect();
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
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
        <Route
          path="/join/:token"
          element={
            <PrivateRoute>
              <Join />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/no-support" element={<NoSupport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
