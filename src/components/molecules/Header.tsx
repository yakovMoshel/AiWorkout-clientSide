import MainNavigations from "../../navigation/MainNavigations";
import styles from "../../styles/header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img
          src="/ChatGPT Image Jan 15, 2026, 03_19_41 PM.png"
          alt="Ai Workout Logo"
          className={styles.logo}
        />
      </Link>
      <MainNavigations />
    </header>
  );
}
