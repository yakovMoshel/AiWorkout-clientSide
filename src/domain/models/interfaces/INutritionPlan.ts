export interface NutritionMacros {
  proteins?: number | string;
  protein?: number | string;
  carbohydrates?: number | string;
  carbs?: number | string;
  fats?: number | string;
  fat?: number | string;
  fiber?: number | string;
}

export interface NutritionPlan {
  result?: NutritionPlan;
  calories_per_day?: number | string;
  daily_calories?: number | string;
  calories?: number | string;
  macronutrients?: NutritionMacros;
  macros?: NutritionMacros;
  tips?: string[];
  recommendations?: string[];
  nutritional_tips?: string[];
}
