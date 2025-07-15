import LoginFormFields from "../molecules/LoginFormFields";
import styles from "../../styles/LoginPage.module.css";
import Button from "../atoms/Button";
import { useFormStatus } from "react-dom";
import { Link } from "react-router-dom";
import { useLoginForm } from "../../hooks/useLoginForm";
import { LoginFormProps } from "../../domain/models/interfaces/ILoginFormProps";



export default function LoginForm({ error, onSubmit }: LoginFormProps) {
  const { pending } = useFormStatus();
  const { form, handleChange, handleSubmit } = useLoginForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Login</h3>
      <LoginFormFields error={error} onChange={handleChange} form={form} />
      <Button type="submit" disabled={pending} className={styles.button}>
        {pending ? "Logging in..." : "Login"}
      </Button>
      <p className={styles.registerText}>
        Don't have an account?{" "}
        <Link to="/register" className={styles.registerLink}>
          Register here
        </Link>
      </p>
    </form>
  );
}
