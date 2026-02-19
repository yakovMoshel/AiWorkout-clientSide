import styles from "../../../src/styles/TypingIndicator.module.css";

export const TypingIndicator = () => (
  <div className={styles.typing}>
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
  </div>
);