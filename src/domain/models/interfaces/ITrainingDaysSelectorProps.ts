export interface TrainingDaysSelectorProps {
  selectedDays: string[];
  onToggle: (day: string) => void;
}