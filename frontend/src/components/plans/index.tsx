import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  fetchTrainingPlansRequest,
  enrollInPlanRequest,
  setSelectedPlan,
  resetEnrollmentState,
} from "../../store/slices/trainingPlansSlice";
import type { RacePlan } from "../../generated";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import PlanCard from "./PlanCard";

export default function AvailablePlans() {
  const dispatch = useAppDispatch();
  const { plans, selectedPlan, loading, enrolling, error, enrollmentSuccess } =
    useAppSelector((state) => state.trainingPlans);

  useEffect(() => {
    dispatch(fetchTrainingPlansRequest());
  }, [dispatch]);

  useEffect(() => {
    if (enrollmentSuccess) {
      alert("Successfully enrolled in training plan!");
      dispatch(resetEnrollmentState());
    }
  }, [enrollmentSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(resetEnrollmentState());
    }
  }, [error, dispatch]);

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 pt-2">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            index={index}
            onSelect={() => dispatch(setSelectedPlan(plan))}
            getRaceTypeIcon={getRaceTypeIcon}
            getLevelColor={getLevelColor}
          />
        ))}
      </div>

      {/* Plan Details Modal */}
      <Modal
        isOpen={!!selectedPlan}
        onClose={() => dispatch(setSelectedPlan(null))}
        title={selectedPlan?.name}
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
              onClick={() => handleEnroll(selectedPlan!)}
              variant="primary"
              disabled={enrolling}
            >
              {enrolling ? "Enrolling..." : "Train Now"}
            </Button>
          </div>
        }
      >
        {selectedPlan && (
          <div>
            <div className="flex justify-between items-center gap-2 mb-6 rounded-lg">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                  selectedPlan.experienceLevel,
                )}`}
              >
                {selectedPlan.experienceLevel.charAt(0).toUpperCase() +
                  selectedPlan.experienceLevel.substring(1)}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {selectedPlan.durationWeeks} weeks
                </span>
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary capitalize">
                  {selectedPlan.raceType}
                </span>
              </div>
            </div>

            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              {selectedPlan.description}
            </p>

            {selectedPlan.weeklyStructure?.weeks &&
              selectedPlan.weeklyStructure.weeks.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                    Weekly Structure
                  </h3>
                  <div className="space-y-2">
                    {selectedPlan.weeklyStructure.weeks.map((week) => (
                      <Disclosure key={week.week}>
                        {({ open }) => (
                          <>
                            <DisclosureButton className="w-full flex items-center justify-between gap-3 p-4 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-primary-100/10 dark:hover:bg-dark-primary-900/20 transition-colors cursor-pointer">
                              <div className="flex items-center gap-3">
                                <div className="px-3 py-1 rounded-lg bg-light-primary-100 dark:bg-dark-primary-900/30">
                                  <span className="text-sm font-bold text-white">
                                    Week {week.week}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-left">
                                  {week.description}
                                </p>
                              </div>
                              <ExpandMoreIcon
                                className={`text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-200 ${
                                  open ? "rotate-180" : ""
                                }`}
                              />
                            </DisclosureButton>
                            <DisclosurePanel className="px-4 pt-2 pb-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                              <div className="pl-4 border-l-2 border-light-primary-500 dark:border-dark-primary-500">
                                <p className="mb-2">
                                  Detailed breakdown for Week {week.week}:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  <li>Focus: {week.description}</li>
                                  <li>Duration: 7 days</li>
                                  <li>
                                    Training sessions will be scheduled
                                    throughout the week
                                  </li>
                                </ul>
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
}
