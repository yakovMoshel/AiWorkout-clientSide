import InputField from "../atoms/InputField";
import styles from "../../styles/LoginPage.module.css";
import Button from "../atoms/Button";
import { useRegisterForm } from "../../hooks/useRegisterForm";

interface RegisterFormProps {
  loading: boolean;
  onSubmit: (form: any) => Promise<void>;
  error: string;
}

export default function RegisterForm({ loading, onSubmit, error }: RegisterFormProps) {
  const { form, errors, handleChange, handleSubmit } = useRegisterForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className={styles.form} autoComplete="on">
      <h2 className={styles.title}>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      {errors.general && <p className={styles.error}>{errors.general}</p>}

      {errors.name && <p className={styles.error}>{errors.name}</p>}
      <InputField
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={styles.input}
        autoComplete="name"
      />

      {errors.email && <p className={styles.error}>{errors.email}</p>}
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={styles.input}
        autoComplete="email"
      />

      {errors.password && <p className={styles.error}>{errors.password}</p>}
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className={styles.input}
        autoComplete="new-password"
      />

      {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className={styles.input}
        autoComplete="new-password"
      />

      <Button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}