import React from "react";
import styles from "../../styles/HomePage.module.css";
import { DayBoxProps } from "../../domain/models/interfaces/IDayBoxProps";



export default function DayBox({ day, completed }: DayBoxProps) {
  return (
    <div className={styles.dayBox}>
      <span>{day}</span>
      {completed && <span className={styles.completed}>✓</span>}
    </div>
  );
}