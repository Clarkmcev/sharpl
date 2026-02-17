import Tile from "../Tile";
import Section from "../Section";
import SectionHeader from "../SectionHeader";
import Field from "../Field";
import EditableField from "../EditableField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  completeOnboardingRequest,
  fetchOnboardingRequest,
} from "../../store/slices/onboardingSlice";
import type { OnboardingData } from "../../generated";
import { useEffect } from "react";
import Uncomplete from "./Uncomplete";
import Spinner from "../Spinner";

function PersonalInformation() {
  const dispatch = useAppDispatch();
  const { data: onboardingData, loading } = useAppSelector(
    (state) => state.onboarding,
  );
  const { user } = useAppSelector((state) => state.auth);

  const sportOptions = ["Running", "Cycling", "Swimming", "Triathlon"];
  const experienceLevelOptions = ["Beginner", "Intermediate", "Advanced"];
  const preferredWorkoutTimeOptions = ["Morning", "Afternoon", "Evening"];

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

  const formatCrossTraining = (activities: string[]) => {
    if (!activities || activities.length === 0) return "None";
    return activities.join(", ");
  };

  useEffect(() => {
    dispatch(fetchOnboardingRequest());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (!onboardingData) {
    return (
      <Uncomplete
        title="Onboarding Incomplete"
        message={
          <p className="text-sm mt-1 text-light-text-secondary dark:text-dark-text-secondary">
            You haven't completed the onboarding process yet.{" "}
            <a href="/onboarding" className={`underline  hover:opacity-80`}>
              Complete setup
            </a>
          </p>
        }
      />
    );
  }

  return (
    <Tile>
      <section className="flex space-y-4 flex-col">
        {/* Personal Information */}
        <Section>
          <SectionHeader header="Personal Information" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-11">
            <Field name="Name" value={user?.name || "Not provided"} />
            <Field name="Email" value={user?.email || "Not provided"} />
          </div>
        </Section>

        {/* Sport & Experience */}
        <Section>
          <SectionHeader header="Sport & Experience" />
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
        </Section>

        {/* Current Fitness */}
        <Section>
          <SectionHeader header="Current Fitness" />
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
        </Section>

        {/* Training Preferences */}
        <Section>
          <SectionHeader header="Training Preferences" />
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
        </Section>
      </section>
    </Tile>
  );
}

export default PersonalInformation;
