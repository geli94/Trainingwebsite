"use client";

import React from 'react';
import TimerControls from '../../components/TimerControls';
import BottomNav from '../../components/BottomNav';

export default function TimerPage() {
  return (
    <div className="pb-24 px-4 pt-6 flex flex-col items-center">
      <h1 className="text-xl font-semibold text-primary-light mb-4">Timer</h1>
      <p className="text-sm text-accent/60 text-center mb-4">
        Use the timer for your workouts, rest periods and cardio sessions. Select a preset or choose interval mode for treadmill sessions.
      </p>
      <TimerControls />
      <BottomNav />
    </div>
  );
}