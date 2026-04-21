export interface Exercise {
  id: string;
  name: string;
  category: string;
  primaryMuscles: string;
  instructions: string;
  beginnerTip: string;
  sets: number;
  reps: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  rest: number; // in seconds
  note?: string;
}

export interface WorkoutDay {
  id: string;
  title: string;
  duration: number; // minutes
  type: 'strength' | 'cardio' | 'recovery';
  exercises: WorkoutExercise[];
  note?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  days: WorkoutDay[];
}

export interface UserProfile {
  goal: string;
  currentWeight: number;
  height: number;
  trainingDays: number;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  sessionLength: number;
}