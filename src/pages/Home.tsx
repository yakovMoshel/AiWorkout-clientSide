import styles from "../styles/HomePage.module.css";
import HomeSections from "../components/organisms/HomeSections";
import { useAuth } from "../store/auth-context";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Welcome back, {user ? user.name : "athlete please sign in"}! 🏋️‍♂️
      </h2>
      <HomeSections />
    </div>
  );
}