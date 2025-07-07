import React from "react";
import styles from "../../styles/HomePage.module.css";

interface WorkoutCardProps {
  exercises: string[];
  dayNumber?: number;
}

export default function WorkoutCard({ exercises, dayNumber }: WorkoutCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>
        {dayNumber ? `Today's Workout (Day ${dayNumber})` : "Today's Workout"}
      </h2>
      {exercises && exercises.length > 0 ? (
        <ul>
          {exercises.map((ex, idx) => (
            <li key={idx}>{ex}</li>
          ))}
        </ul>
      ) : (
        <p>No exercises for today.</p>
      )}
    </section>
  );
}