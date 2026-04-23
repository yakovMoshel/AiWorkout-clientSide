import { WorkoutPlanExercise } from "./IWorkoutPlanExercise";
import { SetLog } from "./ISetLog";

export interface WorkoutExerciseCardProps {
  exercise: WorkoutPlanExercise;
  pr?: number;
  saveLog?: (sets: SetLog[]) => Promise<void>;
  onAllCompleted?: (sets: SetLog[]) => void;
}
