import { useAppSelector } from "../store/hooks";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import WarningIcon from "@mui/icons-material/Warning";

export default function Profile() {
  const { data: onboardingData } = useAppSelector((state) => state.onboarding);
  const { user } = useAppSelector((state) => state.auth);

  if (!onboardingData) {
    return (
      <div className="p-4 rounded-lg">
        <div className="px-4 py-3 rounded-lg flex items-start">
          <WarningIcon className="mr-3" />
          <div>
            <p className="font-medium">Complete your profile</p>
            <p className="text-sm mt-1">
              You haven't completed the onboarding process yet.
              <a href="/onboarding" className="underline hover:text-yellow-900">
                Complete setup
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatCrossTraining = (activities: string[]) => {
    if (!activities || activities.length === 0) return "None";
    return activities.join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Athlete Profile</h2>
          <p className="text-sm text-gray-600 mt-1">
            Your training profile and preferences
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                <PersonIcon fontSize="small" />
              </span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Name
                </label>
                <p className="text-gray-900 font-medium">
                  {user?.name || "Not provided"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-gray-900 font-medium">
                  {user?.email || "Not provided"}
                </p>
              </div>
            </div>
          </section>

          {/* Sport & Experience */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                <DirectionsRunIcon fontSize="small" />
              </span>
              Sport & Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Primary Sport
                </label>
                <p className="text-gray-900 font-medium">
                  {onboardingData.sport}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Experience Level
                </label>
                <p className="text-gray-900 font-medium capitalize">
                  {onboardingData.experienceLevel}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Weekly Training Hours
                </label>
                <p className="text-gray-900 font-medium">
                  {onboardingData.weeklyTrainingHours} hours
                </p>
              </div>
            </div>
          </section>

          {/* Race Goals */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                <EmojiEventsIcon fontSize="small" />
              </span>
              Race Goals
            </h3>
            <div className="grid grid-cols-1 gap-4 ml-11">
              {onboardingData.races?.map((race, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Race {index + 1}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Name
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">{race.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Discipline
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">{race.discipline}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Distance
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">{race.distance}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Date
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                        {new Date(race.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Goal
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">{race.goal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Current Fitness */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                <FitnessCenterIcon fontSize="small" />
              </span>
              Current Fitness
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Current Volume
                </label>
                <p className="text-gray-900 font-medium">
                  {onboardingData.currentVolume || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Longest Run
                </label>
                <p className="text-gray-900 font-medium">
                  {onboardingData.longestRun || "Not specified"}
                </p>
              </div>
              {onboardingData.recentRaces && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Recent Races
                  </label>
                  <p className="text-gray-900 whitespace-pre-line">
                    {onboardingData.recentRaces}
                  </p>
                </div>
              )}
              {onboardingData.injuries && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Injuries
                  </label>
                  <p className="text-gray-900 whitespace-pre-line">
                    {onboardingData.injuries}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Training Preferences */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                <SettingsIcon fontSize="small" />
              </span>
              Training Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Training Days per Week
                </label>
                <p className="text-gray-900 font-medium">
                  {onboardingData.trainingDays} days
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Preferred Workout Time
                </label>
                <p className="text-gray-900 font-medium">
                  {onboardingData.preferredWorkoutTime || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Gym Access
                </label>
                <p className="text-gray-900 font-medium">
                  {onboardingData.gymAccess ? "✅ Yes" : "❌ No"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Cross-Training
                </label>
                <p className="text-gray-900 font-medium">
                  {formatCrossTraining(onboardingData.crossTraining)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Edit Button */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <a
            href="/onboarding"
            className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
}
