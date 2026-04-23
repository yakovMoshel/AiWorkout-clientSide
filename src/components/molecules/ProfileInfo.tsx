import React from "react";
import styles from "../../styles/ProfileInfo.module.css";
import Avatar from "../atoms/Avatar";

interface ProfileInfoProps {
  name: string;
  email: string;
  age?: number;
  height?: number;
  weight?: number;
  targetWeight?: number;
  goal?: string;
  image?: string;
}

const GOAL_LABELS: Record<string, string> = {
  weight_loss: "Weight Loss",
  muscle_gain: "Muscle Gain",
  endurance: "Endurance",
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  age,
  height,
  weight,
  targetWeight,
  goal,
  image,
}) => {
  const stats = [
    { label: "Age", value: age ? `${age} yrs` : "—", icon: "🎂" },
    { label: "Height", value: height ? `${height} cm` : "—", icon: "📏" },
    { label: "Weight", value: weight ? `${weight} kg` : "—", icon: "⚖️" },
    { label: "Target", value: targetWeight ? `${targetWeight} kg` : "—", icon: "🎯" },
    { label: "Goal", value: goal ? (GOAL_LABELS[goal] ?? goal) : "—", icon: "🏆" },
  ];

  return (
    <div className={styles.card}>
      {/* Hero section */}
      <div className={styles.hero}>
        <div className={styles.avatarWrap}>
          <Avatar image={image} />
        </div>
        <div className={styles.identity}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.email}>{email}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
