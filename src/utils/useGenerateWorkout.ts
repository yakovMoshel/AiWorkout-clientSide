// src/api/useGenerateWorkout.ts

interface WorkoutFormData {
  gender: string;
  age: string;
  height: string;
  weight: string;
  goal: string;
  experience: string;
  trainingDays: string[];
  healthNotes: string;
}

export async function generateWorkoutPlan(formData: WorkoutFormData) {
  const url = 'https://ai-workout-planner.p.rapidapi.com/ai-workout';

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '', // שמור במשתנה סביבה לצורכי אבטחה זמניים
      'X-RapidAPI-Host': 'ai-workout-planner.p.rapidapi.com',
    },
    body: JSON.stringify({
      gender: formData.gender,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      goal: formData.goal,
      experience: formData.experience,
      training_days: formData.trainingDays.length,
      notes: formData.healthNotes,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("API response failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Workout generation error:", error);
    return null;
  }
}
