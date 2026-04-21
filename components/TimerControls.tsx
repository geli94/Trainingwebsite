import React, { useEffect, useState } from 'react';

/**
 * A versatile timer component with presets for rest, cardio and interval workouts.
 * It provides start, pause and reset controls. Timers count down from the
 * selected preset and stop at zero. This component is intentionally
 * self‑contained so it can be used on the timer page.
 */
export default function TimerControls() {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [running, setRunning] = useState(false);

  // Interval timer config: [warmUp, work, coolDown] in minutes
  const intervalConfig = [5, 20, 5];
  const [intervalPhase, setIntervalPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!running) return;
    if (secondsRemaining <= 0) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => {
      setSecondsRemaining((s) => s - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [running, secondsRemaining]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (secondsRemaining > 0) setRunning(true);
  };
  const pauseTimer = () => setRunning(false);
  const resetTimer = () => {
    setRunning(false);
    setSecondsRemaining(0);
    setIntervalPhase(0);
  };

  // Presets for rest and cardio timers
  const setPreset = (mins: number) => {
    setSecondsRemaining(mins * 60);
    setRunning(false);
    setIntervalPhase(0);
  };

  // Start interval mode
  const startInterval = () => {
    const firstPhaseDuration = intervalConfig[0] * 60;
    setSecondsRemaining(firstPhaseDuration);
    setIntervalPhase(0);
    setRunning(true);
  };

  // Switch interval phases as time expires
  useEffect(() => {
    if (!running || secondsRemaining > 0) return;
    // Move to next phase if available
    const nextPhase = (intervalPhase + 1) as 0 | 1 | 2;
    if (nextPhase < intervalConfig.length) {
      setIntervalPhase(nextPhase);
      setSecondsRemaining(intervalConfig[nextPhase] * 60);
    }
  }, [secondsRemaining, running, intervalPhase]);

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      {/* Timer display */}
      <div className="text-5xl font-bold text-primary-light">
        {formatTime(secondsRemaining)}
      </div>
      {/* Controls */}
      <div className="flex gap-4">
        <button
          className="bg-primary rounded-full px-4 py-2 text-accent font-medium"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="bg-secondary rounded-full px-4 py-2 text-accent font-medium"
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button
          className="bg-background-light rounded-full px-4 py-2 text-accent font-medium"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      {/* Preset buttons */}
      <div className="w-full grid grid-cols-4 gap-2 mt-4">
        {[30, 45, 60, 90].map((t) => (
          <button
            key={`rest-${t}`}
            className="bg-background-light rounded-lg px-2 py-1 text-xs text-accent hover:bg-primary-light/30"
            onClick={() => setPreset(t)}
          >
            Rest {t}s
          </button>
        ))}
      </div>
      <div className="w-full grid grid-cols-3 gap-2 mt-2">
        {[10, 20, 30].map((t) => (
          <button
            key={`cardio-${t}`}
            className="bg-background-light rounded-lg px-2 py-1 text-xs text-accent hover:bg-primary-light/30"
            onClick={() => setPreset(t * 60)}
          >
            Cardio {t}m
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-primary rounded-xl px-4 py-2 text-accent font-medium"
        onClick={startInterval}
      >
        Start Interval (5/20/5)
      </button>
      {/* Explanation note for the interval timer */}
      <p className="text-xs text-accent/60 mt-2 max-w-xs text-center">
        Interval mode: 5 min warm‑up, 20 min incline walk, 5 min cool down.
      </p>
    </div>
  );
}
