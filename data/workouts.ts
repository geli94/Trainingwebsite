import { WorkoutPlan } from '../types';

/*
 * Sample workout plans for 3, 4 and 5 day schedules. These plans
 * emphasise fat loss with a combination of strength and cardio. The
 * exercises referenced here correspond to the IDs defined in
 * exercises.ts. Rest times are in seconds and durations in minutes.
 */
export const workoutPlans: Record<number, WorkoutPlan> = {
  3: {
    id: '3day',
    title: '3‑Day Fat Loss Plan',
    days: [
      {
        id: 'day1',
        title: 'Full Body A',
        duration: 45,
        type: 'strength',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 60, note: '5–10 min warm up' },
          { exerciseId: 'chest-press', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'leg-press', sets: 3, reps: 12, rest: 90 },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
        ],
        note: 'Focus on controlled movements and proper form.',
      },
      {
        id: 'day2',
        title: 'Cardio + Core',
        duration: 40,
        type: 'cardio',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 0, note: 'Incline walk 20–30 min' },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Maintain a moderate intensity during cardio.',
      },
      {
        id: 'day3',
        title: 'Full Body B',
        duration: 50,
        type: 'strength',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 60, note: '5–10 min warm up' },
          { exerciseId: 'seated-row', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'shoulder-press', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
          { exerciseId: 'tricep-pushdown', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Use weights you can control for each rep.',
      },
    ],
  },
  4: {
    id: '4day',
    title: '4‑Day Fat Loss Plan',
    days: [
      {
        id: 'day1',
        title: 'Full Body A',
        duration: 45,
        type: 'strength',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 60, note: '5–10 min warm up' },
          { exerciseId: 'chest-press', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'leg-press', sets: 3, reps: 12, rest: 90 },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
        ],
        note: 'Start light and focus on form.',
      },
      {
        id: 'day2',
        title: 'Cardio + Core',
        duration: 40,
        type: 'cardio',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 0, note: 'Incline walk 20–30 min' },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Keep cardio intensity moderate.',
      },
      {
        id: 'day3',
        title: 'Full Body B',
        duration: 50,
        type: 'strength',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 60, note: '5–10 min warm up' },
          { exerciseId: 'seated-row', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'shoulder-press', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
          { exerciseId: 'tricep-pushdown', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Pick weights that challenge you but allow good form.',
      },
      {
        id: 'day4',
        title: 'Cardio + Mobility',
        duration: 40,
        type: 'recovery',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 0, note: 'Incline walk 20–30 min' },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Include stretching and mobility work after cardio.',
      },
    ],
  },
  5: {
    id: '5day',
    title: '5‑Day Fat Loss Plan',
    days: [
      {
        id: 'day1',
        title: 'Full Body A',
        duration: 45,
        type: 'strength',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 60, note: '5–10 min warm up' },
          { exerciseId: 'chest-press', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'lat-pulldown', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'leg-press', sets: 3, reps: 12, rest: 90 },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
        ],
        note: 'Stay consistent and focus on form.',
      },
      {
        id: 'day2',
        title: 'Cardio + Core',
        duration: 40,
        type: 'cardio',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 0, note: 'Incline walk 20–30 min' },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Moderate intensity and controlled breathing.',
      },
      {
        id: 'day3',
        title: 'Full Body B',
        duration: 50,
        type: 'strength',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 60, note: '5–10 min warm up' },
          { exerciseId: 'seated-row', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'shoulder-press', sets: 3, reps: 10, rest: 90 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
          { exerciseId: 'tricep-pushdown', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Use progressive overload where possible.',
      },
      {
        id: 'day4',
        title: 'Cardio + Mobility',
        duration: 40,
        type: 'recovery',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 0, note: 'Incline walk 20–30 min' },
          { exerciseId: 'plank', sets: 3, reps: 30, rest: 60 },
          { exerciseId: 'curl', sets: 3, reps: 12, rest: 60 },
        ],
        note: 'Include stretching and foam rolling.',
      },
      {
        id: 'day5',
        title: 'Optional Active Recovery',
        duration: 30,
        type: 'recovery',
        exercises: [
          { exerciseId: 'treadmill', sets: 1, reps: 1, rest: 0, note: 'Light walk or cycling 20–30 min' },
        ],
        note: 'Take it easy and focus on movement quality.',
      },
    ],
  },
};