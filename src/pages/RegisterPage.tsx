"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import InputField from "../components/atoms/InputField";
import api from "../utils/api"; // אתה כבר מייבא את axios פה
import { validateRegisterForm } from "../utils/validateForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const errors = validateRegisterForm(form);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/setup");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Registration failed. Please try again.";
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="on">
        <h2 className={styles.title}>Register</h2>

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

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
