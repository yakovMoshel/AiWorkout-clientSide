import { FormData } from "./IFormData";

export interface SetupFormProps {
  step: number;
  formData: FormData;
  pending: boolean;
  stepError: string;
  submitError: string;
  isOptionalStep: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onDaysChange: (day: string) => void;
  onRestrictionsChange: (restriction: string) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}
