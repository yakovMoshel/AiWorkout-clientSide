import { useState } from "react";

export function useLoginForm(onSubmit: (form: { email: string; password: string }) => Promise<void> | void) {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return { form, handleChange, handleSubmit };
}