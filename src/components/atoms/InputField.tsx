import React from "react";
import { InputFieldProps } from "../../domain/models/interfaces/IInputFieldProps";


export default function InputField(props: InputFieldProps) {
  return <input {...props} />;
}