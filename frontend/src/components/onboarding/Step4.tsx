import OptionButton from "../OptionButton";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import RowingIcon from "@mui/icons-material/Rowing";
import type { OnboardingData } from "./types";

interface Step4Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  toggleCrossTraining: (activity: string) => void;
}

export default function Step4({
  data,
  updateData,
  toggleCrossTraining,
}: Step4Props) {
  const crossTrainingActivities = [
    { label: "Strength Training", icon: <FitnessCenterIcon /> },
    { label: "Yoga", icon: <SelfImprovementIcon /> },
    { label: "Swimming", icon: <PoolIcon /> },
    { label: "Cycling", icon: <DirectionsBikeIcon /> },
    { label: "Pilates", icon: <AccessibilityNewIcon /> },
    { label: "Rowing", icon: <RowingIcon /> },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Training preferences
      </h2>

      <div>
        <label className="block text-md text-body mb-4">
          Days per week you can train :{" "}
          <span className="text-white">{data.trainingDays} days</span>
        </label>
        <input
          type="range"
          min="3"
          max="7"
          value={data.trainingDays}
          onChange={(e) => updateData("trainingDays", parseInt(e.target.value))}
          className="w-full h-2 bg-light-bg dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
          <span>3 days</span>
          <span>5 days</span>
          <span>7 days</span>
        </div>
      </div>

      <div>
        <label className="block text-md text-body mb-4">
          Preferred workout time
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Morning", "Afternoon", "Evening"].map((time) => (
            <OptionButton
              key={time}
              label={time}
              selected={data.preferredWorkoutTime === time}
              onClick={() => updateData("preferredWorkoutTime", time)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.gymAccess}
            onChange={(e) => updateData("gymAccess", e.target.checked)}
            className="w-5 h-5 text-indigo-600 bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-md text-light-text-primary dark:text-dark-text-primary">
            I have access to a gym or indoor training facility
          </span>
        </label>
      </div>

      <div>
        <label className="block text-md text-body mb-4">
          Cross-training activities (select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {crossTrainingActivities.map((activity) => (
            <OptionButton
              key={activity.label}
              label={activity.label}
              icon={activity.icon}
              selected={data.crossTraining.includes(activity.label)}
              onClick={() => toggleCrossTraining(activity.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
