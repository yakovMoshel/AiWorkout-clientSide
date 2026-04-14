import { WorkoutPlanExercise } from "./IWorkoutPlanExercise";

export type { WorkoutPlanExercise as Exercise };

export interface WorkoutPlanDisplayProps {
  plan: {
    description?: string;
    workouts: { exercises: WorkoutPlanExercise[] }[];
  };
}
