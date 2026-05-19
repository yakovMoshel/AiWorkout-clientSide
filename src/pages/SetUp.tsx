import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import SetupForm from "../components/organisms/SetupForm";
import { FormData } from "../domain/models/interfaces/IFormData";
import { requestWorkoutPlan } from "../services/workoutService";
import { requestNutritionPlan } from "../services/nutritionService";
import { subscribeUserToPush } from "../services/pushNotificationService";
import { useAuth } from "../store/auth-context";
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

const WORKOUT_LAST_STEP = 7;
const TOTAL_STEPS = 11;
const OPTIONAL_STEPS = [7, 9];

export default function SetupPage() {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [stepError, setStepError] = useState("");
  const [submitError, setSubmitError] = useState("");

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
        ? prev.dietaryRestrictions.filter((r: string) => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  }

  function getStepError(): string {
    const age = Number(formData.age);
    const height = Number(formData.height);
    const weight = Number(formData.weight);
    const targetWeight = Number(formData.targetWeight);

    switch (step) {
      case 0:
        if (!formData.gender) return "Please select a gender.";
        break;
      case 1:
        if (!formData.age) return "Please enter your age.";
        if (!Number.isInteger(age) || age < 10 || age > 120)
          return "Age must be a whole number between 10 and 120.";
        break;
      case 2:
        if (!formData.height) return "Please enter your height.";
        if (height < 50 || height > 300)
          return "Height must be between 50 and 300 cm.";
        break;
      case 3:
        if (!formData.weight) return "Please enter your weight.";
        if (weight < 20 || weight > 500)
          return "Weight must be between 20 and 500 kg.";
        break;
      case 4:
        if (!formData.goal) return "Please select a goal.";
        break;
      case 5:
        if (!formData.experience) return "Please select your experience level.";
        break;
      case 6:
        if (formData.trainingDays.length === 0)
          return "Please select at least one training day.";
        break;
      case 9:
        if (formData.targetWeight && (targetWeight < 20 || targetWeight > 500))
          return "Target weight must be between 20 and 500 kg.";
        break;
      case 10:
        if (!formData.activityLevel) return "Please select your activity level.";
        break;
    }
    return "";
  }

  function fireWorkoutRequest() {
    workoutPromiseRef.current = requestWorkoutPlan({
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
    });
  }

  function handleNext() {
    const error = getStepError();
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    if (step === WORKOUT_LAST_STEP) {
      fireWorkoutRequest();
    }
    setStep((s) => s + 1);
  }

  function handleSkip() {
    setStepError("");
    if (step === WORKOUT_LAST_STEP) {
      fireWorkoutRequest();
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
      await Promise.all([
        workoutPromiseRef.current ?? requestWorkoutPlan({
          ...formData,
          age: Number(formData.age),
          height: Number(formData.height),
          weight: Number(formData.weight),
        }),
        requestNutritionPlan({
          goal: formData.goal,
          weight: Number(formData.weight),
          targetWeight: formData.targetWeight ? Number(formData.targetWeight) : undefined,
          dietaryRestrictions: formData.dietaryRestrictions,
          activityLevel: formData.activityLevel || "Moderate",
        }),
      ]);
      await refetchUser();
      await subscribeUserToPush().catch(() => {});
      navigate("/");
    } catch (err: any) {
      const isRateLimit =
        (err?.message || '').toLowerCase().includes('rate limit') ||
        (err?.message || '').toLowerCase().includes('high demand');
      setSubmitError(
        isRateLimit
          ? "We're experiencing high demand. Please try again in a few minutes."
          : err.message || "Something went wrong. Please try again."
      );
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
      </div>
      <div className={styles.sidePanel} aria-hidden="true" />
    </div>
  );
}
