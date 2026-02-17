import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  fetchMyEnrollmentsRequest,
  unenrollFromPlanRequest,
} from "../../store/slices/trainingPlansSlice";
import Tile from "../../components/Tile";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import Uncomplete from "./Uncomplete";
import Spinner from "../Spinner";

export default function EnrolledPlans() {
  const dispatch = useAppDispatch();
  const { myEnrollments, loadingEnrollments, unenrolling } = useAppSelector(
    (state) => state.trainingPlans,
  );

  useEffect(() => {
    dispatch(fetchMyEnrollmentsRequest());
  }, [dispatch]);

  const handleUnenroll = (planId: number) => {
    if (
      window.confirm(
        "Are you sure you want to unenroll from this training plan?",
      )
    ) {
      dispatch(unenrollFromPlanRequest(planId));
    }
  };

  const getRaceTypeIcon = (type?: string) => {
    if (type === "running") {
      return <DirectionsRunIcon fontSize="small" />;
    } else if (type === "triathlon") {
      return <DirectionsBikeIcon fontSize="small" />;
    }
    return <FitnessCenterIcon fontSize="small" />;
  };

  if (loadingEnrollments) {
    return <Spinner />;
  }

  if (myEnrollments.length === 0) {
    return (
      <Uncomplete
        title="No enrolled plans"
        message={
          <div>
            You are not enrolled in any training plans yet.{" "}
            <a href="/onboarding" className={`underline  hover:opacity-80`}>
              Choose a plan
            </a>
          </div>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {myEnrollments.map((enrollment) => (
        <Tile key={enrollment.enrollmentId} className="flex items-stretch">
          <div className="w-2 rounded-full background border-none" />
          <div className="w-full">
            <SectionHeader
              icon={getRaceTypeIcon(enrollment.racePlan?.raceType)}
              header={enrollment.racePlan?.name || "Training Plan"}
            />

            <div className="ml-12 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Duration
                  </p>
                  <p className="text-md font-semibold text-white">
                    {enrollment.racePlan?.durationWeeks} weeks
                  </p>
                </div>
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Start Date
                  </p>
                  <p className="text-md font-semibold text-white">
                    {enrollment.startDate
                      ? new Date(enrollment.startDate).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Status
                  </p>
                  <p className="text-md font-semibold capitalize text-white">
                    {enrollment.status}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  {enrollment.racePlan?.description}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => handleUnenroll(enrollment.racePlan?.id || 0)}
                  disabled={unenrolling}
                  loading={unenrolling}
                  variant="danger"
                >
                  Unenroll
                </Button>
              </div>
            </div>
          </div>
        </Tile>
      ))}
    </div>
  );
}
