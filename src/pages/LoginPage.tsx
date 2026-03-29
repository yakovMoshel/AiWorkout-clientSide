import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthTabs from "../components/molecules/AuthTabs";
import { loginAction, registerAction } from "../services/authService";
import { useAuth } from "../store/auth-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";  // ← הוסף

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  async function handleLogin(formData: { email: string; password: string }) {
    const res = await loginAction({}, formData);
    if (res.error) {
      setLoginError(res.error);
    } else {
      setLoginError("");
      await refetchUser();
      navigate("/");
    }
  }

  async function handleRegister(form: any) {
    setRegisterError("");
    try {
      setRegisterLoading(true);
      const { error } = await registerAction({}, form);
      if (error) throw new Error(error);
      await refetchUser();
      setTimeout(() => navigate("/setup"), 100);
    } catch (err: any) {
      setRegisterError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <AuthTabs
      defaultTab={defaultTab}
      loginProps={{ error: loginError, onSubmit: handleLogin }}
      registerProps={{ loading: registerLoading, error: registerError, onSubmit: handleRegister }}
    />
  );
}