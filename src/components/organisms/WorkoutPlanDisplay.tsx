import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/WorkoutPlanDisplay.module.css";
import { WorkoutPlanDisplayProps } from "../../domain/models/interfaces/IWorkoutPlanDisplayProps";
import { WorkoutPlanExercise } from "../../domain/models/interfaces/IWorkoutPlanExercise";

export default function WorkoutPlanDisplay({ plan }: WorkoutPlanDisplayProps) {
  const [currentDay, setCurrentDay] = useState(0);

  if (!plan || !Array.isArray(plan.workouts) || plan.workouts.length === 0) {
    return (
      <div className={styles.container}>
        <p>No workout data found.</p>
      </div>
    );
  }

  const totalDays = plan.workouts.length;

  function goPrev() {
    setCurrentDay((prev) => (prev === 0 ? totalDays - 1 : prev - 1));
  }

  function goNext() {
    setCurrentDay((prev) => (prev === totalDays - 1 ? 0 : prev + 1));
  }

  const dayPlan = plan.workouts[currentDay];

  return (
    <div className={styles.container}>
      {plan.description && (
        <p className={styles.description}>{plan.description}</p>
      )}

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.navigationHeader}>
            <button onClick={goPrev} aria-label="Previous Day">
              &lt;
            </button>
            <h3 className={`${styles.dayTitle} ${styles.active}`}>
              Day {currentDay + 1}
            </h3>
            <button onClick={goNext} aria-label="Next Day">
              &gt;
            </button>
          </div>
          <ul className={styles.exerciseList}>
            {dayPlan.exercises.map((exercise: WorkoutPlanExercise, exIdx: number) => (
              <li key={exIdx} className={styles.exerciseItem}>
                <Link
                  to={`/exercise/${encodeURIComponent(exercise.name)}`}
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
                  <span className={styles.exerciseArrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.dayIndicators}>
        {Array.from({ length: totalDays }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentDay(idx)}
            className={
              idx === currentDay ? styles.indicatorActive : styles.indicator
            }
            aria-label={`Go to day ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
