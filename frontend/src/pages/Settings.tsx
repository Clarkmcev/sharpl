import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logoutRequest } from "../store/slices/authSlice";
import { setThemeMode, type ThemeMode } from "../store/slices/themeSlice";
import ProfileEditModal from "../components/ProfileEditModal";

export default function Settings() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profileData } = useAppSelector((state) => state.onboarding);
  const themeState = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  // Modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [raceAlerts, setRaceAlerts] = useState(true);

  // Units & preferences
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [timezone, setTimezone] = useState("America/New_York");
  const [language, setLanguage] = useState("en");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update profile
    console.log("Saving profile:", { name, email });
    alert("Profile updated successfully!");
  };

  const handleSaveTheme = () => {
    // Theme is saved immediately on change, so just show a confirmation
    alert("Theme settings saved!");
  };

  handleSaveTheme();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    // TODO: Implement API call to change password
    console.log("Changing password");
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update notification settings
    console.log("Saving notifications");
    alert("Notification settings saved!");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update preferences
    console.log("Saving preferences:", { units, timezone, language });
    alert("Preferences saved!");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      // TODO: Implement API call to delete account
      console.log("Deleting account");
      dispatch(logoutRequest());
    }
  };

  const handleThemeModeChange = (mode: ThemeMode) => {
    dispatch(setThemeMode(mode));
  };

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Theme & Appearance
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Customize the look and feel
          </p>
        </div>
        <div className="p-6 space-y-6">
          {/* Theme Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Theme Color
            </label>
          </div>

          {/* Dark Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Appearance Mode
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleThemeModeChange("light")}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  themeState.mode === "light"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">☀️</div>
                <p className="font-medium text-gray-900">Light</p>
                <p className="text-xs text-gray-600">Bright and clear</p>
              </button>
              <button
                type="button"
                onClick={() => handleThemeModeChange("dark")}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  themeState.mode === "dark"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">🌙</div>
                <p className="font-medium text-gray-900">Dark</p>
                <p className="text-xs text-gray-600">Easy on the eyes</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Account Settings</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage your account information
          </p>
        </div>
        <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-600 mt-1">
            Update your password regularly
          </p>
        </div>
        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Choose what updates you want to receive
          </p>
        </div>
        <form onSubmit={handleSaveNotifications} className="p-6 space-y-4">
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <div>
                <span className="font-medium text-gray-900">
                  Email Notifications
                </span>
                <p className="text-sm text-gray-600">
                  Receive notifications via email
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <div>
                <span className="font-medium text-gray-900">
                  Workout Reminders
                </span>
                <p className="text-sm text-gray-600">
                  Get reminded about scheduled workouts
                </p>
              </div>
              <input
                type="checkbox"
                checked={workoutReminders}
                onChange={(e) => setWorkoutReminders(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <div>
                <span className="font-medium text-gray-900">Weekly Report</span>
                <p className="text-sm text-gray-600">
                  Receive a summary of your weekly training
                </p>
              </div>
              <input
                type="checkbox"
                checked={weeklyReport}
                onChange={(e) => setWeeklyReport(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <div>
                <span className="font-medium text-gray-900">Race Alerts</span>
                <p className="text-sm text-gray-600">
                  Get notifications about upcoming races
                </p>
              </div>
              <input
                type="checkbox"
                checked={raceAlerts}
                onChange={(e) => setRaceAlerts(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>

      {/* Units & Preferences */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Units & Preferences
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Customize your experience
          </p>
        </div>
        <form onSubmit={handleSavePreferences} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Units
              </label>
              <select
                value={units}
                onChange={(e) =>
                  setUnits(e.target.value as "metric" | "imperial")
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="metric">Metric (km, kg)</option>
                <option value="imperial">Imperial (mi, lb)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>

      {/* Training Profile Summary */}
      {profileData && (
        <div className="from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg shadow p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Training Profile Summary
            </h3>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sport</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {profileData.sport}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Experience
              </p>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">
                {profileData.experienceLevel}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Weekly Hours
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {profileData.weeklyTrainingHours}h
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Training Days
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {profileData.trainingDays} days
              </p>
            </div>
          </div>

          {/* Races Section */}
          {profileData.preparingForRace &&
            profileData.races &&
            profileData.races.length > 0 && (
              <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Upcoming Races
                </h4>
                <div className="space-y-2">
                  {profileData.races.map((race, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-white/50 dark:bg-black/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {race.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {race.discipline} - {race.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(race.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {race.goal}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialData={profileData || undefined}
      />

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow border-2 border-red-200">
        <div className="px-6 py-4 border-b border-red-200 bg-red-50">
          <h3 className="text-xl font-bold text-red-900">Danger Zone</h3>
          <p className="text-sm text-red-700 mt-1">
            Irreversible and destructive actions
          </p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-600 mt-1">
                Permanently delete your account and all of your data. This
                action cannot be undone.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
