import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  fetchTrainingPlansRequest,
  enrollInPlanRequest,
  setSelectedPlan,
} from "../../store/slices/trainingPlansSlice";
import type { RacePlan } from "../../generated";
import {
  RacePlanRaceTypeEnum,
  RacePlanExperienceLevelEnum,
} from "../../generated";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import PlanCard from "./PlanCard";

const LEVEL_OPTIONS = [
  "all",
  ...Object.values(RacePlanExperienceLevelEnum),
] as const;
const SPORT_OPTIONS = ["all", ...Object.values(RacePlanRaceTypeEnum)] as const;

type LevelFilter = (typeof LEVEL_OPTIONS)[number];
type SportFilter = (typeof SPORT_OPTIONS)[number];

export default function AvailablePlans() {
  const dispatch = useAppDispatch();
  const { plans, selectedPlan, loading, enrolling } = useAppSelector(
    (state) => state.trainingPlans,
  );

  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [sportFilter, setSportFilter] = useState<SportFilter>("all");

  // Keep last non-null plan so modal content stays visible during close animation
  const [planForModal, setPlanForModal] = useState(selectedPlan);
  useEffect(() => {
    if (selectedPlan) setPlanForModal(selectedPlan);
  }, [selectedPlan]);

  useEffect(() => {
    dispatch(fetchTrainingPlansRequest());
  }, [dispatch]);

  const handleEnroll = (plan: RacePlan) => {
    if (enrolling) return;
    const today = new Date();
    dispatch(enrollInPlanRequest({ planId: plan.id!, startDate: today }));
  };

  const getRaceTypeIcon = (type?: string) => {
    if (type === "running") {
      return <DirectionsRunIcon />;
    } else if (type === "triathlon") {
      return <DirectionsBikeIcon />;
    }
    return <FitnessCenterIcon />;
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const filteredPlans = plans.filter((plan) => {
    const levelMatch =
      levelFilter === "all" || plan.experienceLevel === levelFilter;
    const sportMatch = sportFilter === "all" || plan.raceType === sportFilter;
    return levelMatch && sportMatch;
  });

  const filterButtonClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
      active
        ? "bg-light-primary-500 dark:bg-dark-primary-500 text-white"
        : "bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary-100/20 dark:hover:bg-dark-primary-900/20"
    }`;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-6 pb-4 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
            Sport:
          </span>
          {SPORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={filterButtonClass(sportFilter === opt)}
              onClick={() => setSportFilter(opt)}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
            Level:
          </span>
          {LEVEL_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={filterButtonClass(levelFilter === opt)}
              onClick={() => setLevelFilter(opt)}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        {filteredPlans.length === 0 ? (
          <p className="col-span-3 text-center text-light-text-secondary dark:text-dark-text-secondary py-8">
            No plans match the selected filters.
          </p>
        ) : (
          filteredPlans.map((plan, index) => (
            <PlanCard
              key={`${sportFilter}-${levelFilter}-${plan.id}`}
              plan={plan}
              index={index}
              onSelect={() => dispatch(setSelectedPlan(plan))}
              getRaceTypeIcon={getRaceTypeIcon}
              getLevelColor={getLevelColor}
            />
          ))
        )}
      </div>

      {/* Plan Details Modal */}
      <Modal
        isOpen={!!selectedPlan}
        onClose={() => dispatch(setSelectedPlan(null))}
        title={planForModal?.name}
        maxWidth="3xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              onClick={() => dispatch(setSelectedPlan(null))}
              variant="secondary"
            >
              Close
            </Button>
            <Button
              onClick={() => handleEnroll(planForModal!)}
              variant="primary"
              disabled={enrolling}
            >
              {enrolling ? "Enrolling..." : "Train Now"}
            </Button>
          </div>
        }
      >
        {planForModal && (
          <div>
            <div className="flex justify-between items-center gap-2 mb-6 rounded-lg">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                  planForModal.experienceLevel,
                )}`}
              >
                {planForModal.experienceLevel.charAt(0).toUpperCase() +
                  planForModal.experienceLevel.substring(1)}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {planForModal.durationWeeks} weeks
                </span>
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary capitalize">
                  {planForModal.raceType}
                </span>
              </div>
            </div>

            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              {planForModal.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
