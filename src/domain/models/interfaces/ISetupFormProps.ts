export interface SetupFormProps {
  step: number;
  formData: any;
  pending: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  onDaysChange: (day: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}