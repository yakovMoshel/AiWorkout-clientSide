import React from "react";

interface StepQuestionProps {
  label: string;
  input: React.ReactNode;
}

export default function StepQuestion({ label, input }: StepQuestionProps) {
  return (
    <div>
      <label>{label}</label>
      {input}
    </div>
  );
}