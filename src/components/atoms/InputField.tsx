import React from "react";
import { InputFieldProps } from "../../domain/models/interfaces/IInputFieldProps";
import styles from "../../styles/InputField.module.css";

export default function InputField(props: InputFieldProps) {
  return <input {...props} className={styles.inputField} />;
}
