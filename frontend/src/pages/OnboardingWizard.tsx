import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { completeOnboardingRequest } from "../store/slices/onboardingSlice";
import Button from "../components/Button";
import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import Step4 from "../components/onboarding/Step4";
import type { OnboardingData, Race } from "../components/onboarding/types";

const initialData: OnboardingData = {
  sport: "",
  experienceLevel: "",
  weeklyTrainingHours: 5,
  races: [
    { name: "", discipline: "Running", distance: "", date: "", goal: "" },
  ],
  currentVolume: "",
  longestRun: "",
  recentRaces: "",
  injuries: "",
  trainingDays: 5,
  preferredWorkoutTime: "",
  gymAccess: false,
  crossTraining: [],
};

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.onboarding);

  const totalSteps = 4;

  // scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(completeOnboardingRequest(data));
  };

  const toggleCrossTraining = (activity: string) => {
    setData((prev) => ({
      ...prev,
      crossTraining: prev.crossTraining.includes(activity)
        ? prev.crossTraining.filter((a) => a !== activity)
        : [...prev.crossTraining, activity],
    }));
  };

  // Race management functions
  const addRace = () => {
    setData((prev) => ({
      ...prev,
      races: [
        ...prev.races,
        { name: "", discipline: "Running", distance: "", date: "", goal: "" },
      ],
    }));
  };

  const updateRace = (index: number, field: keyof Race, value: string) => {
    setData((prev) => {
      const newRaces = [...prev.races];
      newRaces[index] = { ...newRaces[index], [field]: value };
      return { ...prev, races: newRaces };
    });
  };

  const removeRace = (index: number) => {
    setData((prev) => ({
      ...prev,
      races: prev.races.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
            Welcome to Sharpl
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Let's personalize your training experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-light-surface dark:bg-dark-surface rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Tabs */}
        <div className="mb-2 flex overflow-x-auto">
          {[
            { number: 1, label: "Background" },
            { number: 2, label: "Race Goals" },
            { number: 3, label: "Fitness Level" },
            { number: 4, label: "Preferences" },
          ].map((tab) => (
            <button
              key={tab.number}
              type="button"
              onClick={() => setStep(tab.number)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                step === tab.number
                  ? "text-white"
                  : "text-light-text-secondary dark:text-dark-text-secondary cursor-pointer"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs opacity-75">Step {tab.number}</span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step Components */}
            {step === 1 && <Step1 data={data} updateData={updateData} />}
            {step === 2 && (
              <Step2
                data={data}
                updateRace={updateRace}
                addRace={addRace}
                removeRace={removeRace}
              />
            )}
            {step === 3 && <Step3 data={data} updateData={updateData} />}
            {step === 4 && (
              <Step4
                data={data}
                updateData={updateData}
                toggleCrossTraining={toggleCrossTraining}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6">
              <Button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                variant="secondary"
              >
                Previous
              </Button>

              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} variant="primary">
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  variant="primary"
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
