import { useEffect, useState } from "react";
import { useAuth } from "../store/auth-context";
import { getNutritionPlan } from "../services/nutritionService";

export function useNutritionPlan() {
  const [nutritionPlan, setNutritionPlan] = useState<any>(null);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState<Record<string, Record<string, any>> | null>(null);
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
        const data = await getNutritionPlan();
        setNutritionPlan(data.nutritionPlan ?? null);
        setWeeklyMealPlan(data.weeklyMealPlan ?? null);
      } catch (err) {
        console.error("Nutrition fetch error:", err);
        setError("Failed to fetch nutrition plan");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [isAuthenticated]);

  return { nutritionPlan, weeklyMealPlan, loading, error };
}
