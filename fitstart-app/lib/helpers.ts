import { UserProfile } from '../types';

/**
 * Recommend a training window based on the user's preferred time and session length.
 * @param preferredTime 'morning' | 'afternoon' | 'evening'
 * @param sessionLength session length in minutes
 * @returns An object with a time window and a short explanation
 */
export function recommendTrainingTime(
  preferredTime: UserProfile['preferredTime'],
  sessionLength: number
): { window: string; explanation: string } {
  // Base times for each part of the day. These are approximate suggestions.
  const sessions = {
    morning: { start: 6.5, explanation: 'ideal for consistency before work' }, // 6:30 AM
    afternoon: { start: 12.5, explanation: 'efficient short session' }, // 12:30 PM
    evening: { start: 19, explanation: 'good for full gym workout after daily responsibilities' }, // 7:00 PM
  } as const;

  const base = sessions[preferredTime];
  const startHour = Math.floor(base.start);
  const startMinutes = Math.round((base.start - startHour) * 60);
  const endTotalMinutes = base.start * 60 + sessionLength;
  const endHour = Math.floor(endTotalMinutes / 60);
  const endMinutes = Math.round(endTotalMinutes % 60);

  const formatTime = (h: number, m: number) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}`;
  };

  const window = `${formatTime(startHour, startMinutes)} – ${formatTime(endHour, endMinutes)}`;
  const explanation = `${window}, ${base.explanation}`;
  return { window, explanation };
}

/**
 * Calculate weekly completion percentage based on workouts completed vs planned days.
 * @param completed number of workouts completed this week
 * @param planned number of workouts planned for the week
 */
export function calculateWeeklyCompletion(completed: number, planned: number): number {
  if (planned === 0) return 0;
  const percent = (completed / planned) * 100;
  return Math.min(Math.round(percent), 100);
}

/**
 * Calculate weight change from starting weight and current weight.
 * @param starting starting weight in kg
 * @param current current weight in kg
 * @returns positive or negative number representing weight change
 */
export function calculateWeightChange(starting: number, current: number): number {
  return Number((current - starting).toFixed(1));
}