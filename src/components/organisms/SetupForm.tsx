import React from "react";
import StepQuestion from "../molecules/StepQuestion";
import TrainingDaysSelector from "../molecules/TrainingDaysSelector";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import TextAreaField from "../atoms/TextAreaField";
import StepButton from "../atoms/StepButton";
import styles from "../../styles/SetupPage.module.css";
import { SetupFormProps } from "../../domain/models/interfaces/ISetupFormProps";

const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Nut-free"];

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
  {
    label: "Dietary Restrictions",
    input: (formData: any, _onChange: any, _onDaysChange: any, onRestrictionsChange: any) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {DIETARY_OPTIONS.map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={formData.dietaryRestrictions?.includes(option) || false}
              onChange={() => onRestrictionsChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    ),
  },
  {
    label: "Target Weight (kg)",
    input: (formData: any, onChange: any) => (
      <InputField
        type="number"
        name="targetWeight"
        placeholder="Target Weight (kg)"
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
          { value: "Light", label: "Light (exercise 1–3 days/week)" },
          { value: "Moderate", label: "Moderate (exercise 3–5 days/week)" },
          { value: "Active", label: "Active (exercise 6–7 days/week)" },
          { value: "Very Active", label: "Very Active (hard exercise daily)" },
        ]}
      />
    ),
  },
];

export default function SetupForm({
  step,
  formData,
  pending,
  stepError,
  submitError,
  isOptionalStep,
  onChange,
  onDaysChange,
  onRestrictionsChange,
  onNext,
  onSkip,
  onBack,
  onSubmit,
}: SetupFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Setup Your Profile</h2>

      {/* Progress indicator */}
      <p className={styles.stepIndicator}>
        Step {step + 1} of {questions.length}
      </p>

      <StepQuestion
        label={questions[step].label}
        input={questions[step].input(formData, onChange, onDaysChange, onRestrictionsChange)}
      />

      {stepError && <p className={styles.error}>{stepError}</p>}

      {submitError && <p className={styles.error}>{submitError}</p>}

      <div style={{ marginTop: 20 }}>
        {step > 0 && (
          <StepButton
            type="button"
            onClick={onBack}
            className={styles.submitButton}
            style={{ marginRight: 10 }}
          >
            Back
          </StepButton>
        )}

        {step < questions.length - 1 ? (
          <>
            <StepButton
              type="button"
              onClick={onNext}
              className={styles.submitButton}
            >
              Next
            </StepButton>

            {isOptionalStep && (
              <StepButton
                type="button"
                onClick={onSkip}
                className={styles.skipButton}
                style={{ marginLeft: 10 }}
              >
                Skip
              </StepButton>
            )}
          </>
        ) : (
          <>
            <StepButton
              type="submit"
              className={styles.submitButton}
              disabled={pending}
            >
              {pending ? "Saving..." : "Save & Continue"}
            </StepButton>

            {isOptionalStep && !pending && (
              <StepButton
                type="button"
                onClick={onSkip}
                className={styles.skipButton}
                style={{ marginLeft: 10 }}
              >
                Skip
              </StepButton>
            )}
          </>
        )}
      </div>
    </form>
  );
}
