import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { completeOnboardingRequest } from "../store/slices/onboardingSlice";
import { loginRequest } from "../store/slices/authSlice";
import Button from "../components/Button";
import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import Step4 from "../components/onboarding/Step4";
import type { OnboardingData } from "../components/onboarding/types";

const initialData: OnboardingData = {
  sport: "",
  experienceLevel: "",
  weeklyTrainingHours: 5,
  preparingForRace: true,
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
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.onboarding);

  const totalSteps = 4;

  // scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setShowErrors(false); // Clear errors when user makes changes
  };

  // Validation function for each step
  const validateStep = (stepNumber: number): string[] => {
    const stepErrors: string[] = [];

    switch (stepNumber) {
      case 1:
        if (!data.sport) stepErrors.push("Please select your primary sport");
        if (!data.experienceLevel)
          stepErrors.push("Please select your experience level");
        break;

      case 2:
        // Only validate races if user is preparing for a race
        if (data.preparingForRace) {
          data.races.forEach((race, index) => {
            if (!race.name)
              stepErrors.push(`Race ${index + 1}: Please enter race name`);
            if (!race.distance)
              stepErrors.push(`Race ${index + 1}: Please select distance`);
            if (!race.date)
              stepErrors.push(`Race ${index + 1}: Please enter race date`);
            if (!race.goal)
              stepErrors.push(`Race ${index + 1}: Please select a goal`);
          });
        }
        break;

      case 3:
        if (!data.currentVolume)
          stepErrors.push("Please enter your current weekly training volume");
        if (!data.longestRun)
          stepErrors.push("Please enter your longest recent workout");
        break;

      case 4:
        if (!data.preferredWorkoutTime)
          stepErrors.push("Please select your preferred workout time");
        break;
    }

    return stepErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep(step);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setErrors([]);
    // Mark current step as completed
    setCompletedSteps((prev) => new Set(prev).add(step));
    if (step < totalSteps) setStep(step + 1);
  };

  // Check if current step is complete
  const isStepComplete = (): boolean => {
    return isSpecificStepComplete(step);
  };

  // Check if a specific step number is complete
  const isSpecificStepComplete = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!data.sport && !!data.experienceLevel;
      case 2:
        if (!data.preparingForRace) return true;
        return data.races.every(
          (race) => race.name && race.distance && race.date && race.goal
        );
      case 3:
        return !!data.currentVolume && !!data.longestRun;
      case 4:
        return !!data.preferredWorkoutTime;
      default:
        return false;
    }
  };

  // Check if a specific step is accessible
  const isStepAccessible = (stepNumber: number): boolean => {
    // Current step is always accessible
    if (stepNumber === step) return true;
    // Can go back to any completed step
    if (completedSteps.has(stepNumber)) return true;
    // Can access first step
    if (stepNumber === 1) return true;
    // Can only access next step if previous step is completed
    return completedSteps.has(stepNumber - 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setShowErrors(false);
      setErrors([]);
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep(step);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      setShowErrors(true);
      return;
    }

    // Mark final step as complete
    setCompletedSteps((prev) => new Set(prev).add(step));
    setIsSubmitting(true);

    // Dispatch the onboarding data
    dispatch(completeOnboardingRequest(data));

    // Check if user just registered and needs auto-login
    const pendingAuth = sessionStorage.getItem("pendingAuth");

    if (pendingAuth) {
      try {
        const { email, password } = JSON.parse(pendingAuth);

        // Auto-login after a brief delay
        setTimeout(() => {
          dispatch(loginRequest({ email, password }));
          sessionStorage.removeItem("pendingAuth");

          // Redirect to dashboard after login
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }, 1500);
      } catch (error) {
        console.error("Failed to parse pending auth", error);
        navigate("/dashboard");
      }
    } else {
      // User was already logged in, just redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
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
    setShowErrors(false); // Clear errors when user makes changes
  };

  const removeRace = (index: number) => {
    setData((prev) => ({
      ...prev,
      races: prev.races.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center background">
          <div className="text-center">
            {/* Animated checkmark */}
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 rounded-full background-primary flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              Setup Complete!
            </h2>
            <p className="text-body mb-6">
              Preparing your personalized training plan...
            </p>

            {/* Loading spinner */}
            <div className="flex justify-center">
              <div className="loader justify-center flex"></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
            Welcome to Sharpl
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Let's personalize your training experience
          </p>

          {/* Skip Button */}
          <button
            onClick={() => {
              // Auto-login if pending auth exists
              const pendingAuth = sessionStorage.getItem("pendingAuth");
              if (pendingAuth) {
                try {
                  const { email, password } = JSON.parse(pendingAuth);
                  dispatch(loginRequest({ email, password }));
                  sessionStorage.removeItem("pendingAuth");
                } catch (error) {
                  console.error("Failed to parse pending auth", error);
                }
              }
              navigate("/dashboard");
            }}
            className="absolute top-0 right-0 text-sm text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-text-secondary dark:hover:text-dark-text-secondary transition-colors underline"
          >
            Skip for now
          </button>
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
              className="bg-light-CTA-bg dark:bg-dark-CTA-bg h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Tabs */}
        <div className="mb-2 flex overflow-x-auto gap-2">
          {[
            { number: 1, label: "Background" },
            { number: 2, label: "Race Goals" },
            { number: 3, label: "Fitness Level" },
            { number: 4, label: "Preferences" },
          ].map((tab) => {
            const isCompleted = completedSteps.has(tab.number);
            const isAccessible = isStepAccessible(tab.number);
            const isCurrent = step === tab.number;

            return (
              <button
                key={tab.number}
                type="button"
                onClick={() => {
                  if (isAccessible) {
                    setStep(tab.number);
                    setShowErrors(false);
                    setErrors([]);
                  }
                }}
                disabled={!isAccessible}
                className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all relative ${
                  isCurrent
                    ? "text-white shadow-lg"
                    : isCompleted
                    ? "text-white cursor-pointer"
                    : isAccessible
                    ? "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg cursor-pointer"
                    : " text-light-text-tertiary dark:text-dark-text-tertiary opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span className={`text-xs opacity-75`}>
                      Step {tab.number}
                    </span>
                    {isCompleted && (
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Error Messages */}
            {showErrors && errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">
                      Please complete the following fields:
                    </h3>
                    <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step Components */}
            {step === 1 && <Step1 data={data} updateData={updateData} />}
            {step === 2 && (
              <Step2
                data={data}
                updateData={updateData}
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
                <Button
                  type="button"
                  onClick={nextStep}
                  variant="primary"
                  disabled={!isStepComplete()}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading || !isStepComplete()}
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
