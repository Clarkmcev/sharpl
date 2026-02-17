import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMyEnrollmentsRequest } from "../store/slices/trainingPlansSlice";
import Tile from "../components/Tile";
import SectionHeader from "../components/SectionHeader";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

export default function MyPlan() {
  const dispatch = useAppDispatch();
  const { myEnrollments, loadingEnrollments } = useAppSelector(
    (state) => state.trainingPlans,
  );

  useEffect(() => {
    dispatch(fetchMyEnrollmentsRequest());
  }, [dispatch]);

  const getRaceTypeIcon = (type?: string) => {
    if (type === "running") {
      return <DirectionsRunIcon fontSize="small" />;
    } else if (type === "triathlon") {
      return <DirectionsBikeIcon fontSize="small" />;
    }
    return <FitnessCenterIcon fontSize="small" />;
  };

  if (loadingEnrollments) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary-500 dark:border-dark-primary-500"></div>
      </div>
    );
  }

  if (myEnrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <FitnessCenterIcon
          sx={{ fontSize: 64 }}
          className="text-light-text-secondary dark:text-dark-text-secondary mb-4 mx-auto"
        />
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          You are not enrolled in any training plans yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-2 p-4">
        <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          My Training Plans
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
          Training plans you are currently enrolled in
        </p>
      </div>

      {myEnrollments.map((enrollment) => (
        <Tile key={enrollment.enrollmentId}>
          <SectionHeader
            icon={getRaceTypeIcon(enrollment.racePlan?.raceType)}
            header={enrollment.racePlan?.name || "Training Plan"}
          />
          <div className="ml-11 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Duration
                </p>
                <p className="text-lg font-semibold">
                  {enrollment.racePlan?.durationWeeks} weeks
                </p>
              </div>
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Start Date
                </p>
                <p className="text-lg font-semibold">
                  {enrollment.startDate
                    ? new Date(enrollment.startDate).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Status
                </p>
                <p className="text-lg font-semibold capitalize">
                  {enrollment.status}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {enrollment.racePlan?.description}
              </p>
            </div>
          </div>
        </Tile>
      ))}
    </div>
  );
}
