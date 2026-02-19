import { UsageDots } from "../atoms/UsageDots";
import styles from "../../../src/styles/ChatHeader.module.css";

const AI_LIMIT = 10;

interface ChatHeaderProps {
  usedMessages: number;
}

export const ChatHeader = ({ usedMessages }: ChatHeaderProps) => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <span className={styles.icon}>✦</span>
      <span className={styles.title}>AI Coach</span>
    </div>
    <UsageDots total={AI_LIMIT} used={usedMessages} />
  </header>
);