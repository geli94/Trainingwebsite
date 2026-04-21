"use client";

import React from 'react';
import TimerControls from '../../components/TimerControls';
import BottomNav from '../../components/BottomNav';

export default function TimerPage() {
  return (
    <div className="px-4 pt-8 pb-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
          Workout Timer
        </p>
        <h1 className="text-2xl font-bold text-accent tracking-tight">Timer</h1>
      </div>

      <p className="text-sm text-accent-muted mb-8 leading-relaxed">
        Use presets for rest periods or select interval mode for treadmill sessions.
      </p>

      <TimerControls />

      <BottomNav />
    </div>
  );
}
