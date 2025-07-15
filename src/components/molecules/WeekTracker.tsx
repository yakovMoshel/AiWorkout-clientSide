import React from "react";
import styles from "../../styles/HomePage.module.css";
import DayBox from "../atoms/DayBox";

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeekTracker() {
  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>Weekly Progress</h2>
      <div className={styles.weekTracker}>
        {days.map(day => (
          <DayBox key={day} day={day} completed />
        ))}
      </div>
    </section>
  );
}