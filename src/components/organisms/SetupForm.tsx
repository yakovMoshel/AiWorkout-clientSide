import React from "react";
import StepQuestion from "../molecules/StepQuestion";
import TrainingDaysSelector from "../molecules/TrainingDaysSelector";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import TextAreaField from "../atoms/TextAreaField";
import StepButton from "../atoms/StepButton";
import styles from "../../styles/SetupPage.module.css";
import { SetupFormProps } from "../../domain/models/interfaces/ISetupFormProps";

const DIETARY_OPTIONS = ["None", "Vegetarian", "Vegan", "Gluten-free", "Dairy-free"];

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
    input: (formData: any, _onChange: any, onDaysChange: any) => (
      <TrainingDaysSelector
        selectedDays={formData.trainingDays}
        onToggle={onDaysChange}
      />
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
  // Nutrition steps
  {
    label: "Dietary Restrictions",
    input: (formData: any, _onChange: any, _onDaysChange: any, onRestrictionsChange: any) => (
      <div className={styles.daysContainer}>
        {DIETARY_OPTIONS.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onRestrictionsChange(option)}
            className={
              formData.dietaryRestrictions.includes(option)
                ? `${styles.dayButton} ${styles.selected}`
                : styles.dayButton
            }
          >
            {option}
          </button>
        ))}
      </div>
    ),
  },
  {
    label: "Target Weight (kg) — optional",
    input: (formData: any, onChange: any) => (
      <InputField
        type="number"
        name="targetWeight"
        placeholder="Target weight (optional)"
        value={formData.targetWeight}
        onChange={onChange}
      />
    ),
  },
  {
    label: "Daily Activity Level",
    input: (formData: any, onChange: any) => (
      <SelectField
        name="activityLevel"
        value={formData.activityLevel}
        onChange={onChange}
        options={[
          { value: "Sedentary", label: "Sedentary (little or no exercise)" },
          { value: "Light", label: "Light (1-3 days/week)" },
          { value: "Moderate", label: "Moderate (3-5 days/week)" },
          { value: "Active", label: "Active (6-7 days/week)" },
          { value: "Very Active", label: "Very Active (intense daily training)" },
        ]}
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
  onRestrictionsChange,
  onNext,
  onBack,
  onSubmit,
}: SetupFormProps) {
  const isNutritionSection = step >= 8;

  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>
        {isNutritionSection ? "Nutrition Setup" : "Setup Your Profile"}
      </h2>
      <p className={styles.stepIndicator}>
        Step {step + 1} of {questions.length}
        {isNutritionSection ? " — Nutrition" : " — Workout"}
      </p>
      <StepQuestion
        label={questions[step].label}
        input={questions[step].input(formData, onChange, onDaysChange, onRestrictionsChange)}
      />
      <div style={{ marginTop: 20 }}>
        {step > 0 && (
          <StepButton
            type="button"
            onClick={onBack}
            className={styles.skipButton}
            style={{ marginRight: 10 }}
          >
            Back
          </StepButton>
        )}
        {step < questions.length - 1 ? (
          <StepButton
            type="button"
            onClick={onNext}
            className={styles.submitButton}
          >
            Next
          </StepButton>
        ) : (
          <StepButton
            type="submit"
            className={styles.submitButton}
            disabled={pending}
          >
            {pending ? "Saving..." : "Save & Continue"}
          </StepButton>
        )}
      </div>
    </form>
  );
}
