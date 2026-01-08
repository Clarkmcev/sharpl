export type Race = {
  name: string;
  discipline: "Running" | "Triathlon";
  distance: string;
  date: string;
  goal: string;
};

export type OnboardingData = {
  // Step 1: Sport & Experience
  sport: string;
  experienceLevel: string;
  weeklyTrainingHours: number;

  // Step 2: Goals & Race
  preparingForRace: boolean;
  races: Race[];

  // Step 3: Current Fitness
  currentVolume: string;
  longestRun: string;
  recentRaces: string;
  injuries: string;

  // Step 4: Training Preferences
  trainingDays: number;
  preferredWorkoutTime: string;
  gymAccess: boolean;
  crossTraining: string[];
};
