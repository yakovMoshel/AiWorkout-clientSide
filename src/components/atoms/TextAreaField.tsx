import React from "react";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextAreaField(props: TextAreaFieldProps) {
  return <textarea {...props} />;
}