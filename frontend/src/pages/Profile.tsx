import { useAppSelector } from "../store/hooks";
import {
  getGradientClass,
  getLightBgClass,
  getTextClass,
} from "../utils/theme";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import WarningIcon from "@mui/icons-material/Warning";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../components/Button";
import Header from "../components/Header";
import Field from "../components/Field";

export default function Profile() {
  const { data: onboardingData } = useAppSelector((state) => state.onboarding);
  const { user } = useAppSelector((state) => state.auth);
  const themeColor = useAppSelector((state) => state.theme.color);

  if (!onboardingData) {
    return (
      <div className="p-4 rounded-lg">
        <div className="px-4 py-3 rounded-lg flex items-start bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <WarningIcon className="mr-3 text-yellow-600 dark:text-yellow-400" />
          <div>
            <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
              Complete your profile
            </p>
            <p className="text-sm mt-1 text-light-text-secondary dark:text-dark-text-secondary">
              You haven't completed the onboarding process yet.{" "}
              <a
                href="/onboarding"
                className={`underline ${getTextClass(themeColor)} hover:opacity-80`}
              >
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
      <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-lg">
        <div className={`px-6 py-4`}>
          <h2 className="text-2xl font-bold text-white">Athlete Profile</h2>
          <p className="text-sm text-white/90 mt-1">
            Your training profile and preferencesqwe
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Personal Information */}
          <section>
            <Header
              icon={<PersonIcon fontSize="small" />}
              header="Personal Information"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Name
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {user?.name || "Not provided"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Email
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {user?.email || "Not provided"}
                </p>
              </div>
            </div>
          </section>

          {/* Sport & Experience */}
          <section>
            <Header
              icon={<DirectionsRunIcon fontSize="small" />}
              header="Sport & Experience"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11">
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Primary Sport
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {onboardingData.sport}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Experience Level
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium capitalize">
                  {onboardingData.experienceLevel}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Weekly Training Hours
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {onboardingData.weeklyTrainingHours} hours
                </p>
              </div>
            </div>
          </section>

          {/* Race Goals */}
          <section>
            <Header
              icon={<EmojiEventsIcon fontSize="small" />}
              header="Race Goals"
            />
            <div className="grid grid-cols-1 gap-4 ml-11">
              {onboardingData.races?.map((race, index) => (
                <div
                  key={index}
                  className={`border-l-4 ${getTextClass(themeColor)} pl-4 py-2 bg-light-elevated dark:bg-dark-elevated rounded-r-lg`}
                >
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Race {index + 1}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Name
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                        {race.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Discipline
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                        {race.discipline}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                        Distance
                      </label>
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                        {race.distance}
                      </p>
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
                      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                        {race.goal}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Current Fitness */}
          <section>
            <Header
              icon={<FitnessCenterIcon fontSize="small" />}
              header="Current Fitness"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
              <Field
                name="Current Intensity"
                value={onboardingData.currentVolume || "Not specified"}
              />
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Longest Run
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {onboardingData.longestRun || "Not specified"}
                </p>
              </div>
              {onboardingData.recentRaces && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                    Recent Races
                  </label>
                  <p className="text-light-text-primary dark:text-dark-text-primary whitespace-pre-line">
                    {onboardingData.recentRaces}
                  </p>
                </div>
              )}
              {onboardingData.injuries && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                    Injuries
                  </label>
                  <p className="text-light-text-primary dark:text-dark-text-primary whitespace-pre-line">
                    {onboardingData.injuries}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Training Preferences */}
          <section>
            <Header
              icon={<SettingsIcon fontSize="small" />}
              header="Training Preferences"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Training Days per Week
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {onboardingData.trainingDays} days
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Preferred Workout Time
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {onboardingData.preferredWorkoutTime || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Gym Access
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {onboardingData.gymAccess ? "✅ Yes" : "❌ No"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Cross-Training
                </label>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {formatCrossTraining(onboardingData.crossTraining)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Edit Button */}
        <div className="px-6 py-4 border-t border-light-border dark:border-dark-border bg-light-elevated dark:bg-dark-elevated">
          <a
            href="/onboarding"
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition shadow-md ${getTextClass(themeColor)} ${getLightBgClass(themeColor)} hover:opacity-90`}
          >
            <EditIcon fontSize="small" className="mr-2" />
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
}
