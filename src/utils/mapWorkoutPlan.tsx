import { WorkoutDay } from "../hooks/useWorkoutPlan";

export function mapPlanForDisplay(workouts: WorkoutDay[]) {
  return {
    description: "This is your weekly workout plan. Good luck!",
    workouts: workouts.map((day) => ({
      exercises: day.exercises.map((ex) => ex.name),
    })),
  };
}