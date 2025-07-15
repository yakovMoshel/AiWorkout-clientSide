export interface LoginFormProps {
  error: string;
  onSubmit: (formData: { email: string; password: string }) => void;
}