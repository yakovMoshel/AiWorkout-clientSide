import styles from "../../../src/styles/UsageDots.module.css";
import { UsageDotsProps } from "../../domain/models/interfaces/IUsageDotsProps";

const DANGER_THRESHOLD = 3;
const WARN_THRESHOLD = 6;

export const UsageDots = ({ total, used }: UsageDotsProps) => {
  const remaining = total - used;
  const level = remaining <= DANGER_THRESHOLD ? "danger" : remaining <= WARN_THRESHOLD ? "warn" : "ok";

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