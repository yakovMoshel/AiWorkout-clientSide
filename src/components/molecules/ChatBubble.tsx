import { IMessage } from "src/domain/models/interfaces/Ichat";
import styles from "../../../src/styles/ChatBubble.module.css";
import { TypingIndicator } from "../atoms/TypingIndicator";

interface ChatBubbleProps {
  message: IMessage;
}

const formatMessage = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.row} ${isUser ? styles.user : styles.assistant}`}>
      {!isUser && <div className={styles.avatar}>✦</div>}
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        {formatMessage(message.content)}
      </div>
    </div>
  );
};

interface TypingBubbleProps {}

export const TypingBubble = (_: TypingBubbleProps) => (
  <div className={`${styles.row} ${styles.assistant}`}>
    <div className={styles.avatar}>✦</div>
    <div className={`${styles.bubble} ${styles.aiBubble}`}>
      <TypingIndicator />
    </div>
  </div>
);