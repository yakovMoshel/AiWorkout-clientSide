import React from "react";
import styles from "../../styles/HomePage.module.css";
import Button from "../atoms/Button";

export default function QuickAccessLinks() {
  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>Quick Access</h2>
      <div className={styles.links}>
        <Button className={styles.navButton}>Today Workout</Button>
      </div>
    </section>
  );
}