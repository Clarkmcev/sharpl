import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  fetchOnboardingRequest,
  completeOnboardingRequest,
} from "../store/slices/onboardingSlice";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import Header from "../components/Header";
import Field from "../components/Field";
import EditableField from "../components/EditableField";
import Tile from "../components/Tile";
import Uncompleted from "../components/onboarding/Uncompleted";
import type { OnboardingData } from "../generated";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { data: onboardingData } = useAppSelector((state) => state.onboarding);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOnboardingRequest());
  }, [dispatch]);

  if (!onboardingData) {
    return <Uncompleted />;
  }

  const formatCrossTraining = (activities: string[]) => {
    if (!activities || activities.length === 0) return "None";
    return activities.join(", ");
  };

  const handleFieldUpdate = (
    field: keyof OnboardingData,
    value: string | number | boolean,
  ) => {
    if (!onboardingData) return Promise.reject("No onboarding data");

    const updatedData: OnboardingData = {
      ...onboardingData,
      [field]: value,
    };

    dispatch(completeOnboardingRequest(updatedData));
    return Promise.resolve();
  };

  const test = [12, "string"];

  console.log(test);

  const sportOptions = ["Running", "Cycling", "Swimming", "Triathlon"];
  const experienceLevelOptions = ["Beginner", "Intermediate", "Advanced"];
  const preferredWorkoutTimeOptions = ["Morning", "Afternoon", "Evening"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Athlete Profile
          </h2>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Click any field to edit your training profile
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
            <EditableField
              name="Primary Sport"
              value={onboardingData.sport}
              type="select"
              options={sportOptions}
              onSave={(value) => handleFieldUpdate("sport", value)}
            />
            <EditableField
              name="Experience Level"
              value={onboardingData.experienceLevel}
              type="select"
              options={experienceLevelOptions}
              onSave={(value) => handleFieldUpdate("experienceLevel", value)}
            />
            <EditableField
              name="Weekly Training Hours"
              value={onboardingData.weeklyTrainingHours}
              type="number"
              onSave={(value) =>
                handleFieldUpdate("weeklyTrainingHours", value)
              }
            />
          </div>
        </Tile>

        {/* Current Fitness */}
        <Tile>
          <Header
            icon={<FitnessCenterIcon fontSize="small" />}
            header="Current Fitness"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-11">
            <EditableField
              name="Current Volume"
              value={onboardingData.currentVolume || ""}
              onSave={(value) => handleFieldUpdate("currentVolume", value)}
            />
            <EditableField
              name="Longest Run"
              value={onboardingData.longestRun || ""}
              onSave={(value) => handleFieldUpdate("longestRun", value)}
            />
            <div className="md:col-span-2">
              <EditableField
                name="Recent Races"
                value={onboardingData.recentRaces || ""}
                onSave={(value) => handleFieldUpdate("recentRaces", value)}
              />
            </div>
            <div className="md:col-span-2">
              <EditableField
                name="Injuries"
                value={onboardingData.injuries || ""}
                onSave={(value) => handleFieldUpdate("injuries", value)}
              />
            </div>
          </div>
        </Tile>

        {/* Training Preferences */}
        <Tile>
          <Header
            icon={<SettingsIcon fontSize="small" />}
            header="Training Preferences"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-11">
            <EditableField
              name="Training Days per Week"
              value={onboardingData.trainingDays}
              type="number"
              onSave={(value) => handleFieldUpdate("trainingDays", value)}
            />
            <EditableField
              name="Preferred Workout Time"
              value={onboardingData.preferredWorkoutTime || ""}
              type="select"
              options={preferredWorkoutTimeOptions}
              onSave={(value) =>
                handleFieldUpdate("preferredWorkoutTime", value)
              }
            />
            <EditableField
              name="Gym Access"
              value={onboardingData.gymAccess}
              type="boolean"
              onSave={(value) => handleFieldUpdate("gymAccess", value)}
            />
            <Field
              name="Cross-Training"
              value={formatCrossTraining(onboardingData.crossTraining)}
            />
          </div>
        </Tile>
      </div>
    </div>
  );
}
