import { useState } from "react";
import { useNutritionPlan } from "../hooks/useNutritionPlan";
import styles from "../styles/NutritionPage.module.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TODAY = DAYS[(new Date().getDay() + 6) % 7]; // Sun=0 → index 6 (Sun), Mon=1 → index 0 (Mon)

export default function NutritionPage() {
  const { nutritionPlan, weeklyMealPlan, loading, error } = useNutritionPlan();
  const [selectedDay, setSelectedDay] = useState(TODAY);

  if (loading) return <div className={styles.container}><p className={styles.empty}>Loading nutrition plan...</p></div>;
  if (error) return <div className={styles.container}><p className={styles.empty}>{error}</p></div>;

  // GPT returns flat structure; legacy RapidAPI wrapped in .result
  const result = nutritionPlan?.result ?? nutritionPlan;

  if (!result) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Nutrition Plan</h2>
        <p className={styles.empty}>No nutrition plan yet. Complete the setup to generate one.</p>
      </div>
    );
  }

  const calories = result.calories_per_day ?? result.daily_calories ?? result.calories;
  const macros = result.macronutrients ?? result.macros ?? {};
  const protein = macros.proteins ?? macros.protein;
  const carbs = macros.carbohydrates ?? macros.carbs;
  const fat = macros.fats ?? macros.fat;
  const fiber = macros.fiber;

  const tips: string[] = result.tips ?? result.recommendations ?? result.nutritional_tips ?? [];

  const dayIndex = DAYS.indexOf(selectedDay);
  const prevDay = () => setSelectedDay(DAYS[(dayIndex - 1 + 7) % 7]);
  const nextDay = () => setSelectedDay(DAYS[(dayIndex + 1) % 7]);

  const todayMeals = weeklyMealPlan?.[selectedDay] ?? null;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Nutrition Plan</h2>

      {/* Daily Targets */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Daily Targets</h3>
        <div className={styles.macroGrid}>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{calories ?? "—"}</span>
            <span className={styles.macroLabel}>Calories</span>
          </div>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{protein ?? "—"}</span>
            <span className={styles.macroLabel}>Protein</span>
          </div>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{carbs ?? "—"}</span>
            <span className={styles.macroLabel}>Carbohydrates</span>
          </div>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{fat ?? "—"}</span>
            <span className={styles.macroLabel}>Fat</span>
          </div>
          {fiber && (
            <div className={styles.macroCard}>
              <span className={styles.macroValue}>{fiber}</span>
              <span className={styles.macroLabel}>Fiber</span>
            </div>
          )}
        </div>
      </div>

      {/* Weekly Meal Plan */}
      {weeklyMealPlan && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Meal Plan</h3>

          {/* Day selector */}
          <div className={styles.daySelector}>
            <button className={styles.dayArrow} onClick={prevDay} aria-label="Previous day">‹</button>
            <div className={styles.dayTabs}>
              {DAYS.map((day) => (
                <button
                  key={day}
                  className={`${styles.dayTab} ${day === selectedDay ? styles.dayTabActive : ""}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
            <button className={styles.dayArrow} onClick={nextDay} aria-label="Next day">›</button>
          </div>

          {/* Meals for selected day */}
          {todayMeals ? (
            <div className={styles.mealList}>
              {Object.entries(todayMeals).map(([mealName, dish]) => {
                const ingredients: string[] = Array.isArray(dish?.ingredients)
                  ? dish.ingredients
                  : [];
                const hasMacros =
                  dish?.protein_g != null ||
                  dish?.carbs_g != null ||
                  dish?.fat_g != null ||
                  dish?.fiber_g != null;

                return (
                  <div key={mealName} className={styles.mealCard}>
                    <div className={styles.mealHeader}>
                      <span className={styles.mealTitle}>{mealName}</span>
                      {dish?.calories && (
                        <span className={styles.mealCalories}>{dish.calories} kcal</span>
                      )}
                    </div>

                    <p className={styles.dishTitle}>{dish?.name ?? "—"}</p>

                    {hasMacros && (
                      <div className={styles.mealMacroRow}>
                        {dish.protein_g != null && (
                          <span className={styles.mealMacroChip}>Protein {dish.protein_g}g</span>
                        )}
                        {dish.carbs_g != null && (
                          <span className={styles.mealMacroChip}>Carbs {dish.carbs_g}g</span>
                        )}
                        {dish.fat_g != null && (
                          <span className={styles.mealMacroChip}>Fat {dish.fat_g}g</span>
                        )}
                        {dish.fiber_g != null && (
                          <span className={styles.mealMacroChip}>Fiber {dish.fiber_g}g</span>
                        )}
                      </div>
                    )}

                    {ingredients.length > 0 && (
                      <ul className={styles.ingredientsList}>
                        {ingredients.map((ing, i) => (
                          <li key={i} className={styles.ingredient}>{ing}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.empty}>No meal data for {selectedDay}.</p>
          )}
        </div>
      )}

      {/* Recommendations */}
      {tips.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Recommendations</h3>
          <ul className={styles.tipsList}>
            {tips.map((tip, i) => (
              <li key={i} className={styles.tip}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
