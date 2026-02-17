import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  fetchTrainingPlansRequest,
  enrollInPlanRequest,
  setSelectedPlan,
  resetEnrollmentState,
} from "../store/slices/trainingPlansSlice";
import type { RacePlan } from "../generated";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function Plans() {
  const dispatch = useAppDispatch();
  const {
    plans,
    selectedPlan,
    loading,
    enrolling,
    error,
    enrollmentSuccess,
  } = useAppSelector((state) => state.trainingPlans);

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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary-500 dark:border-dark-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-2 p-4">
        <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Training Plans
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
          Choose a structured training plan to prepare for your race
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="surface-light rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={() => dispatch(setSelectedPlan(plan))}
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

              <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>

              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
                {plan.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{plan.durationWeeks}</span>
                  <span>weeks</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium capitalize">
                    {plan.raceType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && !loading && (
        <div className="text-center py-12">
          <FitnessCenterIcon
            sx={{ fontSize: 64 }}
            className="text-light-text-secondary dark:text-dark-text-secondary mb-4 mx-auto"
          />
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            No training plans found matching your filters
          </p>
        </div>
      )}

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
