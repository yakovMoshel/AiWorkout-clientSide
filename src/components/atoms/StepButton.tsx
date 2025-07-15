import React from "react";
import { StepButtonProps } from "../../domain/models/interfaces/IStepButtonProps";


export default function StepButton(props: StepButtonProps) {
  return <button {...props}>{props.children}</button>;
}