export interface WorkoutPlanExercise {
  name: string;
  duration: string;
  repetitions: string;
  sets: string;
  equipment: string;
  image?: string;
}

export interface WorkoutExerciseCardProps {
  exercise: WorkoutPlanExercise;
  pr?: number;
  saveLog?: (sets: { weight: number; reps: number }[]) => Promise<void>;
  onAllCompleted?: (sets: { weight: number; reps: number }[]) => void;
}

export interface ExerciseDayCardProps {
  day: string;
  exercises: WorkoutPlanExercise[];
}
