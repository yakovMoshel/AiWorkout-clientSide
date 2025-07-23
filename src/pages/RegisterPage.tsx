import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import RegisterForm from "../components/organisms/RegisterForm";
import { registerAction } from "../services/authService";
import { useAuth } from "../store/auth-context";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const { refetchUser } = useAuth();

  async function handleRegister(form: any) {
    setGeneralError("");
    try {
      
      setLoading(true);
      const { error } = await registerAction({}, form);
      if (error) throw new Error(error);
      
      await refetchUser();  
      navigate("/setup");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Registration failed. Please try again.";
      setGeneralError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <RegisterForm loading={loading} onSubmit={handleRegister} error={generalError} />
    </div>
  );
}
