import { ChatInput } from "../atoms/ChatInput";
import styles from "../../../src/styles/ChatFooter.module.css";

interface ChatFooterProps {
  input: string;
  onChange: (val: string) => void;
  onSend: () => void;
  loading: boolean;
  remaining: number;
}

export const ChatFooter = ({ input, onChange, onSend, loading, remaining }: ChatFooterProps) => (
  <footer className={styles.footer}>
    {remaining <= 0 ? (
      <div className={styles.limitBanner}>
        🚫 נגמרו ההודעות החינמיות שלך. שדרג בקרוב 😉
      </div>
    ) : (
      <ChatInput
        value={input}
        onChange={onChange}
        onSend={onSend}
        disabled={loading}
      />
    )}
  </footer>
);