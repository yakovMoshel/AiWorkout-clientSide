import styles from "../styles/HomePage.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome back, athlete! 🏋️‍♂️</h1>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Today's Workout</h2>
        <p>🏋️ Bench Press: 4 sets x 10 reps</p>
        <p>🔥 Incline Dumbbell Press: 3 sets x 12 reps</p>
        <p>💪 Push-ups: 3 sets to failure</p>
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Quick Access</h2>
        <div className={styles.links}>
          <button className={styles.navButton}>Today Workout</button>    
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Weekly Progress</h2>
        <div className={styles.weekTracker}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className={styles.dayBox}>
              <span>{day}</span>
              <span className={styles.completed}>✓</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
  
}
