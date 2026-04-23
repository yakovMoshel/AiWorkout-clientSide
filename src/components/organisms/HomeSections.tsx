import ExerciseGrid from "../molecules/ExerciseGrid";
import DailyNutritionCard from "../organisms/DailyNutritionCard";
import { useWorkoutPlan } from "../../hooks/useWorkoutPlan";
import { mapPlanForDisplay } from "../../utils/mapWorkoutPlan";
import styles from "../../styles/WorkoutPlanDisplay.module.css";

export default function HomeSections() {
  const { workouts, loading, error } = useWorkoutPlan();

  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const todayIdx = workouts.findIndex(
    (w) => w.day.toLowerCase() === today.toLowerCase(),
  );

  const mappedPlan = mapPlanForDisplay(workouts);
  const todayExercises =
    todayIdx >= 0 ? mappedPlan.workouts[todayIdx].exercises : [];

  if (loading) return <div>Loading workout plan...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.navigationHeader}>
            <h3 className={`${styles.dayTitle} ${styles.active}`}>
              {todayIdx >= 0 ? `Day ${todayIdx + 1} — ${today}` : "No workout today"}
            </h3>
          </div>
          <ExerciseGrid exercises={todayExercises} />
        </div>
      </div>
      <DailyNutritionCard />
    </>
  );
}
