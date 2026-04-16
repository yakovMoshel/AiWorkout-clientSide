import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import SetupForm from "../components/organisms/SetupForm";
import { FormData } from "../domain/models/interfaces/IFormData";
import { requestWorkoutPlan } from "../services/workoutService";
import { requestNutritionPlan } from "../services/nutritionService";
import { useAuth } from "src/store/auth-context";

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

const WORKOUT_LAST_STEP = 7;
const OPTIONAL_STEPS = [7, 9];

export default function SetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [stepError, setStepError] = useState("");
  const [submitError, setSubmitError] = useState("");

    const { refetchUser } = useAuth();
  const workoutPromiseRef = useRef<Promise<any> | null>(null);


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStepError("");
  }

  function handleDaysChange(day: string) {
    setFormData((prev) => ({
      ...prev,
      trainingDays: prev.trainingDays.includes(day)
        ? prev.trainingDays.filter((d: string) => d !== day)
        : [...prev.trainingDays, day],
    }));
    setStepError("");
  }

  function handleRestrictionsChange(restriction: string) {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter((r) => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  }

  function isValidStep() {
    switch (step) {
      case 0: return !!formData.gender;
      case 1: return !!formData.age && +formData.age > 10;
      case 2: return !!formData.height && +formData.height > 0;
      case 3: return !!formData.weight && +formData.weight > 0;
      case 4: return !!formData.goal;
      case 5: return !!formData.experience;
      case 6: return formData.trainingDays.length > 0;
      case 10: return !!formData.activityLevel;
      default: return true;
    }
  }

  function handleNext() {
    if (!isValidStep()) {
      setStepError("Please fill out this field before continuing.");
      return;
    }
    setStepError("");

    if (step === WORKOUT_LAST_STEP) {
      workoutPromiseRef.current = requestWorkoutPlan({
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
      });
    }

    setStep((s) => s + 1);
  }

const TOTAL_STEPS = 11;

function handleSkip() {
  setStepError("");
  if (step === WORKOUT_LAST_STEP) {
    workoutPromiseRef.current = requestWorkoutPlan({
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
    });
  }
  if (step === TOTAL_STEPS - 1) {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    return;
  }
  setStep((s) => s + 1);
}

  function handleBack() {
    setStepError("");
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setLoading(true);
    try {
      const nutritionPromise = requestNutritionPlan({
        goal: formData.goal,
        weight: Number(formData.weight),
        targetWeight: formData.targetWeight ? Number(formData.targetWeight) : undefined,
        dietaryRestrictions: formData.dietaryRestrictions,
        activityLevel: formData.activityLevel || "Moderate",
      });

      await Promise.all([
        workoutPromiseRef.current ?? Promise.resolve(),
        nutritionPromise,
      ]);

      await refetchUser();
      navigate("/");
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SetupForm
      step={step}
      formData={formData}
      pending={loading}
      stepError={stepError}
      submitError={submitError}
      isOptionalStep={OPTIONAL_STEPS.includes(step)}
      onChange={handleChange}
      onDaysChange={handleDaysChange}
      onRestrictionsChange={handleRestrictionsChange}
      onNext={handleNext}
      onSkip={handleSkip}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}