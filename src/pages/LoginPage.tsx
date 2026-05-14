import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthTabs from "../components/molecules/AuthTabs";
import { loginAction, registerAction } from "../services/authService";
import { useAuth } from "../store/auth-context";
import { RegisterForm } from "../domain/models/interfaces/IRegisterForm";

const REDIRECT_DELAY_MS = 100;

export default function LoginPage() {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";

  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  async function handleLogin(formData: { email: string; password: string }) {
    setLoginLoading(true);
    try {
      const res = await loginAction({}, formData);
      if (res.error) {
        setLoginError(res.error);
      } else {
        setLoginError("");
        await refetchUser();
        navigate("/");
      }
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegister(form: RegisterForm) {
    setRegisterError("");
    setRegisterLoading(true);
    try {
      const { error } = await registerAction({}, form);
      if (error) {
        setRegisterError(error);
        return;
      }
      await refetchUser();
      setTimeout(() => navigate("/setup"), REDIRECT_DELAY_MS);
    } catch {
      setRegisterError("Registration failed. Please try again.");
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <AuthTabs
      defaultTab={defaultTab}
      loginProps={{ loading: loginLoading, error: loginError, onSubmit: handleLogin }}
      registerProps={{ loading: registerLoading, error: registerError, onSubmit: handleRegister }}
    />
  );
}