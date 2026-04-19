import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import SetupForm from "../components/organisms/SetupForm";
import { FormData } from "../domain/models/interfaces/IFormData";
import { requestWorkoutPlan } from "../services/workoutService";
import { requestNutritionPlan } from "../services/nutritionService";
import styles from "../styles/SetupPage.module.css";

const initialState: FormData = {
  gender: "",
  age: "",
  height: "",
  weight: "",
  goal: "",
  experience: "",
  trainingDays: [],
  healthNotes: "",
  dietaryRestrictions: [],
  targetWeight: "",
  activityLevel: "",
};

export default function SetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialState);
  const [loading, setLoading] = useState(false);

  // Holds the workout promise fired at step 7→8 transition
  const workoutPromiseRef = useRef<Promise<any> | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleDaysChange(day: string) {
    setFormData((prev) => ({
      ...prev,
      trainingDays: prev.trainingDays.includes(day)
        ? prev.trainingDays.filter((d: string) => d !== day)
        : [...prev.trainingDays, day],
    }));
  }

  function handleRestrictionsChange(restriction: string) {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter((r: string) => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  }

  function isValidStep() {
    switch (step) {
      case 0:
        return !!formData.gender;
      case 1:
        return !!formData.age && +formData.age > 10;
      case 2:
        return !!formData.height && +formData.height > 0;
      case 3:
        return !!formData.weight && +formData.weight > 0;
      case 4:
        return !!formData.goal;
      case 5:
        return !!formData.experience;
      case 6:
        return formData.trainingDays.length > 0;
      case 9:
        return true; // targetWeight is optional
      case 10:
        return !!formData.activityLevel;
      default:
        return true;
    }
  }

  function handleNext() {
    if (!isValidStep()) {
      alert("נא למלא את השדה");
      return;
    }

    // Fire workout request in background when transitioning from step 7 → 8
    if (step === 7) {
      workoutPromiseRef.current = requestWorkoutPlan({
        gender: formData.gender,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        goal: formData.goal,
        experience: formData.experience,
        trainingDays: formData.trainingDays,
        healthNotes: formData.healthNotes,
      });
    }

    setStep(step + 1);
  }

  function handleBack() {
    setStep(step - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await Promise.all([
        // Use already-running workout promise, or fire now as fallback
        workoutPromiseRef.current ??
          requestWorkoutPlan({
            gender: formData.gender,
            age: Number(formData.age),
            height: Number(formData.height),
            weight: Number(formData.weight),
            goal: formData.goal,
            experience: formData.experience,
            trainingDays: formData.trainingDays,
            healthNotes: formData.healthNotes,
          }),
        requestNutritionPlan({
          goal: formData.goal,
          weight: Number(formData.weight),
          targetWeight: formData.targetWeight ? Number(formData.targetWeight) : undefined,
          dietaryRestrictions: formData.dietaryRestrictions,
          activityLevel: formData.activityLevel || "Moderate",
        }),
      ]);
      navigate("/");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.setupLayout}>
      <div className={styles.formWrapper}>
        <SetupForm
          step={step}
          formData={formData}
          pending={loading}
          onChange={handleChange}
          onDaysChange={handleDaysChange}
          onRestrictionsChange={handleRestrictionsChange}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      </div>
      <div className={styles.sidePanel} aria-hidden="true" />
    </div>
  );
}
