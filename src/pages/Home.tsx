import styles from "../styles/HomePage.module.css";
import HomeSections from "../components/organisms/HomeSections";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Welcome back, athlete! 🏋️‍♂️</h2>
      <HomeSections />
    </div>
  );
}