import OptionButton from "../OptionButton";
import Select from "../Select";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import type { OnboardingData } from "./types";

interface Step1Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

export default function Step1({ data, updateData }: Step1Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Tell us about your endurance background
      </h2>

      <div>
        <label className="block text-md text-light-text-secondary dark:text-dark-text-secondary mb-4">
          What's your primary sport?
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: "Running", value: "Running", icon: <DirectionsRunIcon /> },
            {
              label: "Cycling",
              value: "Cycling",
              icon: <DirectionsBikeIcon />,
            },
            { label: "Swimming", value: "Swimming", icon: <PoolIcon /> },
          ].map((sport) => (
            <OptionButton
              key={sport.value}
              label={sport.label}
              selected={data.sport === sport.value}
              onClick={() => updateData("sport", sport.value)}
              icon={sport.icon}
              fullWidth
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-md text-light-text-secondary dark:text-dark-text-secondary mb-4">
          What is your experience level?
        </label>
        <div className="space-y-2">
          {[
            {
              label: "Beginner - Just getting started",
              value: "beginner",
              icon: <LocalFireDepartmentIcon />,
            },
            {
              label: "Intermediate - Training regularly",
              value: "intermediate",
              icon: <TrendingUpIcon />,
            },
            {
              label: "Advanced - Competitive athlete",
              value: "advanced",
              icon: <StarIcon />,
            },
            {
              label: "Elite - Professional/Semi-pro",
              value: "elite",
              icon: <MilitaryTechIcon />,
            },
          ].map((level) => (
            <OptionButton
              key={level.value}
              label={level.label}
              selected={data.experienceLevel === level.value}
              onClick={() => updateData("experienceLevel", level.value)}
              icon={level.icon}
              fullWidth
            />
          ))}
        </div>
      </div>

      <div>
        <Select
          id="weekly-training-hours"
          label="Weekly training hours"
          value={data.weeklyTrainingHours.toString()}
          onChange={(e) =>
            updateData("weeklyTrainingHours", parseInt(e.target.value))
          }
          options={Array.from({ length: 20 }, (_, i) => ({
            value: (i + 1).toString(),
            label: `${i + 1} hour${i + 1 === 1 ? "" : "s"}`,
          }))}
          required
        />
      </div>
    </div>
  );
}
