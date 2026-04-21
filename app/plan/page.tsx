"use client";

import React, { useState } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { workoutPlans } from '../../data/workouts';
import { UserProfile } from '../../types';
import WorkoutCard from '../../components/WorkoutCard';
import BottomNav from '../../components/BottomNav';

export default function PlanPage() {
  const [profile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  const [selectedDays, setSelectedDays] = useState<number>(profile.trainingDays);
  const plan = workoutPlans[selectedDays] ?? workoutPlans[4];

  return (
    <div className="px-4 pt-8 pb-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
          Weekly Schedule
        </p>
        <h1 className="text-2xl font-bold text-accent tracking-tight">Training Plan</h1>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 mb-6">
        {[3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDays(d)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:opacity-75"
            style={
              selectedDays === d
                ? { background: '#3B6EAF', color: '#E8EDF5', boxShadow: '0 0 12px rgba(59,110,175,0.4)' }
                : { background: '#0D1424', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }
            }
          >
            {d} Days
          </button>
        ))}
      </div>

      {/* Workout list */}
      <div>
        {plan.days.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-4">📋</span>
            <p className="text-accent font-semibold mb-1">No workouts yet</p>
            <p className="text-sm text-accent-muted">Select a plan above to get started.</p>
          </div>
        ) : (
          plan.days.map((day, idx) => (
            <WorkoutCard key={day.id} day={day} dayIndex={idx} planId={plan.id} />
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
