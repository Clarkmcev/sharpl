function OnboardingSubmitLoader() {
  return (
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

        <h2 className="text-3xl font-bold text-white mb-2">Setup Complete!</h2>
        <p className="text-body mb-6">
          Preparing your personalized training plan...
        </p>

        {/* Loading spinner */}
        <div className="flex justify-center">
          <div className="loader justify-center flex"></div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingSubmitLoader;
