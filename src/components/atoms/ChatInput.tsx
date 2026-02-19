import { useTextareaResize }  from "src/hooks/useTextareaResize";
import styles from "../../../src/styles/ChatInput.module.css";
import { SendButton } from "./Sendbutton";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export const ChatInput = ({ value, onChange, onSend, disabled }: ChatInputProps) => {
  const textareaRef = useTextareaResize(value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={styles.bar}>
      <textarea
        ref={textareaRef}
        className={styles.input}
        placeholder="כתוב הודעה..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        dir="rtl"
      />
      <SendButton onClick={onSend} disabled={disabled || !value.trim()} />
    </div>
  );
};