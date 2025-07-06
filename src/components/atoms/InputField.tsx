import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputField(props: InputFieldProps) {
  return <input {...props} />;
}