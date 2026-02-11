import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkoutPlan } from "src/hooks/useWorkoutPlan";
import api from "src/utils/api";

export default function CalendarSetupPage() {
  const { workouts } = useWorkoutPlan();
  const navigate = useNavigate();

  const [times, setTimes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const dayMap: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  function handleChange(day: string, value: string) {
    const shortDay = dayMap[day];
    setTimes(prev => ({ ...prev, [shortDay]: value }));
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      await api.post(
        "/google/create-workout-events",
        { trainingTimes: times },
        { withCredentials: true }
      );

      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 401) {
        window.location.href = "/google/connect";
        return;
      }

      alert("Failed to create calendar events");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Choose a time for each workout day</h2>

      {workouts.map(w => (
        <div key={w.day}>
          <label>{w.day}</label>
          <input
            type="time"
            value={times[dayMap[w.day]] || ""}
            onChange={(e) => handleChange(w.day, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleSubmit} disabled={loading}>
        Save and schedule in calendar
      </button>
    </div>
  );
}
