export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
}

export interface PropsExercise {
  exercise: Exercise;
}