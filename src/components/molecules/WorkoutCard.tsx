import React from "react";
import styles from "../../styles/HomePage.module.css";

export default function WorkoutCard() {
  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>Today's Workout</h2>
      <p>🏋️ Bench Press: 4 sets x 10 reps</p>
      <p>🔥 Incline Dumbbell Press: 3 sets x 12 reps</p>
      <p>💪 Push-ups: 3 sets to failure</p>
    </section>
  );
}