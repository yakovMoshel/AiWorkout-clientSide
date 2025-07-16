import { useEffect, useState } from "react";
import { Exercise } from "../domain/models/interfaces/IExercise";
import api from "../utils/api";

export interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

export function useWorkoutPlan() {
  const [workouts, setWorkouts] = useState<WorkoutDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/setup/workout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedWorkouts = res.data.workoutPlan?.result?.exercises;

        if (!fetchedWorkouts || !Array.isArray(fetchedWorkouts)) {
          setError("No valid workout plan available.");
          setWorkouts([]);
        } else {
          setWorkouts(fetchedWorkouts);
        }
      } catch (err) {
        console.error("Workout fetch error:", err);
        setError("Failed to fetch workout plan");
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);


  return { workouts, loading, error };
}