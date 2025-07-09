import { useState } from "react";
import { RegisterFormErrors, validateRegisterForm } from "../utils/validateForm";

export function useRegisterForm(onSubmit: (form: any) => Promise<void> | void) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateRegisterForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    await onSubmit(form);
  }

  return { form, errors, handleChange, handleSubmit, setErrors };
}