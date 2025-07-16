import { ExerciseListProps } from "../../domain/models/interfaces/IExerciseListProps";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseList({ exercises, className }: ExerciseListProps) {
  return (
    <div className={className}>
      {exercises.map(exercise => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}