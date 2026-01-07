import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsersRequest } from "../store/slices/usersSlice";
import { logoutRequest } from "../store/slices/authSlice";
import Overview from "./Overview";
import Profile from "./Profile";
import Settings from "./Settings";
import { getGradientClass } from "../utils/theme";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InitialComponents from "../components/InitialComponents";

type Tab =
  | "overview"
  | "profile"
  | "training"
  | "calendar"
  | "analytics"
  | "settings";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const themeColor = useAppSelector((state) => state.theme.color);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchUsersRequest());
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const navItems: { id: Tab; label: string; icon: React.ReactElement }[] = [
    {
      id: "training",
      label: "Training Plan",
      icon: <FitnessCenterIcon fontSize="small" />,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <CalendarMonthIcon fontSize="small" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChartIcon fontSize="small" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon fontSize="small" />,
    },
  ];

  const renderContent = (): React.ReactElement => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "profile":
        return <Profile />;
      case "training":
        return (
          <InitialComponents
            key={"training"}
            icon={
              <FitnessCenterIcon
                sx={{ fontSize: 100 }}
                className="text-light-primary-400 dark:text-dark-primary-600 mb-4"
              />
            }
            component={<p>Your training plan will be shown here.</p>}
          />
        );

      case "calendar":
        return (
          <InitialComponents
            key={"calendar"}
            icon={
              <CalendarMonthIcon
                sx={{ fontSize: 100 }}
                className="text-light-primary-400 dark:text-dark-primary-600 mb-4"
              />
            }
            component={<p>Your calendar and schedule will be shown here.</p>}
          />
        );
      case "analytics":
        return (
          <InitialComponents
            key={"analytics"}
            icon={
              <BarChartIcon
                sx={{ fontSize: 100 }}
                className="text-light-primary-400 dark:text-dark-primary-600 mb-4"
              />
            }
            component={
              <p>Your performance analytics and progress will be shown here.</p>
            }
          />
        );
      case "settings":
        return <Settings />;
    }
  };

  return (
    <div className="min-h-screen flex bg-light-bg dark:bg-dark-bg ">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-light-surface dark:bg-dark-surface shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 b">
          {sidebarOpen && (
            <h1
              className={`text-2xl font-bold text-light-text-primary dark:text-dark-text-primary bg-clip-text`}
            >
              sharpl
            </h1>
          )}
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
        </div>

        <nav className="flex-1 px-1 pt-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center cursor-pointer ${
                sidebarOpen ? "px-4" : "px-2 justify-center"
              } py-3 rounded-lg transition-all hover:text-light-text-primary hover:dark:text-dark-text-primary ${
                activeTab === item.id
                  ? `text-light-text-primary dark:text-dark-text-primary font-medium`
                  : "text-light-text-secondary dark:text-dark-text-secondary"
              }`}
            >
              <div>{item.icon}</div>
              {sidebarOpen && (
                <span className="ml-2 text-sm">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className=" p-4">
          <div
            className={`flex items-center ${
              sidebarOpen ? "space-x-3" : "justify-center"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full ${getGradientClass(
                themeColor
              )} flex items-center justify-center text-white font-bold`}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="w-full mt-3 px-4 py-4 text-sm cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-light-bg dark:bg-dark-bg">
          <div className="px-8 py-4">
            <h2 className="text-2xl font-bold text-light-text-secondary dark:text-dark-text-secondary ">
              {navItems.find((item) => item.id === activeTab)?.label}
            </h2>
          </div>
        </div>

        <div className="px-4">{renderContent()}</div>
      </main>
    </div>
  );
}
