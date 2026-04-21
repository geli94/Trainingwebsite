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
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-xl font-semibold text-primary-light mb-4">Training Plan</h1>
      {/* Toggle for plan length */}
      <div className="flex gap-2 mb-4">
        {[3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDays(d)}
            className={
              'px-3 py-1 rounded-lg text-sm ' +
              (selectedDays === d
                ? 'bg-primary-light text-background font-medium'
                : 'bg-background-light text-accent')
            }
          >
            {d} Days
          </button>
        ))}
      </div>
      {/* List of workout days */}
      <div>
        {plan.days.map((day, idx) => (
          <WorkoutCard key={day.id} day={day} dayIndex={idx} planId={plan.id} />
        ))}
      </div>
      <BottomNav />
    </div>
  );
}