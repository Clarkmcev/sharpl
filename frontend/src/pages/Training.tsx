import { useEffect, useState } from "react";
import { RacePlansApi } from "../generated";
import type { RacePlan } from "../generated";
import { Configuration } from "../generated/runtime";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Training() {
  const [racePlans, setRacePlans] = useState<RacePlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<RacePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRaceType, setSelectedRaceType] = useState<string>("all");
  const [selectedDistance, setSelectedDistance] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedPlan, setSelectedPlan] = useState<RacePlan | null>(null);

  useEffect(() => {
    fetchRacePlans();
  }, []);

  useEffect(() => {
    filterPlans();
  }, [selectedRaceType, selectedDistance, selectedLevel, racePlans]);

  const fetchRacePlans = async () => {
    try {
      const config = new Configuration({
        basePath: "http://localhost:8080/api/v1",
      });
      const api = new RacePlansApi(config);
      const response = await api.getRacePlans();
      setRacePlans(response.data || []);
      setFilteredPlans(response.data || []);
    } catch (error) {
      console.error("Error fetching race plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlans = () => {
    let filtered = [...racePlans];

    if (selectedRaceType !== "all") {
      filtered = filtered.filter((plan) => plan.raceType === selectedRaceType);
    }

    if (selectedDistance !== "all") {
      filtered = filtered.filter((plan) => plan.distance === selectedDistance);
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter(
        (plan) => plan.experienceLevel === selectedLevel,
      );
    }

    setFilteredPlans(filtered);
  };

  const getUniqueDistances = () => {
    return Array.from(new Set(racePlans.map((plan) => plan.distance))).sort();
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

      {/* Filters */}
      {/* <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FilterListIcon className="text-light-text-secondary dark:text-dark-text-secondary" />
          <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
            Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Race Type
            </label>
            <select
              value={selectedRaceType}
              onChange={(e) => setSelectedRaceType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            >
              <option value="all">All Types</option>
              <option value="running">Running</option>
              <option value="triathlon">Triathlon</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Distance
            </label>
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            >
              <option value="all">All Distances</option>
              {getUniqueDistances().map((distance) => (
                <option key={distance} value={distance}>
                  {distance}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Experience Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Showing {filteredPlans.length} of {racePlans.length} plans
        </div>
      </div> */}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className="surface-light rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
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

      {filteredPlans.length === 0 && (
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
      {/* {selectedPlan && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="bg-light-surface dark:bg-dark-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {selectedPlan.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        selectedPlan.experienceLevel,
                      )}`}
                    >
                      {selectedPlan.experienceLevel}
                    </span>
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {selectedPlan.durationWeeks} weeks
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary"
                >
                  ✕
                </button>
              </div>

              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                {selectedPlan.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                  Weekly Structure
                </h3>
                <div className="space-y-3">
                  {selectedPlan.weeklyStructure?.weeks?.map((week) => (
                    <div
                      key={week.week}
                      className="flex items-start gap-3 p-3 rounded-lg bg-light-bg dark:bg-dark-bg"
                    >
                      <div className="w-16 h-16 rounded-lg bg-light-primary-100 dark:bg-dark-primary-900/30 flex items-center justify-center">
                        <span className="text-lg font-bold text-light-primary-500 dark:text-dark-primary-500">
                          W{week.week}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-light-text-primary dark:text-dark-text-primary">
                          {week.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full px-6 py-3 bg-light-primary-500 dark:bg-dark-primary-600 text-white rounded-lg hover:bg-light-primary-600 dark:hover:bg-dark-primary-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
