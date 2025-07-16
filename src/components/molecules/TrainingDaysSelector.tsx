import React from "react";
import styles from "../../styles/SetupPage.module.css";
import { TrainingDaysSelectorProps } from "../../domain/models/interfaces/ITrainingDaysSelectorProps";



const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TrainingDaysSelector({ selectedDays, onToggle }: TrainingDaysSelectorProps) {
  return (
    <div className={styles.daysContainer}>
      {days.map(day => (
        <button
          type="button"
          key={day}
          onClick={() => onToggle(day)}
          className={
            selectedDays.includes(day)
              ? `${styles.dayButton} ${styles.selected}`
              : styles.dayButton
          }
        >
          {day}
        </button>
      ))}
    </div>
  );
}