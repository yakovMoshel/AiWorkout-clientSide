import { RegisterForm, RegisterFormErrors } from "../domain/models/interfaces/IRegisterForm";


export function validateRegisterForm(form: RegisterForm): RegisterFormErrors {
  const errors: RegisterFormErrors = {};
  const isAllEmpty =
    !form.name && !form.email && !form.password && !form.confirmPassword;

  if (isAllEmpty) {
    errors.general = "Please fill in all fields.";
    return errors;
  }

  if (!form.name) errors.name = "Name is required.";
  if (!form.email) errors.email = "Email is required.";
  if (!form.password) errors.password = "Password is required.";
  if (!form.confirmPassword) errors.confirmPassword = "Confirm Password is required.";

  if (
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}