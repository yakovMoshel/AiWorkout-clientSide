import WeekTracker from "../molecules/WeekTracker";
import WorkoutCard from "../molecules/WorkoutCard";
import WorkoutPlanDisplay from "../organisms/WorkoutPlanDisplay";

// דוגמה ל-plan
const plan = {
  description: "This is your weekly workout plan. Good luck!",
  workouts: [
    { exercises: ["Push-ups", "Squats", "Plank"] },
    { exercises: ["Pull-ups", "Lunges", "Crunches"] },
    { exercises: ["Rest or light cardio"] },
    { exercises: ["Burpees", "Deadlifts", "Leg Raises"] },
    { exercises: ["Bench Press", "Rows", "Bicycle Crunches"] },
    { exercises: ["Cardio (running, cycling, etc.)"] },
    { exercises: ["Yoga or Stretching"] },
  ],
};

const todayIdx = 0; // אפשר לחשב לפי תאריך

export default function HomeSections() {
  return (
    <>
      <WorkoutCard
        exercises={plan.workouts[todayIdx]?.exercises || []}
        dayNumber={todayIdx + 1}
      />
      <WorkoutPlanDisplay plan={plan} />
      <WeekTracker />
    </>
  );
}