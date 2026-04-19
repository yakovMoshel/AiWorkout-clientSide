import { useNavigate } from "react-router-dom";
import { useNutritionPlan } from "../../hooks/useNutritionPlan";
import styles from "../../styles/DailyNutritionCard.module.css";

export default function DailyNutritionCard() {
  const navigate = useNavigate();
  const { nutritionPlan, loading } = useNutritionPlan();

  if (loading) return null;

  if (!nutritionPlan) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.title}>Today's Nutrition Goals</span>
        </div>
        <p className={styles.empty}>No nutrition plan yet. Complete setup to get started.</p>
        <button className={styles.viewButton} onClick={() => navigate("/setup")}>
          Generate Plan
        </button>
      </div>
    );
  }

  const { calories_per_day, macronutrients } = nutritionPlan;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Today's Nutrition Goals</span>
        <span className={styles.calories}>{calories_per_day} kcal</span>
      </div>

      <div className={styles.macros}>
        <div className={styles.macroItem}>
          <span className={styles.macroLabel}>Protein</span>
          <span className={styles.macroValue}>{macronutrients?.proteins ?? "—"}</span>
        </div>
        <div className={styles.macroItem}>
          <span className={styles.macroLabel}>Carbs</span>
          <span className={styles.macroValue}>{macronutrients?.carbohydrates ?? "—"}</span>
        </div>
        <div className={styles.macroItem}>
          <span className={styles.macroLabel}>Fats</span>
          <span className={styles.macroValue}>{macronutrients?.fats ?? "—"}</span>
        </div>
      </div>

      <button className={styles.viewButton} onClick={() => navigate("/nutrition")}>
        View Full Plan
      </button>
    </div>
  );
}
