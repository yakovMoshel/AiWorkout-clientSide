import styles from "../../../src/styles/ChatBubble.module.css";
import ReactMarkdown from "react-markdown";
import { TypingIndicator } from "../atoms/TypingIndicator";
import { ChatBubbleProps } from "../../domain/models/interfaces/IChatBubbleProps";

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.row} ${isUser ? styles.user : styles.assistant}`}>
      {!isUser && <div className={styles.avatar}>✦</div>}
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        {isUser ? (
          message.content  
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>  
        )}
      </div>
    </div>
  );
};

export const TypingBubble = () => (
  <div className={`${styles.row} ${styles.assistant}`}>
    <div className={styles.avatar}>✦</div>
    <div className={`${styles.bubble} ${styles.aiBubble}`}>
      <TypingIndicator />
    </div>
  </div>
);