import { Exercise } from '../types';

/*
 * Sample exercise data for FitStart. Each exercise is beginner friendly
 * and includes simple instructions, common mistakes, and recommended
 * starting sets and reps. These can be extended or replaced with real
 * backend data later.
 */
export const exercises: Exercise[] = [
  {
    id: 'treadmill',
    name: 'Treadmill',
    category: 'Cardio',
    primaryMuscles: 'Legs, cardiovascular system',
    instructions:
      'Use for warm‑up or incline walking cardio. Start at 5–6 km/h with an incline of 5–10%. Keep an upright posture and avoid holding the rails too much.',
    beginnerTip: 'Begin with a 5‑minute warm‑up. Focus on controlled breathing and maintain good posture.',
    sets: 1,
    reps: 1,
  },
  {
    id: 'chest-press',
    name: 'Chest Press Machine',
    category: 'Strength',
    primaryMuscles: 'Chest, triceps',
    instructions:
      'Adjust the seat so the handles align with your chest. Push forward with control and avoid locking your elbows at the top.',
    beginnerTip: 'Start with light weight and focus on smooth, controlled repetitions.',
    sets: 3,
    reps: 10,
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Strength',
    primaryMuscles: 'Back, biceps',
    instructions:
      'Pull the bar to your upper chest while keeping your chest up. Do not pull behind the neck.',
    beginnerTip: 'Use a comfortable grip and avoid using momentum. Pause briefly at the bottom.',
    sets: 3,
    reps: 10,
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'Strength',
    primaryMuscles: 'Quadriceps, glutes, hamstrings',
    instructions:
      'Place your feet shoulder‑width apart on the platform. Push through your heels and do not lock your knees at the top.',
    beginnerTip: 'Focus on full range of motion and controlled movements. Adjust the seat to avoid overstretching your legs.',
    sets: 3,
    reps: 12,
  },
  {
    id: 'seated-row',
    name: 'Seated Cable Row',
    category: 'Strength',
    primaryMuscles: 'Back, biceps',
    instructions:
      'Sit upright with your chest up and pull the handle toward your torso. Squeeze your shoulder blades together and avoid rounding your back.',
    beginnerTip: 'Keep your movements controlled and avoid leaning backward.',
    sets: 3,
    reps: 10,
  },
  {
    id: 'shoulder-press',
    name: 'Dumbbell Shoulder Press',
    category: 'Strength',
    primaryMuscles: 'Shoulders, triceps',
    instructions:
      'Sit with your back supported. Press the dumbbells overhead, avoiding arching your back. Lower with control.',
    beginnerTip: 'Begin with lighter dumbbells to practice proper form. Do not flare your elbows out excessively.',
    sets: 3,
    reps: 10,
  },
  {
    id: 'curl',
    name: 'Dumbbell Curl',
    category: 'Strength',
    primaryMuscles: 'Biceps',
    instructions:
      'Stand tall, hold dumbbells at your sides, and curl them toward your shoulders. Avoid swinging your body.',
    beginnerTip: 'Keep your elbows close to your torso and focus on squeezing the biceps.',
    sets: 3,
    reps: 12,
  },
  {
    id: 'tricep-pushdown',
    name: 'Cable Tricep Pushdown',
    category: 'Strength',
    primaryMuscles: 'Triceps',
    instructions:
      'Stand with your feet shoulder‑width apart. Push the cable attachment down by extending your elbows. Keep your upper arms stationary.',
    beginnerTip: 'Do not lean over the weight stack. Focus on isolating your triceps and controlling the movement.',
    sets: 3,
    reps: 12,
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    primaryMuscles: 'Abdominals, lower back',
    instructions:
      'Place your forearms on the ground with elbows under shoulders. Keep your body in a straight line from head to heels. Do not drop your hips.',
    beginnerTip: 'Engage your core and glutes to maintain proper alignment. Start with shorter holds and increase over time.',
    sets: 3,
    reps: 30, // seconds per set
  },
];