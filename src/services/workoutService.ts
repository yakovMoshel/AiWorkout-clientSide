import api from "../utils/api";

export async function requestWorkoutPlan(formData: any) {
  const response = await api.post("/setup/workout", formData, {
    withCredentials: true,
  });
  return response.data;
}
