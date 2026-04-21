import React from 'react';

interface ProgressChartProps {
  completed: number;
  planned: number;
}

/**
 * Simple progress bar illustrating the number of workouts completed out of the planned
 * training days. This chart shows one segment per training day, with completed
 * segments highlighted.
 */
export default function ProgressChart({ completed, planned }: ProgressChartProps) {
  const segments = Array.from({ length: planned }, (_, i) => i < completed);
  return (
    <div className="flex gap-2 mt-2">
      {segments.map((isDone, idx) => (
        <div
          key={idx}
          className={
            'flex-1 h-4 rounded-full ' + (isDone ? 'bg-primary-light' : 'bg-background-light')
          }
        ></div>
      ))}
    </div>
  );
}