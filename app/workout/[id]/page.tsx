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

  // id format: <planId>-<dayId>
  const [planId, dayId] = id.split('-');
  // Find the workout day
  const planEntries = Object.values(workoutPlans);
  const plan = planEntries.find((p) => p.id === planId);
  const day = plan?.days.find((d) => d.id === dayId);

  // Track exercise completion
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  if (!plan || !day) {
    return (
      <div className="p-4">
        <p>Workout not found.</p>
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
    // Increase completed workouts count for the week and streak
    setCompletedThisWeek((c) => c + 1);
    setStreak((s) => s + 1);
    // Redirect back to home
    router.push('/');
  };

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-xl font-semibold text-primary-light mb-2">{day.title}</h1>
      <p className="text-sm text-accent/70 mb-4">
        {day.type.charAt(0).toUpperCase() + day.type.slice(1)} • {day.duration} min
      </p>
      {/* List of exercises */}
      <div className="space-y-3 mb-6">
        {day.exercises.map((ex) => {
          const exData = allExercises.find((e) => e.id === ex.exerciseId);
          const checked = completedExercises.includes(ex.exerciseId);
          return (
            <div
              key={ex.exerciseId}
              className="flex items-start bg-background-card rounded-xl p-3 shadow-md"
            >
              <input
                type="checkbox"
                className="mt-1 mr-3"
                checked={checked}
                onChange={() => handleToggle(ex.exerciseId)}
              />
              <div className="flex-1">
                <p className="font-medium text-accent">{exData?.name}</p>
                <p className="text-xs text-accent/60">
                  {ex.sets} sets × {ex.reps} reps • Rest {ex.rest} s
                </p>
                {ex.note && <p className="text-xs text-accent/50 italic mt-1">{ex.note}</p>}
              </div>
            </div>
          );
        })}
      </div>
      {day.note && <p className="text-sm text-accent/60 mb-4 italic">Note: {day.note}</p>}
      <div className="flex gap-4">
        <button
          className="flex-1 bg-primary rounded-xl py-3 text-accent font-medium"
          onClick={handleFinishWorkout}
        >
          Finish Workout
        </button>
        <button
          className="flex-1 bg-secondary rounded-xl py-3 text-accent font-medium"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
      <BottomNav />
    </div>
  );
}