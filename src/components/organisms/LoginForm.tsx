import LoginFormFields from "../molecules/LoginFormFields";
import styles from "../../styles/LoginPage.module.css";
import Button from "../atoms/Button";
import { useFormStatus } from "react-dom";
import { Link } from "react-router-dom";

interface LoginFormProps {
  error: string;
  action: (formData: FormData) => void;
}

export default function LoginForm({ error, action }: LoginFormProps) {
  const { pending } = useFormStatus();

  return (
    <form action={action} method="post" className={styles.form}>
      <h3 className={styles.title}>Login</h3>
      <LoginFormFields error={error} />
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
