import type { RacePlan } from "../../generated";
import { useStaggerAnimation } from "../../hooks/useStaggerAnimation";

interface PlanCardProps {
  plan: RacePlan;
  index: number;
  onSelect: () => void;
  getRaceTypeIcon: (type?: string) => React.ReactElement;
  getLevelColor: (level?: string) => string;
}

function PlanCard({
  plan,
  index,
  onSelect,
  getRaceTypeIcon,
  getLevelColor,
}: PlanCardProps) {
  const { ref, isVisible } = useStaggerAnimation<HTMLDivElement>(index, {
    delay: 80,
    duration: 400,
  });

  return (
    <div
      ref={ref}
      className={`surface-light group rounded-lg shadow cursor-pointer overflow-hidden transform transition-all duration-400 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4  hover:translate-y-0"
      }  hover:-translate-y-1 hover:translate-x-1 hover:shadow-xl`}
      style={{
        transitionDuration: "400ms",
      }}
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 rounded-lg bg-light-primary-100 dark:bg-dark-primary-900/30 text-light-primary-500 dark:text-dark-primary-500">
            {getRaceTypeIcon(plan.raceType)}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
              plan.experienceLevel,
            )}`}
          >
            {plan.experienceLevel.slice().charAt(0).toUpperCase() +
              plan.experienceLevel.slice().substring(1)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary duration-300">
          {plan.name}
        </h3>

        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
          {plan.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <div className="flex items-center gap-1">
            <span className="font-medium">{plan.durationWeeks}</span>
            <span>weeks</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium capitalize">{plan.raceType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
