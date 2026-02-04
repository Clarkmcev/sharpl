import { useAppSelector } from "../store/hooks";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import Header from "../components/Header";
import Field from "../components/Field";
import Tile from "../components/Tile";
import Uncompleted from "../components/onboarding/Uncompleted";

export default function Profile() {
  const { data: onboardingData } = useAppSelector((state) => state.onboarding);
  const { user } = useAppSelector((state) => state.auth);

  if (!onboardingData) {
    return <Uncompleted />;
  }

  const formatCrossTraining = (activities: string[]) => {
    if (!activities || activities.length === 0) return "None";
    return activities.join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white">Athlete Profile</h2>
          <p className="text-sm text-white/90 mt-1">
            Your training profile and preferences
          </p>
        </div>

        {/* Personal Information */}
        <Tile>
          <Header
            icon={<PersonIcon fontSize="small" />}
            header="Personal Information"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-11">
            <Field name="Name" value={user?.name || "Not provided"} />
            <Field name="Email" value={user?.email || "Not provided"} />
          </div>
        </Tile>

        {/* Sport & Experience */}
        <Tile>
          <Header
            icon={<DirectionsRunIcon fontSize="small" />}
            header="Sport & Experience"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-11">
            <Field name="Primary Sport" value={onboardingData.sport} />
            <Field
              name="Experience Level"
              value={onboardingData.experienceLevel}
            />
            <Field
              name="Weekly Training Hours"
              value={`${onboardingData.weeklyTrainingHours} hours`}
            />
          </div>
        </Tile>

        {/* Race Goals */}
        <Tile>
          <Header
            icon={<EmojiEventsIcon fontSize="small" />}
            header="Race Goals"
          />
          <div className="grid grid-cols-1 gap-4 ml-11">
            {onboardingData.races?.map((race, index) => (
              <div key={index} className={` pl-4 py-2 rounded-r-lg rounded`}>
                <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                  Race {index + 1}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Field name="Name" value={race.name} />
                  <Field name="Discipline" value={race.discipline} />
                  <Field name="Distance" value={race.distance} />
                  <Field
                    name="Date"
                    value={new Date(race.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  <Field name="Goal" value={race.goal} />
                </div>
              </div>
            ))}
          </div>
        </Tile>

        {/* Current Fitness */}
        <Tile>
          <Header
            icon={<FitnessCenterIcon fontSize="small" />}
            header="Current Fitness"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-11">
            <Field
              name="Current Volume"
              value={onboardingData.currentVolume || "Not specified"}
            />
            <Field
              name="Longest Run"
              value={onboardingData.longestRun || "Not specified"}
            />
            {onboardingData.recentRaces && (
              <div className="md:col-span-2">
                <Field name="Recent Races" value={onboardingData.recentRaces} />
              </div>
            )}
            {onboardingData.injuries && (
              <div className="md:col-span-2">
                <Field name="Injuries" value={onboardingData.injuries} />
              </div>
            )}
          </div>
        </Tile>

        {/* Training Preferences */}
        <Tile>
          <Header
            icon={<SettingsIcon fontSize="small" />}
            header="Training Preferences"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-11">
            <Field
              name="Training Days per Week"
              value={`${onboardingData.trainingDays} days`}
            />
            <Field
              name="Preferred Workout Time"
              value={onboardingData.preferredWorkoutTime || "Not specified"}
            />
            <Field
              name="Gym Access"
              value={onboardingData.gymAccess ? "✅ Yes" : "❌ No"}
            />
            <Field
              name="Cross-Training"
              value={formatCrossTraining(onboardingData.crossTraining)}
            />
          </div>
        </Tile>

        {/* Edit Button */}
        {/* <div className="px-6 py-4 border-t border-light-border dark:border-dark-border bg-light-elevated dark:bg-dark-elevated">
          <a
            href="/onboarding"
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition shadow-md ${getTextClass(themeColor)} ${getLightBgClass(themeColor)} hover:opacity-90`}
          >
            <EditIcon fontSize="small" className="mr-2" />
            Edit Profile
          </a>
        </div> */}
      </div>
    </div>
  );
}
