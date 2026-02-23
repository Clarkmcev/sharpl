import { useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutRequest } from "../store/slices/authSlice";
import { useSidebarOpen } from "../hooks/useSidebarOpen";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProfileIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Tooltip from "../components/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";

const navItems: { path: string; label: string; icon: React.ReactElement }[] = [
  {
    path: "/dashboard/overview",
    label: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    path: "/dashboard/profile",
    label: "Profile",
    icon: <ProfileIcon fontSize="small" />,
  },
  {
    path: "/dashboard/training",
    label: "Training Plan",
    icon: <FitnessCenterIcon fontSize="small" />,
  },
  {
    path: "/dashboard/calendar",
    label: "Calendar",
    icon: <CalendarMonthIcon fontSize="small" />,
  },
  {
    path: "/dashboard/analytics",
    label: "Analytics",
    icon: <BarChartIcon fontSize="small" />,
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: <SettingsIcon fontSize="small" />,
  },
];

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();
  const ref = useRef<HTMLDivElement>(null);

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const activeLabel =
    navItems.find((item) => location.pathname.startsWith(item.path))?.label ??
    "";

  return (
    <div className="h-screen flex bg-light-bg dark:bg-dark-bg overflow-hidden">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-18"
        } bg-light-surface dark:bg-dark-surface shadow-lg transition-all duration-300 flex flex-col h-full`}
      >
        <div className="h-16 flex items-center justify-between px-4 b overflow-hidden">
          <h1
            className={`text-2xl font-bold text-light-text-primary dark:text-dark-text-primary bg-clip-text whitespace-nowrap overflow-hidden transition-all duration-300 ${
              sidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
            }`}
          >
            sharpl
          </h1>
          <Tooltip content={sidebarOpen ? "Collapse" : "Expand"} side="right">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg transition cursor-pointer"
            >
              {sidebarOpen ? (
                <ChevronLeftIcon className="text-light-text-secondary dark:text-dark-text-secondary" />
              ) : (
                <ChevronRightIcon className="text-light-text-secondary dark:text-dark-text-secondary" />
              )}
            </button>
          </Tooltip>
        </div>

        <nav className="flex-1 px-1 pl-3">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Tooltip
                key={item.path}
                content={item.label}
                side="right"
                disabled={sidebarOpen}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center cursor-pointer px-3 py-2 rounded-lg transition-all hover:text-light-text-primary hover:dark:text-dark-text-primary ${
                    isActive
                      ? "text-light-text-primary dark:text-dark-text-primary font-medium"
                      : "text-light-text-secondary dark:text-dark-text-secondary"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`ml-2 text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
                      sidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </Tooltip>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="flex items-center space-x-3 overflow-hidden">
            <Tooltip
              content={user?.name || "User"}
              side="right"
              disabled={sidebarOpen}
            >
              <div className="w-10 h-10 shrink-0 rounded-full background-light flex items-center justify-center text-white font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </Tooltip>
            <div
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                sidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
              }`}
            >
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Tooltip content="Logout" side="right" disabled={sidebarOpen}>
            <button
              onClick={handleLogout}
              className={`w-full mt-3 px-4 py-2 text-sm cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition flex items-center ${
                sidebarOpen ? "" : "justify-center"
              }`}
            >
              <LogoutIcon fontSize="small" className="shrink-0 ml-2" />
              <span
                className={`ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  sidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
                }`}
              >
                Logout
              </span>
            </button>
          </Tooltip>
        </div>
      </aside>

      <main ref={ref} className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-light-bg dark:bg-dark-bg">
          <div className="px-4 py-2">
            <h2 className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {activeLabel}
            </h2>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
