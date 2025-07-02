// src/pages/SetupPage.tsx
import { useNavigate } from "react-router-dom";
import styles from "../styles/SetupPage.module.css";
import { useActionState, useState } from "react";

// Interface for form structure
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

  // Simulated form submission handler
  const [, submitAction, pending] = useActionState(
    async (_: FormData, formData: FormData) => {
      return formData; // mock save logic
    },
    formData
  );

  // Step-based questions and components
  const questions = [
    {
      label: "Gender",
      input: (
        <select name="gender" onChange={handleChange} className={styles.input} value={formData.gender}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      ),
    },
    {
      label: "Age",
      input: (
        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} className={styles.input} />
      ),
    },
    {
      label: "Height (cm)",
      input: (
        <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} value={formData.height} className={styles.input} />
      ),
    },
    {
      label: "Weight (kg)",
      input: (
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} value={formData.weight} className={styles.input} />
      ),
    },
    {
      label: "Goal",
      input: (
        <select name="goal" onChange={handleChange} className={styles.input} value={formData.goal}>
          <option value="">Select</option>
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="endurance">Endurance</option>
        </select>
      ),
    },
    {
      label: "Experience Level",
      input: (
        <select name="experience" onChange={handleChange} className={styles.input} value={formData.experience}>
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      ),
    },
    {
      label: "Training Days",
      input: (
        <div className={styles.daysContainer}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <button
              type="button"
              key={day}
              onClick={() => handleDaysChange(day)}
              className={formData.trainingDays.includes(day)
                ? `${styles.dayButton} ${styles.selected}`
                : styles.dayButton}
            >
              {day}
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "Health notes or limitations",
      input: (
        <textarea name="healthNotes" placeholder="Health notes or limitations" onChange={handleChange} value={formData.healthNotes} className={styles.textarea} />
      ),
    },
  ];

  // Handle input changes for standard fields
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Toggle day selection
  function handleDaysChange(day: string) {
    setFormData(prev => ({
      ...prev,
      trainingDays: prev.trainingDays.includes(day)
        ? prev.trainingDays.filter(d => d !== day)
        : [...prev.trainingDays, day],
    }));
  }

  // Per-step validation logic
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

  // Handle next step
  function handleNext() {
    if (!isValidStep()) {
      alert("נא למלא את השדה");
      return;
    }
    setStep(step + 1);
  }

  // Handle previous step
  function handleBack() {
    setStep(step - 1);
  }

  // Final submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitAction(formData);
    console.log("Submitted", formData);
    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Setup Your Profile</h2>
      <label>{questions[step].label}</label>
      {questions[step].input}
      <div style={{ marginTop: 20 }}>
        {step > 0 && (
          <button type="button" onClick={handleBack} className={styles.submitButton} style={{ marginRight: 10 }}>
            הקודם
          </button>
        )}
        {step < questions.length - 1 ? (
          <button type="button" onClick={handleNext} className={styles.submitButton}>
            הבא
          </button>
        ) : (
          <button type="submit" className={styles.submitButton} disabled={pending}>
            {pending ? "Saving..." : "Save & Continue"}
          </button>
        )}
      </div>
    </form>
  );
}
