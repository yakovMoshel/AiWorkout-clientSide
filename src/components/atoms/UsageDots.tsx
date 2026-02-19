import styles from "../../../src/styles/UsageDots.module.css";

interface UsageDotsProps {
  total: number;
  used: number;
}

export const UsageDots = ({ total, used }: UsageDotsProps) => {
  const remaining = total - used;
  const level = remaining <= 3 ? "danger" : remaining <= 6 ? "warn" : "ok";

  return (
    <div className={styles.wrapper}>
      <div className={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i < used ? styles.used : `${styles.free} ${styles[level]}`}`}
          />
        ))}
      </div>
      <span className={styles.label}>
        {remaining > 0 ? `${remaining} הודעות נותרו` : "אין הודעות"}
      </span>
    </div>
  );
};