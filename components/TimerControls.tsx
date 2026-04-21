import React, { useEffect, useState } from 'react';

/**
 * Premium timer component with a large circular clock face.
 * Provides start, pause and reset controls plus presets and interval mode.
 */
export default function TimerControls() {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [running, setRunning] = useState(false);

  // Interval timer config: [warmUp, work, coolDown] in minutes
  const intervalConfig = [5, 20, 5];
  const [intervalPhase, setIntervalPhase] = useState<0 | 1 | 2>(0);
  const phaseLabels = ['Warm‑up', 'Incline Walk', 'Cool Down'];

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

  // setPreset accepts duration in seconds
  const setPreset = (secs: number) => {
    setSecondsRemaining(secs);
    setRunning(false);
    setIntervalPhase(0);
  };

  const startInterval = () => {
    setSecondsRemaining(intervalConfig[0] * 60);
    setIntervalPhase(0);
    setRunning(true);
  };

  // Switch interval phases as time expires
  useEffect(() => {
    if (!running || secondsRemaining > 0) return;
    const nextPhase = (intervalPhase + 1) as 0 | 1 | 2;
    if (nextPhase < intervalConfig.length) {
      setIntervalPhase(nextPhase);
      setSecondsRemaining(intervalConfig[nextPhase] * 60);
    }
  }, [secondsRemaining, running, intervalPhase]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Clock face */}
      <div
        className="w-52 h-52 rounded-full flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #131F35, #0D1424)',
          border: '2px solid rgba(74,144,217,0.2)',
          boxShadow: running
            ? '0 0 40px rgba(74,144,217,0.3), inset 0 0 30px rgba(74,144,217,0.05)'
            : '0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        <span
          className="text-5xl font-bold tracking-tighter tabular-nums"
          style={{ color: running ? '#60A5FA' : '#E8EDF5' }}
        >
          {formatTime(secondsRemaining)}
        </span>
        {running && intervalPhase !== undefined && (
          <span className="text-[11px] text-accent-muted mt-1 font-medium">
            {phaseLabels[intervalPhase]}
          </span>
        )}
        {secondsRemaining === 0 && !running && (
          <span className="text-[11px] text-accent/30 mt-1">Set a preset</span>
        )}
      </div>

      {/* Main controls */}
      <div className="flex gap-3 w-full">
        <button
          onClick={pauseTimer}
          className="flex-1 rounded-2xl py-3 text-sm font-semibold transition-opacity active:opacity-70"
          style={{ background: '#1E2D45', color: '#E8EDF5' }}
        >
          Pause
        </button>
        <button
          onClick={startTimer}
          className="flex-[2] rounded-2xl py-3 text-sm font-bold transition-opacity active:opacity-70"
          style={{
            background: 'linear-gradient(135deg, #3B6EAF, #4A90D9)',
            color: '#E8EDF5',
            boxShadow: '0 0 16px rgba(74,144,217,0.35)',
          }}
        >
          Start
        </button>
        <button
          onClick={resetTimer}
          className="flex-1 rounded-2xl py-3 text-sm font-semibold transition-opacity active:opacity-70"
          style={{ background: '#1E2D45', color: '#E8EDF5' }}
        >
          Reset
        </button>
      </div>

      {/* Rest presets */}
      <div className="w-full">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-2">
          Rest Presets
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[30, 45, 60, 90].map((t) => (
            <button
              key={`rest-${t}`}
              className="rounded-xl py-2.5 text-xs font-semibold transition-opacity active:opacity-70"
              style={{ background: '#0D1424', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setPreset(t)}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      {/* Cardio presets */}
      <div className="w-full">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-2">
          Cardio Presets
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[10, 20, 30].map((t) => (
            <button
              key={`cardio-${t}`}
              className="rounded-xl py-2.5 text-xs font-semibold transition-opacity active:opacity-70"
              style={{ background: '#0D1424', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setPreset(t * 60)}
            >
              {t} min
            </button>
          ))}
        </div>
      </div>

      {/* Interval mode */}
      <button
        className="w-full rounded-2xl py-3.5 text-sm font-bold transition-opacity active:opacity-70"
        style={{
          background: '#131F35',
          color: '#4A90D9',
          border: '1px solid rgba(74,144,217,0.25)',
        }}
        onClick={startInterval}
      >
        Start Interval Mode (5 / 20 / 5)
      </button>
      <p className="text-[11px] text-accent/30 text-center -mt-3">
        5 min warm‑up · 20 min incline walk · 5 min cool down
      </p>
    </div>
  );
}
