export  interface LoginFormFieldsProps {
  error: string;
  form: { email: string; password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
