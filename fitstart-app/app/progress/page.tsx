"use client";

import React from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { UserProfile } from '../../types';
import ProgressChart from '../../components/ProgressChart';
import BottomNav from '../../components/BottomNav';
import StatCard from '../../components/StatCard';

export default function ProgressPage() {
  const [profile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  const [startingWeight] = useLocalStorage<number>('startingWeight', profile.currentWeight);
  const [completedThisWeek] = useLocalStorage<number>('completedThisWeek', 0);
  const [streak] = useLocalStorage<number>('streak', 0);
  const [progressNotes, setProgressNotes] = useLocalStorage<string>('progressNotes', '');

  const weightChange = (profile.currentWeight - startingWeight).toFixed(1);

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-xl font-semibold text-primary-light mb-4">Progress</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
          <StatCard title="Starting Weight" value={`${startingWeight} kg`} />
          <StatCard title="Current Weight" value={`${profile.currentWeight} kg`} />
          <StatCard title="Change" value={`${weightChange} kg`} subtext={weightChange.startsWith('-') ? 'Lost' : 'Gained'} />
          <StatCard title="Streak" value={`${streak} days`} />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary-light mb-2">Weekly Completion</h2>
        <ProgressChart completed={completedThisWeek} planned={profile.trainingDays} />
        <p className="text-xs text-accent/60 mt-1">
          {completedThisWeek} of {profile.trainingDays} workouts completed this week.
        </p>
      </div>
      {/* Notes section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primary-light mb-2">Notes</h2>
        <textarea
          value={progressNotes}
          onChange={(e) => setProgressNotes(e.target.value)}
          placeholder="e.g. Energy better, clothes feeling looser..."
          className="w-full h-32 rounded-lg p-3 bg-background-light text-accent focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>
      <BottomNav />
    </div>
  );
}