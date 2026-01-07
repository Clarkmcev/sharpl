import { useAppSelector } from "../store/hooks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WarningIcon from "@mui/icons-material/Warning";

export default function Overview() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: onboardingData } = useAppSelector((state) => state.onboarding);

  // Get the first/primary race
  const primaryRace = onboardingData?.races?.[0];
  const daysUntilRace = primaryRace?.date
    ? Math.ceil(
        (new Date(primaryRace.date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name?.split(" ")[0] || "Athlete"}! 👋
        </h1>
        <p className="text-purple-100">Ready to crush your training today?</p>
      </div>

      {/* Race Countdown */}
      {primaryRace && daysUntilRace !== null && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {primaryRace.name}
              </h2>
              <p className="text-gray-600">{primaryRace.distance}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-purple-600">
                {daysUntilRace}
              </div>
              <p className="text-sm text-gray-600">days to go</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">0 hrs</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <AccessTimeIcon className="text-blue-600" sx={{ fontSize: 32 }} />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "0%" }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              0 / {onboardingData?.weeklyTrainingHours || 0} hours
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Workouts</p>
              <p className="text-2xl font-bold text-gray-900">
                0 / {onboardingData?.trainingDays || 0}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircleIcon
                className="text-green-600"
                sx={{ fontSize: 32 }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Complete your weekly plan
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">0 days</p>
            </div>
            <div className="bg-orange-100 rounded-full p-3">
              <LocalFireDepartmentIcon
                className="text-orange-600"
                sx={{ fontSize: 32 }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Keep training consistently
          </p>
        </div>
      </div>

      {/* Upcoming Workouts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">This Week's Plan</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-gray-500">
            <CalendarTodayIcon
              sx={{ fontSize: 60 }}
              className="text-gray-400 mb-2"
            />
            <p className="text-sm">Your training plan will appear here</p>
            <p className="text-xs mt-1">Coming soon!</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {!onboardingData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <WarningIcon
              className="text-yellow-600 mr-3"
              sx={{ fontSize: 32 }}
            />
            <div>
              <h3 className="font-semibold text-yellow-900">
                Complete your profile
              </h3>
              <p className="text-sm text-yellow-800 mt-1">
                Help us personalize your training by completing the onboarding
                process.
              </p>
              <a
                href="/onboarding"
                className="inline-block mt-2 text-sm font-medium text-yellow-900 underline hover:text-yellow-700"
              >
                Complete setup →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
