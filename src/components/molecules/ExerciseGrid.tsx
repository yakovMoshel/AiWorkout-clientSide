import { Link } from "react-router-dom";
import styles from "../../styles/WorkoutPlanDisplay.module.css";
import { ExerciseGridProps } from "../../domain/models/interfaces/IExerciseGridProps";

export default function ExerciseGrid({ exercises }: ExerciseGridProps) {
  return (
    <ul className={styles.exerciseList}>
      {exercises.map((exercise, idx) => (
        <li key={idx} className={`${styles.exerciseItem} animate-enter`}>
          <Link
            to={`/exercise/${encodeURIComponent(exercise.name)}`}
            state={{ exercise }}
            className={styles.exerciseLink}
          >
            <div className={styles.exerciseImage}>
              {exercise.image ? (
                <img src={exercise.image} alt={exercise.name} loading="lazy" />
              ) : (
                <div className={styles.exerciseImagePlaceholder} />
              )}
            </div>
            <div className={styles.exerciseInfo}>
              <span className={styles.exerciseName}>{exercise.name}</span>
              {exercise.sets && (
                <span className={styles.exerciseSets}>{exercise.sets} sets</span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
