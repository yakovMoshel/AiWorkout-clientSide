import { useEffect, useState, useCallback } from "react";
import api from "../utils/api";

export interface SetLog {
  weight: number;
  reps: number;
}

export function useExerciseLog(exerciseName: string) {
  const [previousSets, setPreviousSets] = useState<SetLog[]>([]);
  const [pr, setPr] = useState<number>(0);

  useEffect(() => {
    if (!exerciseName) return;
    api
      .get(`/exercise/log/${encodeURIComponent(exerciseName)}`, { withCredentials: true })
      .then((res) => {
        setPreviousSets(res.data.sets ?? []);
        setPr(res.data.pr ?? 0);
      })
      .catch(() => {});
  }, [exerciseName]);

  const saveLog = useCallback(
    async (sets: SetLog[]) => {
      try {
        const res = await api.post(
          "/exercise/log",
          { exerciseName, sets },
          { withCredentials: true }
        );
        setPr(res.data.pr ?? 0);
      } catch (err) {
        console.error("Failed to save exercise log", err);
      }
    },
    [exerciseName]
  );

  return { previousSets, pr, saveLog };
}
