import { useEffect, useState } from "react";
import { fetchNutritionPlan } from "../services/nutritionService";
import { useAuth } from "../store/auth-context";

export interface MealItem {
  name: string;
  ingredients?: string[];
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
}

export interface NutritionPlan {
  calories_per_day: number;
  macronutrients: {
    carbohydrates: string;
    proteins: string;
    fats: string;
  };
  meal_suggestions: {
    meal: string;
    suggestions: MealItem[];
  }[];
  tips?: string[];
}

export type WeeklyMealPlan = Record<string, Record<string, MealItem>>;

export function useNutritionPlan() {
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState<WeeklyMealPlan | null>(null);
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
        const data = await fetchNutritionPlan();
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
