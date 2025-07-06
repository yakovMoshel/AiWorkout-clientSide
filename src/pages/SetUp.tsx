import { useNavigate } from "react-router-dom";
import { useActionState, useState } from "react";
import SetupForm from "../components/organisms/SetupForm";

interface FormData {
  gender: string;
  age: string;
  height: string;
  weight: string;
  goal: string;
  experience: string;
  trainingDays: string[];
  healthNotes: string;
}

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

export default function SetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialState);

  const [, submitAction, pending] = useActionState(
    async (_: FormData, formData: FormData) => {
      return formData;
    },
    formData
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleDaysChange(day: string) {
    setFormData(prev => ({
      ...prev,
      trainingDays: prev.trainingDays.includes(day)
        ? prev.trainingDays.filter((d: string) => d !== day)
        : [...prev.trainingDays, day],
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
      default: return true;
    }
  }

  function handleNext() {
    if (!isValidStep()) {
      alert("נא למלא את השדה");
      return;
    }
    setStep(step + 1);
  }

  function handleBack() {
    setStep(step - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitAction(formData);
    navigate("/dashboard");
  }

  return (
    <SetupForm
      step={step}
      formData={formData}
      pending={pending}
      onChange={handleChange}
      onDaysChange={handleDaysChange}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}