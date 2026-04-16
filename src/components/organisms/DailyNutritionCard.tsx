import { useNavigate } from "react-router-dom";
import { useNutritionPlan } from "../../hooks/useNutritionPlan";
import styles from "../../styles/DailyNutritionCard.module.css";

export default function DailyNutritionCard() {
  const { nutritionPlan, loading } = useNutritionPlan();
  const navigate = useNavigate();

  if (loading) return null;

  const result = nutritionPlan?.result ?? nutritionPlan;

  const calories = result?.daily_calories ?? result?.calories ?? null;
  const protein = result?.macros?.protein ?? result?.protein ?? null;
  const carbs = result?.macros?.carbohydrates ?? result?.macros?.carbs ?? result?.carbs ?? null;
  const fat = result?.macros?.fat ?? result?.fat ?? null;

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
              <span className={styles.macroValue}>{protein ? `${protein}g` : "—"}</span>
              <span className={styles.macroLabel}>Protein</span>
            </div>
            <div className={styles.macroItem}>
              <span className={styles.macroValue}>{carbs ? `${carbs}g` : "—"}</span>
              <span className={styles.macroLabel}>Carbs</span>
            </div>
            <div className={styles.macroItem}>
              <span className={styles.macroValue}>{fat ? `${fat}g` : "—"}</span>
              <span className={styles.macroLabel}>Fat</span>
            </div>
          </div>

          <button className={styles.viewButton} onClick={() => navigate("/nutrition")}>
            View Full Nutrition Plan
          </button>
        </>
      )}
    </div>
  );
}
