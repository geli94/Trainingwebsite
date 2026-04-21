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

  const rawChange = profile.currentWeight - startingWeight;
  const weightChange = rawChange.toFixed(1);
  const lost = rawChange < 0;

  return (
    <div className="px-4 pt-8 pb-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
          Your Journey
        </p>
        <h1 className="text-2xl font-bold text-accent tracking-tight">Progress</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard title="Starting Weight" value={`${startingWeight} kg`} icon="📌" />
        <StatCard title="Current Weight" value={`${profile.currentWeight} kg`} icon="⚖️" />
        <StatCard
          title="Change"
          value={`${lost ? '' : '+'}${weightChange} kg`}
          subtext={lost ? 'Lost 🎉' : rawChange === 0 ? 'No change' : 'Gained'}
          icon={lost ? '📉' : '📈'}
        />
        <StatCard title="Streak" value={`${streak} days`} icon="🔥" />
      </div>

      {/* Weekly completion */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{
          background: '#0D1424',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-3">
          This Week
        </p>
        <ProgressChart completed={completedThisWeek} planned={profile.trainingDays} />
        <p className="text-[12px] text-accent-muted mt-2">
          {completedThisWeek} of {profile.trainingDays} workouts completed
        </p>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-3">
          Notes
        </p>
        <textarea
          value={progressNotes}
          onChange={(e) => setProgressNotes(e.target.value)}
          placeholder="e.g. Energy better, clothes feeling looser…"
          rows={5}
          className="w-full rounded-2xl px-4 py-3 text-sm text-accent placeholder-accent-muted/50 focus:outline-none focus:ring-1 resize-none"
          style={{
            background: '#0D1424',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        />
      </div>

      <BottomNav />
    </div>
  );
}
