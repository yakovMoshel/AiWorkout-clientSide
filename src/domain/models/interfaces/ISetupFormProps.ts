export interface SetupFormProps {
  step: number;
  formData: any;
  pending: boolean;
  stepError: string;
  submitError: string;
  isOptionalStep: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onDaysChange: (day: string) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}