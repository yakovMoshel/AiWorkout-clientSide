import React from "react";
import { StepQuestionProps } from "../../domain/models/interfaces/IStepQuestionProps";



export default function StepQuestion({ label, input }: StepQuestionProps) {
  return (
    <div>
      <label>{label}</label>
      {input}
    </div>
  );
}