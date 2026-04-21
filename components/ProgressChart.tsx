import React from 'react';

interface ProgressChartProps {
  completed: number;
  planned: number;
}

/**
 * Premium weekly progress indicator — thin pill segments with gradient fill for completed days.
 */
export default function ProgressChart({ completed, planned }: ProgressChartProps) {
  const segments = Array.from({ length: planned }, (_, i) => i < completed);
  return (
    <div className="flex gap-1.5 mt-2">
      {segments.map((isDone, idx) => (
        <div
          key={idx}
          className="flex-1 h-2 rounded-full transition-all duration-500"
          style={
            isDone
              ? { background: 'linear-gradient(90deg, #4A90D9, #3B6EAF)' }
              : { background: '#1E2D45' }
          }
        />
      ))}
    </div>
  );
}