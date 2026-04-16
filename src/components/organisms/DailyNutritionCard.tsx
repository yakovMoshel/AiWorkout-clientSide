import { useNavigate } from "react-router-dom";
import { useNutritionPlan } from "../../hooks/useNutritionPlan";
import styles from "../../styles/DailyNutritionCard.module.css";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function DailyNutritionCard() {
  const { nutritionPlan, weeklyMealPlan, loading } = useNutritionPlan();
  const navigate = useNavigate();

  if (loading) return null;

  const result = nutritionPlan?.result ?? nutritionPlan;

  const calories = result?.calories_per_day ?? result?.daily_calories ?? result?.calories ?? null;
  const macros = result?.macronutrients ?? result?.macros ?? {};
  const protein = macros.proteins ?? macros.protein ?? null;
  const carbs = macros.carbohydrates ?? macros.carbs ?? null;
  const fat = macros.fats ?? macros.fat ?? null;

  const todayName = DAY_NAMES[new Date().getDay()];
  const todayMeals = weeklyMealPlan?.[todayName] ?? null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Today's Nutrition Goals</span>
      </div>

      {!result ? (
        <p className={styles.empty}>No nutrition plan yet. Complete setup to generate one.</p>
      ) : (
        <>
          <div className={styles.macros}>
            <div className={styles.macroItem}>
              <span className={styles.macroValue}>{calories ?? "—"}</span>
              <span className={styles.macroLabel}>Calories</span>
            </div>
            <div className={styles.macroItem}>
              <span className={styles.macroValue}>{protein ?? "—"}</span>
              <span className={styles.macroLabel}>Protein</span>
            </div>
            <div className={styles.macroItem}>
              <span className={styles.macroValue}>{carbs ?? "—"}</span>
              <span className={styles.macroLabel}>Carbs</span>
            </div>
            <div className={styles.macroItem}>
              <span className={styles.macroValue}>{fat ?? "—"}</span>
              <span className={styles.macroLabel}>Fat</span>
            </div>
          </div>

          {todayMeals && (
            <>
              <div className={styles.divider} />
              <p className={styles.mealsTitle}>{todayName}'s Meals</p>
              {Object.entries(todayMeals).map(([mealName, dish]: [string, any]) => (
                <div key={mealName} className={styles.mealRow}>
                  <span className={styles.mealName}>{mealName}</span>
                  <span className={styles.dishName}>{dish?.name ?? "—"}</span>
                  <span className={styles.mealCalories}>{dish?.calories ? `${dish.calories} kcal` : ""}</span>
                </div>
              ))}
            </>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button className={styles.viewButton} onClick={() => navigate("/nutrition")}>
              View Full Nutrition Plan
            </button>
          </div>
        </>
      )}
    </div>
  );
}
