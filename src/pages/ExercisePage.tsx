import { useParams, useNavigate } from "react-router-dom";
import { useWorkoutPlan } from "../hooks/useWorkoutPlan";
import { WorkoutPlanExercise } from "../domain/models/interfaces/IWorkoutPlanExercise";
import WorkoutExerciseCard from "../components/organisms/WorkoutExerciseCard";
import styles from "../styles/ExercisePage.module.css";

export default function ExercisePage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { workouts, loading, error } = useWorkoutPlan();

  const decodedName = name ? decodeURIComponent(name) : "";

  const exercise = workouts
    .flatMap((day) => day.exercises as unknown as WorkoutPlanExercise[])
    .find((ex) => ex.name === decodedName);

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.status}>Loading exercise...</p>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className={styles.container}>
        <p className={styles.status}>
          {error ?? `Exercise "${decodedName}" not found.`}
        </p>
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <WorkoutExerciseCard exercise={exercise} />
    </div>
  );
}