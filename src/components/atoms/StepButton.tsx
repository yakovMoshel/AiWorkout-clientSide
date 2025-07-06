import React from "react";

interface StepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function StepButton(props: StepButtonProps) {
  return <button {...props}>{props.children}</button>;
}