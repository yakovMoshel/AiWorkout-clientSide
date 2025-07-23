import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import LoginForm from "../components/organisms/LoginForm";
import { loginAction } from "../services/authService";
import { useAuth } from "../store/auth-context";

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  
  async function handleLogin(formData: { email: string; password: string }) {
    const res = await loginAction({}, formData);
    if (res.error) {
      setError(res.error);
    } else {
      setError("");
      await refetchUser();
      navigate("/");
    }
  }

  return (
    <div className={styles.container}>
      <LoginForm error={error} onSubmit={handleLogin} />
    </div>
  );
}
