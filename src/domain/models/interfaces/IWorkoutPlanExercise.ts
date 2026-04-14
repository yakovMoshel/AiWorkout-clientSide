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
}

export interface ExerciseDayCardProps {
  day: string;
  exercises: WorkoutPlanExercise[];
}
