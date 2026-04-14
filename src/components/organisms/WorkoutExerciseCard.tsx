import styles from "../../styles/WorkoutExerciseCard.module.css";
import { WorkoutExerciseCardProps } from "../../domain/models/interfaces/IWorkoutPlanExercise";

function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 6.5h11" />
      <path d="M6.5 17.5h11" />
      <path d="M3 9.5v5" />
      <path d="M21 9.5v5" />
      <rect x="1.5" y="8" width="3" height="8" rx="1" />
      <rect x="19.5" y="8" width="3" height="8" rx="1" />
      <rect x="5" y="5" width="3" height="14" rx="1" />
      <rect x="16" y="5" width="3" height="14" rx="1" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

interface StatItem {
  label: string;
  value: string;
}

export default function WorkoutExerciseCard({ exercise }: WorkoutExerciseCardProps) {
  const { name, duration, repetitions, sets, equipment, image } = exercise;

  const stats: StatItem[] = [
    sets       ? { label: "Sets",       value: sets }       : null,
    repetitions ? { label: "Reps",      value: repetitions } : null,
    duration   ? { label: "Duration",   value: duration }   : null,
    equipment  ? { label: "Equipment",  value: equipment }  : null,
  ].filter((s): s is StatItem => s !== null);
console.log("image", image);
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ? (
          <img
            src={image}
            alt={name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder} aria-label="No image available">
            <DumbbellIcon className={styles.placeholderIcon} />
          </div>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>

        {stats.length > 0 && (
          <div className={styles.grid}>
            {stats.map(({ label, value }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statLabel}>{label}</span>
                <span className={styles.statValue}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
