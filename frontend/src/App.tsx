import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSetTheme } from "./hooks/settings";
import { useStatusToast } from "./hooks/useStatusToast";
import Profile from "./pages/Profile";
import AvailablePlans from "./pages/Plans";
import CalendarPage from "./pages/Calendar";
import InitialComponents from "./components/InitialComponents";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

function App() {
  useSetTheme();
  useStatusToast();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route
            path="overview"
            element={
              <InitialComponents
                icon={
                  <DashboardIcon
                    sx={{ fontSize: 40 }}
                    className="text-light-primary-400 dark:text-dark-primary-600 mb-4"
                  />
                }
                component={<p>Your training plan will be shown here.</p>}
              />
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route path="training" element={<AvailablePlans />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route
            path="analytics"
            element={
              <InitialComponents
                icon={
                  <BarChartIcon
                    sx={{ fontSize: 40 }}
                    className="text-light-primary-400 dark:text-dark-primary-600 mb-4"
                  />
                }
                component={
                  <p>
                    Your performance analytics and progress will be shown here.
                  </p>
                }
              />
            }
          />
          <Route
            path="settings"
            element={
              <InitialComponents
                icon={
                  <SettingsIcon
                    sx={{ fontSize: 40 }}
                    className="text-light-primary-400 dark:text-dark-primary-600 mb-4"
                  />
                }
                component={<p>Your settings will be shown here.</p>}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
