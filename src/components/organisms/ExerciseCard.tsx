import { useState } from "react";
import styles from "../../styles/ExerciseCard.module.css";
import { PropsExercise } from "../../domain/models/interfaces/IExercise";

export default function ExerciseCard({ exercise }: PropsExercise) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // In future, you can add a server call here to save favorites
  };

  return (
    <div className={styles.card}>
      <img src={exercise.gifUrl} alt={exercise.name} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.name}>{exercise.name}</h3>
        <p className={styles.info}>
          <strong>Body Part:</strong> {exercise.bodyPart}
        </p>
        <p className={styles.info}>
          <strong>Equipment:</strong> {exercise.equipment}
        </p>
        <button className={styles.favoriteButton} onClick={toggleFavorite}>
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}
