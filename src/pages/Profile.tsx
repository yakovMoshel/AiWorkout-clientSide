import { useEffect, useState } from "react";
import ProfileCard from "../components/organisms/ProfileCard";
import WorkoutPlanDisplay from "../components/organisms/WorkoutPlanDisplay";
import { useAuth } from "../store/auth-context";
import { useWorkoutPlan } from "../hooks/useWorkoutPlan";
import { mapPlanForDisplay } from "../utils/mapWorkoutPlan";
import styles from "../styles/ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import {
  subscribeUserToPush,
  isSubscribed,
} from "../services/pushNotificationService";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { workouts, loading } = useWorkoutPlan();
  const mappedPlan = mapPlanForDisplay(workouts);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    isSubscribed().then(setSubscribed);
  }, []);

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
      {!loading && <WorkoutPlanDisplay plan={mappedPlan} />}
    </div>
  );
}
