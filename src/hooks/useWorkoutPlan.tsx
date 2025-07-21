import { useEffect, useState } from "react";
import { Exercise } from "../domain/models/interfaces/IExercise";
import api from "../utils/api";
import { useAuth } from "../store/auth-context";

export interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

export function useWorkoutPlan() {
  const [workouts, setWorkouts] = useState<WorkoutDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const { isAuthenticated } = useAuth();


  useEffect(() => {
    if (!isAuthenticated) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchPlan = async () => {
      try {
        const res = await api.get("/setup/workout", {
          withCredentials: true,
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
  }, [isAuthenticated]);

  return { workouts, loading, error };
}