import api from "../utils/api";

export interface NutritionFormData {
  goal: string;
  weight: number;
  targetWeight?: number;
  dietaryRestrictions: string[];
  activityLevel: string;
}

export async function requestNutritionPlan(formData: NutritionFormData) {
  try {
    const response = await api.post("/setup/nutrition", formData, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Failed to create nutrition plan");
    }

    return response.data;
  } catch (err) {
    throw new Error("Failed to create nutrition plan");
  }
}

export async function fetchNutritionPlan() {
  const response = await api.get("/setup/nutrition", {
    withCredentials: true,
  });
  return response.data;
}
