import styles from "../../styles/ExerciseDayCard.module.css";
import { ExerciseDayCardProps } from "../../domain/models/interfaces/IWorkoutPlanExercise";
import WorkoutExerciseCard from "./WorkoutExerciseCard";

export default function ExerciseDayCard({ day, exercises }: ExerciseDayCardProps) {
  return (
    <section className={styles.dayCard}>
      <div className={styles.header}>
        <div className={styles.accent} aria-hidden="true" />
        <h2 className={styles.dayName}>{day}</h2>
      </div>

      <div className={styles.exercises}>
        {exercises.map((exercise, index) => (
          <WorkoutExerciseCard key={`${exercise.name}-${index}`} exercise={exercise} />
        ))}
      </div>
    </section>
  );
}
