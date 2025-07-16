import InputField from "../atoms/InputField";
import styles from "../../styles/LoginPage.module.css";
import { LoginFormFieldsProps } from "../../domain/models/interfaces/ILoginFormFieldsProps";



export default function LoginFormFields({ onChange, error, form }: LoginFormFieldsProps) {
  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <InputField
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        className={styles.input}
        value={form.email}
        onChange={onChange}
        
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        className={styles.input}
        value={form.password}
        onChange={onChange}
      />
    </>
  );
}
