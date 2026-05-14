import { useEffect, useState } from "react";
import ProfileCard from "../components/organisms/ProfileCard";
import WorkoutPlanDisplay from "../components/organisms/WorkoutPlanDisplay";
import CalendarReminderDialog from "../components/organisms/CalendarReminderDialog";
import { useAuth } from "../store/auth-context";
import { useWorkoutPlan } from "../hooks/useWorkoutPlan";
import { mapPlanForDisplay } from "../utils/mapWorkoutPlan";
import styles from "../styles/ProfilePage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  subscribeUserToPush,
  isSubscribed,
} from "../services/pushNotificationService";
import googleCalendarIcon from "../assets/google-calendar.png";


export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { workouts, loading } = useWorkoutPlan();
  const mappedPlan = mapPlanForDisplay(workouts);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);

  useEffect(() => {
    isSubscribed().then(setSubscribed);
  }, []);

  useEffect(() => {
    if (searchParams.get("google") === "connected") {
      navigate("/calendar-setup", { replace: true });
    }
  }, [searchParams, navigate]);

  async function handleEnableReminders() {
    setSubscribing(true);
    try {
      await subscribeUserToPush();
      setSubscribed(await isSubscribed());
    } finally {
      setSubscribing(false);
    }
  }

  if (!user) {
    return <div className={styles.container}>User not found</div>;
  }

  return (
    <div className={`${styles.container} animate-enter`}>
      <ProfileCard user={user} />
      <button onClick={() => navigate("/profile/Edit")}>Edit Profile</button>
      <button
        onClick={handleEnableReminders}
        disabled={subscribed || subscribing}
      >
        {subscribed ? "Reminders ON" : subscribing ? "Enabling…" : "Enable Workout Reminders"}
      </button>
      {!user.googleConnected && (
        <button
          onClick={() => setCalendarDialogOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <img src={googleCalendarIcon} alt="Google Calendar" width={20} height={20} />
          Add Google Calendar Reminder
        </button>
      )}
      <CalendarReminderDialog
        open={calendarDialogOpen}
        onClose={() => setCalendarDialogOpen(false)}
      />
      {!loading && <WorkoutPlanDisplay plan={mappedPlan} />}
    </div>
  );
}
