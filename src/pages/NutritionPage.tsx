import { useNutritionPlan } from "../hooks/useNutritionPlan";
import styles from "../styles/NutritionPage.module.css";

export default function NutritionPage() {
  const { nutritionPlan, loading, error } = useNutritionPlan();

  if (loading) return <div className={styles.container}><p className={styles.empty}>Loading nutrition plan...</p></div>;
  if (error) return <div className={styles.container}><p className={styles.empty}>{error}</p></div>;

  const result = nutritionPlan?.result ?? nutritionPlan;

  if (!result) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Nutrition Plan</h2>
        <p className={styles.empty}>No nutrition plan yet. Complete the setup to generate one.</p>
      </div>
    );
  }

  const calories = result.daily_calories ?? result.calories;
  const macros = result.macros ?? {};
  const protein = macros.protein ?? result.protein;
  const carbs = macros.carbohydrates ?? macros.carbs ?? result.carbs;
  const fat = macros.fat ?? result.fat;
  const fiber = macros.fiber ?? result.fiber;

  const mealPlan: Record<string, any> = result.meal_plan ?? result.meals ?? {};
  const tips: string[] = result.tips ?? result.recommendations ?? result.nutritional_tips ?? [];

  const mealEntries = typeof mealPlan === "object" && !Array.isArray(mealPlan)
    ? Object.entries(mealPlan)
    : [];

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Nutrition Plan</h2>

      {/* Macros section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Daily Targets</h3>
        <div className={styles.macroGrid}>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{calories ?? "—"}</span>
            <span className={styles.macroLabel}>Calories</span>
          </div>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{protein ? `${protein}g` : "—"}</span>
            <span className={styles.macroLabel}>Protein</span>
          </div>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{carbs ? `${carbs}g` : "—"}</span>
            <span className={styles.macroLabel}>Carbohydrates</span>
          </div>
          <div className={styles.macroCard}>
            <span className={styles.macroValue}>{fat ? `${fat}g` : "—"}</span>
            <span className={styles.macroLabel}>Fat</span>
          </div>
          {fiber && (
            <div className={styles.macroCard}>
              <span className={styles.macroValue}>{fiber}g</span>
              <span className={styles.macroLabel}>Fiber</span>
            </div>
          )}
        </div>
      </div>

      {/* Meal plan section */}
      {mealEntries.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Meal Plan</h3>
          <div className={styles.mealList}>
            {mealEntries.map(([mealName, mealData]) => {
              const foods: string[] = Array.isArray(mealData)
                ? mealData
                : typeof mealData === "string"
                ? [mealData]
                : Array.isArray(mealData?.foods)
                ? mealData.foods
                : mealData?.description
                ? [mealData.description]
                : Object.values(mealData ?? {}).map(String);

              return (
                <div key={mealName} className={styles.meal}>
                  <p className={styles.mealName}>{mealName}</p>
                  <ul className={styles.mealItems}>
                    {foods.map((item, i) => (
                      <li key={i} className={styles.mealItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips / recommendations */}
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
