export interface LoginFormProps {
  loading?: boolean;
  error: string;
  onSubmit: (formData: { email: string; password: string }) => void;
}
