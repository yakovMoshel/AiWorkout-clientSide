import WorkoutCard from "../molecules/WorkoutCard";
import WorkoutPlanDisplay from "../organisms/WorkoutPlanDisplay";
import DailyNutritionCard from "../organisms/DailyNutritionCard";
import { useWorkoutPlan } from "../../hooks/useWorkoutPlan";
import { mapPlanForDisplay } from "../../utils/mapWorkoutPlan";

export default function HomeSections() {
  const { workouts, loading, error } = useWorkoutPlan();

  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const todayWorkout = workouts.find(
    (w) => w.day.toLowerCase() === today.toLowerCase(),
  );

  const mappedPlan = mapPlanForDisplay(workouts);

  if (loading) return <div>Loading workout plan...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <WorkoutCard
        exercises={todayWorkout?.exercises.map((e) => e.name) || []}
        dayNumber={
          todayWorkout ? workouts.indexOf(todayWorkout) + 1 : undefined
        }
      />
      <WorkoutPlanDisplay plan={mappedPlan} />
      <DailyNutritionCard />
    </>
  );
}
