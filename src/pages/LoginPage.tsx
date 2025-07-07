"use client";
import { useFormState } from "react-dom";
import styles from "../styles/LoginPage.module.css";
import LoginForm from "../components/organisms/LoginForm";
import { fakeLoginAction } from "../services/actions";

// מבנה ההחזרה מ-action
const initialState = {
  error: "",
};

export default function LoginPage() {
  const [formState, formAction] = useFormState(fakeLoginAction, initialState);

  return (
    <div className={styles.container}>
      <LoginForm error={formState.error} action={formAction} />
    </div>
  );
}
