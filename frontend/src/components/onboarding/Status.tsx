import React from "react";
import StatusMessage from "../StatusMessage";
import Loader from "./status/Loader";

interface StatusProps {
  isSubmitting: boolean;
  completed: boolean;
  error?: string;
}

/**
 * Status component for onboarding flow
 * Displays loading state, success message, or error message based on props
 */
const Status: React.FC<StatusProps> = ({ isSubmitting, completed, error }) => {
  // Only show error if it exists and we're not in loading/completed states
  const shouldShowError = error && !isSubmitting && !completed;

  return (
    <>
      {isSubmitting && <Loader />}
      {completed && !isSubmitting && (
        <StatusMessage
          type="success"
          message="Onboarding complete! Redirecting to dashboard..."
        />
      )}
      {shouldShowError && <StatusMessage type="error" message={error} />}
    </>
  );
};

export default Status;
