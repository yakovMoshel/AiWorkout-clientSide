
import { IMessage } from "src/domain/models/interfaces/Ichat";
import styles from "../../../src/styles/ChatMessageList.module.css";
import { ChatBubble, TypingBubble } from "../molecules/ChatBubble";
import { useAutoScroll } from "src/hooks/useAutoScroll";

interface ChatMessageListProps {
  messages: IMessage[];
  loading: boolean;
  error: string | null;
}

export const ChatMessageList = ({ messages, loading, error }: ChatMessageListProps) => {
  const bottomRef = useAutoScroll([messages, loading]);

  return (
    <main className={styles.list}>
      {messages.length === 0 && !loading && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>✦</div>
          <p className={styles.emptyTitle}>Ask me anything</p>
          <p className={styles.emptySub}>I'm here to help with workouts, nutrition and more</p>
        </div>
      )}

      {messages.map((msg, i) => (
        <ChatBubble key={i} message={msg} />
      ))}

      {loading && <TypingBubble />}

      {error && (
        <div className={styles.error}>
          <span>⚠ {error}</span>
        </div>
      )}

      <div ref={bottomRef} />
    </main>
  );
};