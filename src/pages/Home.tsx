import styles from "../styles/HomePage.module.css";
import HomeSections from "../components/organisms/HomeSections";
import { useAuth } from "../store/auth-context";
import CalendarReminderDialog from "src/components/organisms/CalendarReminderDialog";
import { useEffect, useState } from "react";

const POPUP_DELAY_MS = 2500;

export default function Home() {
  const { user, loading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const popupShownKey = `calendar_popup_shown_${user.id}`;
      const hasShownPopup = localStorage.getItem(popupShownKey);

      if (!hasShownPopup) {
        const timer = setTimeout(() => {
          setShowPopup(true);
          localStorage.setItem(popupShownKey, "true");
        }, POPUP_DELAY_MS);
        return () => clearTimeout(timer);
      }
    }
  }, [user, loading]);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Your AI-Powered Workout Companion</h1>
        <p className={styles.heroSub}>
          Welcome back, {user ? user.name : "athlete"}!
        </p>
      </div>

      <HomeSections />

      {user && (
        <CalendarReminderDialog
          open={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

