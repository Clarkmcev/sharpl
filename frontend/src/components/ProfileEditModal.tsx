import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { completeOnboardingRequest } from "../store/slices/onboardingSlice";
import Button from "./Button";
import Step1 from "./onboarding/Step1";
import Step2 from "./onboarding/Step2";
import Step3 from "./onboarding/Step3";
import Step4 from "./onboarding/Step4";
import StatusMessage from "./StatusMessage";
import type { OnboardingData, Race } from "../generated";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: OnboardingData;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  initialData,
}: ProfileEditModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(
    initialData || {
      sport: "",
      experienceLevel: "",
      weeklyTrainingHours: 5,
      preparingForRace: true,
      races: [
        {
          name: "",
          discipline: "Running",
          distance: "",
          date: new Date(),
          goal: "",
        },
      ],
      currentVolume: "",
      longestRun: "",
      recentRaces: "",
      injuries: "",
      trainingDays: 5,
      preferredWorkoutTime: "",
      gymAccess: false,
      crossTraining: [],
    },
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.onboarding);

  const totalSteps = 4;

  // Reset to step 1 when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialData) {
        setData(initialData);
      }
    }
  }, [isOpen, initialData]);

  // Scroll to top when step changes
  useEffect(() => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  }, [step]);

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setShowErrors(false);
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
    setCompletedSteps((prev) => new Set(prev).add(step));
    if (step < totalSteps) setStep(step + 1);
  };

  const isStepComplete = (): boolean => {
    return isSpecificStepComplete(step);
  };

  const isSpecificStepComplete = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!data.sport && !!data.experienceLevel;
      case 2:
        if (!data.preparingForRace) return true;
        return data.races.every(
          (race) => race.name && race.distance && race.date && race.goal,
        );
      case 3:
        return !!data.currentVolume && !!data.longestRun;
      case 4:
        return !!data.preferredWorkoutTime;
      default:
        return false;
    }
  };

  const isStepAccessible = (stepNumber: number): boolean => {
    if (stepNumber === step) return true;
    if (completedSteps.has(stepNumber)) return true;
    if (stepNumber === 1) return true;
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

    setCompletedSteps((prev) => new Set(prev).add(step));
    dispatch(completeOnboardingRequest(data));

    // Close modal after successful submission
    setTimeout(() => {
      onClose();
    }, 1000);
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
        {
          name: "",
          discipline: "Running",
          distance: "",
          date: new Date(),
          goal: "",
        },
      ],
    }));
  };

  const updateRace = (index: number, field: keyof Race, value: string) => {
    setData((prev) => {
      const newRaces = [...prev.races];
      newRaces[index] = { ...newRaces[index], [field]: value };
      return { ...prev, races: newRaces };
    });
    setShowErrors(false);
  };

  const removeRace = (index: number) => {
    setData((prev) => ({
      ...prev,
      races: prev.races.filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-light-border dark:border-dark-border flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Edit Profile
            </h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Update your training preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-light-bg dark:bg-dark-bg">
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

          {/* Step Tabs */}
          <div className="mt-4 flex overflow-x-auto gap-2">
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
                  className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                    isCurrent
                      ? "bg-light-CTA-bg dark:bg-dark-CTA-bg text-white shadow-lg"
                      : isCompleted
                        ? "bg-green-500 text-white cursor-pointer"
                        : isAccessible
                          ? "bg-light-elevated dark:bg-dark-elevated text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg cursor-pointer"
                          : "bg-light-elevated dark:bg-dark-elevated text-light-text-tertiary dark:text-dark-text-tertiary opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>{tab.label}</span>
                    {isCompleted && (
                      <svg
                        className="w-3 h-3"
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div
          id="modal-content"
          className="px-6 py-6 overflow-y-auto max-h-[50vh]"
        >
          <form onSubmit={handleSubmit}>
            {/* Error Messages */}
            {showErrors && errors.length > 0 && (
              <StatusMessage
                type="error"
                messages={errors}
                title="Please complete the following fields:"
              />
            )}

            {error && (
              <StatusMessage
                type="error"
                messages={[error]}
                title="Error saving profile:"
              />
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
          </form>
        </div>

        {/* Footer with Navigation */}
        <div className="px-6 py-4 border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
          <div className="flex justify-between">
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
                type="button"
                onClick={handleSubmit}
                disabled={loading || !isStepComplete()}
                loading={loading}
                variant="primary"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
