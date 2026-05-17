import { ChatInput } from "../atoms/ChatInput";
import styles from "../../../src/styles/ChatFooter.module.css";
import { ChatFooterProps } from "../../domain/models/interfaces/IChatFooterProps";

export const ChatFooter = ({ input, onChange, onSend, loading, remaining }: ChatFooterProps) => (
  <footer className={styles.footer}>
    {remaining <= 0 ? (
      <div className={styles.limitBanner}>
        🚫 You've used all your free messages. Upgrade soon 😉
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