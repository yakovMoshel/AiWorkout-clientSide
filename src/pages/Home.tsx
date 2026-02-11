import styles from "../styles/HomePage.module.css";
import HomeSections from "../components/organisms/HomeSections";
import { useAuth } from "../store/auth-context";
import CalendarReminderDialog from "src/components/organisms/CalendarReminderDialog";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Welcome back, {user ? user.name : "athlete please sign in"}! 🏋️‍♂️
      </h2>

      <HomeSections />

      <CalendarReminderDialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
