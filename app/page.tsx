"use client";

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';
import { UserProfile, WorkoutDay } from '../types';
import { workoutPlans } from '../data/workouts';
import { exercises } from '../data/exercises';
import BottomNav from '../components/BottomNav';
import StatCard from '../components/StatCard';
import TimeRecommendationCard from '../components/TimeRecommendationCard';

export default function DashboardPage() {
  const [profile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  // Completed workouts this week (demo data). Could be persisted later.
  const [completedThisWeek, setCompletedThisWeek] = useLocalStorage<number>('completedThisWeek', 1);
  const [streak] = useLocalStorage<number>('streak', 3);
  const [startingWeight] = useLocalStorage<number>('startingWeight', profile.currentWeight);

  // Determine today's workout based on training days and day of week
  const plan = workoutPlans[profile.trainingDays] ?? workoutPlans[4];
  const todayIndex = 0; // For simplicity always show day 1 as today's workout
  const todayWorkout: WorkoutDay | undefined = plan.days[todayIndex];

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-xl font-semibold text-primary-light mb-2">Hello!</h1>
      <p className="text-sm text-accent/70 mb-4">Ready to move today?</p>
      {/* Quick stats section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard title="Weekly Goal" value={`${profile.trainingDays} workouts`} />
        <StatCard title="Completed" value={`${completedThisWeek}`} subtext="This week" />
        <StatCard title="Current Weight" value={`${profile.currentWeight} kg`} />
        <StatCard title="Streak" value={`${streak} days`} />
      </div>
      {/* Start workout card */}
      {todayWorkout && (
        <div className="bg-primary-light rounded-2xl p-4 text-background mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Today’s Workout</h2>
          <p className="text-sm mb-4">{todayWorkout.title} • {todayWorkout.duration} min</p>
          <a
            href={`/workout/${plan.id}-${todayWorkout.id}`}
            className="bg-background rounded-xl px-4 py-2 text-primary font-semibold"
          >
            Start Workout
          </a>
        </div>
      )}
      {/* Today’s plan section (preview of exercises) */}
      {todayWorkout && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-light mb-2">Today’s Plan</h3>
          <ul className="space-y-2">
            {todayWorkout.exercises.slice(0, 3).map((ex) => {
              const exData = exercises.find((e) => e.id === ex.exerciseId);
              return (
                <li key={ex.exerciseId} className="flex justify-between items-center bg-background-card rounded-xl p-3">
                  <span className="text-accent">{exData?.name}</span>
                  <span className="text-xs text-accent/60">
                    {ex.sets} × {ex.reps}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* Fat loss tips */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary-light mb-2">Fat Loss Tips</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-accent/80">
          <li>Start light and focus on form.</li>
          <li>Aim for 0.5–1 kg weight loss per week.</li>
          <li>Consistency matters more than perfection.</li>
          <li>Combine cardio and strength training.</li>
        </ul>
      </div>
      {/* Best time to train */}
      <TimeRecommendationCard preferredTime={profile.preferredTime} sessionLength={profile.sessionLength} />
      {/* Motivational message */}
      <p className="text-center text-sm text-accent/60 mt-4">
        Remember: progress is made one workout at a time. You've got this!
      </p>
      <BottomNav />
    </div>
  );
}