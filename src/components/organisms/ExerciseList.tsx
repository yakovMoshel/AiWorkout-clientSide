import ExerciseCard from "./ExerciseCard";

interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  className?: string;
}

export default function ExerciseList({ exercises, className }: ExerciseListProps) {
  return (
    <div className={className}>
      {exercises.map(exercise => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}