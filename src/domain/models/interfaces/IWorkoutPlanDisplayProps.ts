export interface WorkoutPlanDisplayProps {
  plan: {
    description?: string;
    workouts: { exercises: string[] }[];
  };
}