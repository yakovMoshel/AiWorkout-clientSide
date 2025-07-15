import React from "react";
import { TextAreaFieldProps } from "../../domain/models/interfaces/ITextAreaFieldProps";


export default function TextAreaField(props: TextAreaFieldProps) {
  return <textarea {...props} style={{ resize: "vertical" }} />;
}