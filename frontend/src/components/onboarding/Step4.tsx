import OptionButton from "../OptionButton";
import Select from "../Select";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import RowingIcon from "@mui/icons-material/Rowing";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import type { OnboardingData } from "../../generated";

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

      <Select
        id="training-days"
        label="Days per week you can train"
        value={data.trainingDays.toString()}
        onChange={(e) => updateData("trainingDays", parseInt(e.target.value))}
        options={Array.from({ length: 5 }, (_, i) => ({
          value: (i + 3).toString(),
          label: `${i + 3} day${i + 3 === 1 ? "" : "s"}`,
        }))}
        required
      />

      <div>
        <label className="block text-md text-body mb-4">
          Preferred workout time
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Morning", icon: <WbSunnyIcon /> },
            { label: "Afternoon", icon: <LightModeIcon /> },
            { label: "Evening", icon: <NightsStayIcon /> },
          ].map((time) => (
            <OptionButton
              key={time.label}
              label={time.label}
              icon={time.icon}
              selected={data.preferredWorkoutTime === time.label}
              onClick={() => updateData("preferredWorkoutTime", time.label)}
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
            className="w-4 h-4 bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border rounded cursor-pointer"
          />
          <span className="text-md text-body">
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
