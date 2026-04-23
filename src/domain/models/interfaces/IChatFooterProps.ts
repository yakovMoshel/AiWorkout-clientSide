export interface ChatFooterProps {
  input: string;
  onChange: (val: string) => void;
  onSend: () => void;
  loading: boolean;
  remaining: number;
}
