import React from "react";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export default function SelectField({ options, ...props }: SelectFieldProps) {
  return (
    <select {...props}>
      <option value="">Select</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}