import type { OnboardingData } from "./types";
import Input from "../Input";
import Textarea from "../Textarea";

interface Step3Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

export default function Step3({ data, updateData }: Step3Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Current fitness level
      </h2>

      <Input
        id="current-volume"
        label="Current weekly training volume"
        type="text"
        value={data.currentVolume}
        onChange={(e) => updateData("currentVolume", e.target.value)}
        placeholder="e.g., 30 miles/week or 5 hours/week"
        required
      />

      <Input
        id="longest-run"
        label="Longest run/workout in past month"
        type="text"
        value={data.longestRun}
        onChange={(e) => updateData("longestRun", e.target.value)}
        placeholder="e.g., 10 miles or 2 hours"
        required
      />

      <Textarea
        id="recent-races"
        label="Recent races (optional)"
        value={data.recentRaces}
        onChange={(e) => updateData("recentRaces", e.target.value)}
        placeholder="List recent race times and distances..."
        rows={3}
      />

      <Textarea
        id="injuries"
        label="Current or past injuries (optional)"
        value={data.injuries}
        onChange={(e) => updateData("injuries", e.target.value)}
        placeholder="Any injuries we should know about?"
        rows={3}
      />
    </div>
  );
}
