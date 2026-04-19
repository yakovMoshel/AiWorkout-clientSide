import { useState } from "react";
import { useNutritionPlan } from "../hooks/useNutritionPlan";
import styles from "../styles/NutritionPage.module.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getTodayName(): string {
  return new Date().toLocaleString("en-US", { weekday: "long" });
}

export default function NutritionPage() {
  const { nutritionPlan, weeklyMealPlan, loading, error } = useNutritionPlan();
  const [selectedDay, setSelectedDay] = useState<string>(getTodayName());

  if (loading) {
    return (
      <div className={`${styles.page} animate-enter`}>
        <p className={styles.emptyState}>Loading nutrition plan...</p>
      </div>
    );
  }

  if (error || !nutritionPlan) {
    return (
      <div className={`${styles.page} animate-enter`}>
        <p className={styles.emptyState}>No nutrition plan yet. Complete setup to generate one.</p>
      </div>
    );
  }

  const { calories_per_day, macronutrients, tips } = nutritionPlan;
  const dayMeals = weeklyMealPlan?.[selectedDay] ?? {};
  const mealNames = Object.keys(dayMeals);

  return (
    <div className={`${styles.page} animate-enter`}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Nutrition Plan</h1>
        <p className={styles.subtitle}>Your personalized weekly meal guide</p>
      </div>

      {/* Daily macros summary */}
      <div className={styles.macrosCard}>
        <div className={styles.caloriesBlock}>
          <span className={styles.caloriesNumber}>{calories_per_day}</span>
          <span className={styles.caloriesLabel}>kcal / day</span>
        </div>
        <div className={styles.macrosList}>
          <div className={styles.macroChip}>
            <span className={styles.macroChipLabel}>Protein</span>
            <span className={styles.macroChipValue}>{macronutrients?.proteins ?? "—"}</span>
          </div>
          <div className={styles.macroChip}>
            <span className={styles.macroChipLabel}>Carbs</span>
            <span className={styles.macroChipValue}>{macronutrients?.carbohydrates ?? "—"}</span>
          </div>
          <div className={styles.macroChip}>
            <span className={styles.macroChipLabel}>Fats</span>
            <span className={styles.macroChipValue}>{macronutrients?.fats ?? "—"}</span>
          </div>
        </div>
      </div>

      {/* Day selector */}
      <div className={styles.dayTabs}>
        {DAYS.map((day, i) => (
          <button
            key={day}
            className={`${styles.dayTab} ${selectedDay === day ? styles.dayTabActive : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            {DAY_SHORT[i]}
          </button>
        ))}
      </div>

      {/* Meals grid */}
      {mealNames.length === 0 ? (
        <p className={styles.emptyState}>No meals for {selectedDay}.</p>
      ) : (
        <div className={styles.mealsGrid}>
          {mealNames.map((mealName) => {
            const meal = dayMeals[mealName];
            return (
              <div key={mealName} className={styles.mealCard}>
                <span className={styles.mealName}>{mealName}</span>
                <span className={styles.mealFood}>{meal.name}</span>
                <span className={styles.mealCalories}>{meal.calories} kcal</span>
                <div className={styles.mealMacros}>
                  <span className={styles.mealMacroTag}>P: {meal.protein_g}g</span>
                  <span className={styles.mealMacroTag}>C: {meal.carbs_g}g</span>
                  <span className={styles.mealMacroTag}>F: {meal.fat_g}g</span>
                  {meal.fiber_g != null && (
                    <span className={styles.mealMacroTag}>Fiber: {meal.fiber_g}g</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips */}
      {tips && tips.length > 0 && (
        <div className={styles.tipsSection}>
          <h3 className={styles.tipsTitle}>Nutrition Tips</h3>
          <ul className={styles.tipsList}>
            {tips.map((tip, i) => (
              <li key={i} className={styles.tipItem}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
