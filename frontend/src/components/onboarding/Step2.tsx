import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import OptionButton from "../OptionButton";
import FlagIcon from "@mui/icons-material/Flag";
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import type { Race } from "./types";
import type { OnboardingData } from "./types";

interface Step2Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  updateRace: (index: number, field: keyof Race, value: string) => void;
  addRace: () => void;
  removeRace: (index: number) => void;
}

export default function Step2({
  data,
  updateData,
  updateRace,
  addRace,
  removeRace,
}: Step2Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        What race(s) are you preparing for?
      </h2>

      {/* Checkbox for not preparing for a race */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!data.preparingForRace}
            onChange={(e) => updateData("preparingForRace", !e.target.checked)}
            className="w-4 h-4 text-light-CTA dark:text-dark-CTA-text border-light-border dark:border-dark-border rounded focus:ring-indigo-500"
          />
          <span className="ml-2 text-md text-light-text-secondary dark:text-dark-text-secondary">
            I am not preparing for any race, I train for general fitness.
          </span>
        </label>
      </div>

      {/* Show races only if preparing for a race */}
      {data.preparingForRace && (
        <>
          {data.races.map((race: Race, index: number) => (
            <div
              key={index}
              className="p-4 border-l-4 dark:border-dark-elevated/60 space-y-4 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white text-lg">
                  Race {index + 1}
                </h3>
                {data.races.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRace(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>

              <Input
                id={`race-name-${index}`}
                label="Race Name"
                type="text"
                value={race.name}
                onChange={(e) => updateRace(index, "name", e.target.value)}
                placeholder="e.g., New York City Marathon"
                required
              />

              <Select
                id={`race-discipline-${index}`}
                label="Discipline"
                value={race.discipline}
                onChange={(e) => {
                  updateRace(
                    index,
                    "discipline",
                    e.target.value as "Running" | "Triathlon",
                  );
                  // Reset distance when discipline changes
                  updateRace(index, "distance", "");
                }}
                options={[
                  { value: "Running", label: "Running" },
                  { value: "Triathlon", label: "Triathlon" },
                ]}
                required
              />

              <div>
                <label className="block text-md text-body mb-4">
                  Race Distance
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {race.discipline === "Running"
                    ? [
                        "5K",
                        "10K",
                        "Half Marathon",
                        "Marathon",
                        "Ultra",
                        "Other",
                      ].map((distance) => (
                        <OptionButton
                          key={distance}
                          label={distance}
                          selected={race.distance === distance}
                          onClick={() =>
                            updateRace(index, "distance", distance)
                          }
                        />
                      ))
                    : [
                        "Sprint",
                        "Olympic",
                        "Half Ironman",
                        "Ironman",
                        "Other",
                      ].map((distance) => (
                        <OptionButton
                          key={distance}
                          label={distance}
                          selected={race.distance === distance}
                          onClick={() =>
                            updateRace(index, "distance", distance)
                          }
                        />
                      ))}
                </div>
              </div>

              <Input
                id={`race-date-${index}`}
                label="Race Date"
                type="date"
                value={String(race.date)}
                onChange={(e) => updateRace(index, "date", e.target.value)}
                required
              />

              <div>
                <label className="block text-md text-body mb-4">
                  Goal for this race
                </label>
                <div className="space-y-2">
                  {[
                    { label: "Finish the race", icon: <FlagIcon /> },
                    {
                      label: "Beat a specific time",
                      icon: <TimerIcon />,
                    },
                    { label: "Personal best", icon: <StarIcon /> },
                    {
                      label: "Qualify for another race",
                      icon: <WorkspacePremiumIcon />,
                    },
                    {
                      label: "Improve endurance",
                      icon: <FitnessCenterIcon />,
                    },
                  ].map((goal) => (
                    <OptionButton
                      key={goal.label}
                      label={goal.label}
                      icon={goal.icon}
                      selected={race.goal === goal.label}
                      onClick={() => updateRace(index, "goal", goal.label)}
                      fullWidth
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Button type="button" onClick={addRace} variant="secondary" fullWidth>
            + Add Another Race
          </Button>
        </>
      )}
    </div>
  );
}
