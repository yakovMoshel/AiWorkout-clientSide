export interface RegisterFormProps {
  loading: boolean;
  onSubmit: (form: any) => Promise<void>;
  error: string;
}