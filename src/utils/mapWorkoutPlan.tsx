import { WorkoutDay } from "../hooks/useWorkoutPlan";
import { WorkoutPlanExercise } from "../domain/models/interfaces/IWorkoutPlanExercise";

export function mapPlanForDisplay(workouts: WorkoutDay[]) {
  return {
    description: "This is your weekly workout plan. Good luck!",
    workouts: workouts.map((day) => ({
      exercises: day.exercises as unknown as WorkoutPlanExercise[],
    })),
  };
}
