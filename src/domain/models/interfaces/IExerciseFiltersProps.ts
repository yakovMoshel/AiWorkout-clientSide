export interface ExerciseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  equipmentFilter: string;
  onEquipmentChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  selectClassName?: string;
}
