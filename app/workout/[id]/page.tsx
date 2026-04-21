"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { workoutPlans } from '../../../data/workouts';
import { exercises as allExercises } from '../../../data/exercises';
import BottomNav from '../../../components/BottomNav';
import { useLocalStorage } from '../../../lib/useLocalStorage';

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [completedThisWeek, setCompletedThisWeek] = useLocalStorage<number>('completedThisWeek', 0);
  const [streak, setStreak] = useLocalStorage<number>('streak', 0);
  const { id } = params as { id: string };

  const [planId, dayId] = id.split('-');
  const planEntries = Object.values(workoutPlans);
  const plan = planEntries.find((p) => p.id === planId);
  const day = plan?.days.find((d) => d.id === dayId);

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  if (!plan || !day) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <p className="text-accent font-semibold text-lg mb-1">Workout not found</p>
        <p className="text-sm text-accent-muted mb-6">This workout doesn't exist or was removed.</p>
        <button
          onClick={() => router.push('/plan')}
          className="rounded-2xl px-6 py-3 text-sm font-semibold"
          style={{ background: '#3B6EAF', color: '#E8EDF5' }}
        >
          Back to Plan
        </button>
        <BottomNav />
      </div>
    );
  }

  const handleToggle = (exerciseId: string) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId]
    );
  };

  const handleFinishWorkout = () => {
    setCompletedThisWeek((c) => c + 1);
    setStreak((s) => s + 1);
    router.push('/');
  };

  const doneCount = completedExercises.length;
  const totalCount = day.exercises.length;
  const progress = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  return (
    <div className="px-4 pt-8 pb-6">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-accent-muted text-sm mb-5 active:opacity-70"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Plan
      </button>

      <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
        {day.type.charAt(0).toUpperCase() + day.type.slice(1)} · {day.duration} min
      </p>
      <h1 className="text-2xl font-bold text-accent tracking-tight mb-5">{day.title}</h1>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted">
            Progress
          </span>
          <span className="text-[11px] text-accent-muted">{doneCount} / {totalCount}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1E2D45' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3B6EAF, #4A90D9)',
            }}
          />
        </div>
      </div>

      {/* Exercise list */}
      <div className="space-y-2 mb-6">
        {day.exercises.map((ex) => {
          const exData = allExercises.find((e) => e.id === ex.exerciseId);
          const checked = completedExercises.includes(ex.exerciseId);
          return (
            <button
              key={ex.exerciseId}
              onClick={() => handleToggle(ex.exerciseId)}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all active:opacity-70"
              style={{
                background: checked ? 'rgba(59,110,175,0.15)' : '#0D1424',
                border: checked
                  ? '1px solid rgba(74,144,217,0.3)'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Custom checkbox */}
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: checked
                    ? 'linear-gradient(135deg, #3B6EAF, #4A90D9)'
                    : 'transparent',
                  border: checked ? 'none' : '1.5px solid #1E2D45',
                }}
              >
                {checked && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="#E8EDF5" strokeWidth={3} className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-[15px] leading-tight transition-colors"
                  style={{ color: checked ? '#64748B' : '#E8EDF5', textDecoration: checked ? 'line-through' : 'none' }}
                >
                  {exData?.name}
                </p>
                <p className="text-[11px] text-accent-muted mt-0.5">
                  {ex.sets} sets · {ex.reps} reps · {ex.rest}s rest
                </p>
                {ex.note && (
                  <p className="text-[11px] text-accent/40 italic mt-0.5">{ex.note}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {day.note && (
        <div
          className="rounded-xl px-4 py-3 mb-6 flex gap-2"
          style={{ background: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.15)' }}
        >
          <span className="text-sm">📝</span>
          <p className="text-[12px] text-accent/60 italic leading-relaxed">{day.note}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleFinishWorkout}
          aria-label="Finish workout and return to dashboard"
          className="flex-1 rounded-2xl py-4 text-sm font-bold transition-opacity active:opacity-80"
          style={{
            background: 'linear-gradient(135deg, #3B6EAF, #4A90D9)',
            color: '#E8EDF5',
            boxShadow: '0 0 16px rgba(74,144,217,0.3)',
          }}
        >
          Finish Workout 🏁
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
