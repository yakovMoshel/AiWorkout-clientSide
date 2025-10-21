import React from "react";
import { SelectFieldProps } from "../../domain/models/interfaces/ISelectFieldProps";
import styles from "../../styles/SelectField.module.css";

export default function SelectField({ options, ...props }: SelectFieldProps) {
  return (
    <select {...props} className={styles.selectField}>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
