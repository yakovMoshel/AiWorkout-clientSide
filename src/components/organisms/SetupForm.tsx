import React from "react";
import StepQuestion from "../molecules/StepQuestion";
import TrainingDaysSelector from "../molecules/TrainingDaysSelector";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import TextAreaField from "../atoms/TextAreaField";
import StepButton from "../atoms/StepButton";
import styles from "../../styles/SetupPage.module.css";
import { SetupFormProps } from "../../domain/models/interfaces/ISetupFormProps";



const questions = [
  {
    label: "Gender",
    input: (formData: any, onChange: any) => (
      <SelectField
        name="gender"
        value={formData.gender}
        onChange={onChange}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
      />
    ),
  },
  {
    label: "Age",
    input: (formData: any, onChange: any) => (
      <InputField
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={onChange}
      />
    ),
  },
  {
    label: "Height (cm)",
    input: (formData: any, onChange: any) => (
      <InputField
        type="number"
        name="height"
        placeholder="Height (cm)"
        value={formData.height}
        onChange={onChange}
      />
    ),
  },
  {
    label: "Weight (kg)",
    input: (formData: any, onChange: any) => (
      <InputField
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={onChange}
      />
    ),
  },
  {
    label: "Goal",
    input: (formData: any, onChange: any) => (
      <SelectField
        name="goal"
        value={formData.goal}
        onChange={onChange}
        options={[
          { value: "weight_loss", label: "Weight Loss" },
          { value: "muscle_gain", label: "Muscle Gain" },
          { value: "endurance", label: "Endurance" },
        ]}
      />
    ),
  },
  {
    label: "Experience Level",
    input: (formData: any, onChange: any) => (
      <SelectField
        name="experience"
        value={formData.experience}
        onChange={onChange}
        options={[
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ]}
      />
    ),
  },
  {
    label: "Training Days",
    input: (formData: any, onChange: any, onDaysChange: any) => (
      <TrainingDaysSelector selectedDays={formData.trainingDays} onToggle={onDaysChange} />
    ),
  },
  {
    label: "Health notes or limitations",
    input: (formData: any, onChange: any) => (
      <TextAreaField
        name="healthNotes"
        placeholder="Health notes or limitations"
        value={formData.healthNotes}
        onChange={onChange}
      />
    ),
  },
];

export default function SetupForm({
  step,
  formData,
  pending,
  onChange,
  onDaysChange,
  onNext,
  onBack,
  onSubmit,
}: SetupFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Setup Your Profile</h2>
      <StepQuestion
        label={questions[step].label}
        input={
          step === 6
            ? questions[step].input(formData, onChange, onDaysChange)
            : questions[step].input(formData, onChange, onDaysChange)
        }
      />
      <div style={{ marginTop: 20 }}>
        {step > 0 && (
          <StepButton type="button" onClick={onBack} className={styles.submitButton} style={{ marginRight: 10 }}>
            הקודם
          </StepButton>
        )}
        {step < questions.length - 1 ? (
          <StepButton type="button" onClick={onNext} className={styles.submitButton}>
            הבא
          </StepButton>
        ) : (
          <StepButton type="submit" className={styles.submitButton} disabled={pending}>
            {pending ? "Saving..." : "Save & Continue"}
          </StepButton>
        )}
      </div>
    </form>
  );
}