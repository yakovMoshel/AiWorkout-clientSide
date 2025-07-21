import api from '../utils/api';

export async function requestWorkoutPlan(formData: any) {
  try {
    const response = await api.post("/setup/workout", formData, {
      withCredentials: true
    });

    if (response.status !== 200) {
      throw new Error("Failed to create workout plan");
    }

    return response.data;
  } catch (err) {
    throw new Error("Failed to create workout plan");
  }
}
