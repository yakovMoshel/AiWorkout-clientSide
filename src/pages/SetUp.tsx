import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SetupForm from "../components/organisms/SetupForm";
import { FormData } from "../domain/models/interfaces/IFormData";
import { requestWorkoutPlan } from "../services/workoutService";
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
};

const OPTIONAL_STEPS = [7];

export default function SetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [stepError, setStepError] = useState("");
  const [submitError, setSubmitError] = useState("");

    const { refetchUser } = useAuth();


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

  function isValidStep() {
    switch (step) {
      case 0: return !!formData.gender;
      case 1: return !!formData.age && +formData.age > 10;
      case 2: return !!formData.height && +formData.height > 0;
      case 3: return !!formData.weight && +formData.weight > 0;
      case 4: return !!formData.goal;
      case 5: return !!formData.experience;
      case 6: return formData.trainingDays.length > 0;
      default: return true;
    }
  }

  function handleNext() {
    if (!isValidStep()) {
      setStepError("Please fill out this field before continuing.");
      return;
    }
    setStepError("");
    setStep((s) => s + 1);
  }

  function handleSkip() {
    setStepError("");
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
      await requestWorkoutPlan({
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
      });
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
      onNext={handleNext}
      onSkip={handleSkip}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}