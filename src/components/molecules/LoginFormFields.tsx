import InputField from "../atoms/InputField";
import styles from "../../styles/LoginPage.module.css";

interface LoginFormFieldsProps {
  error: string;
}

export default function LoginFormFields({ error }: LoginFormFieldsProps) {
  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <InputField
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        className={styles.input}
        required
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        className={styles.input}
        required
      />
    </>
  );
}
