import React from 'react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
}

const categoryColors: Record<string, string> = {
  strength:   '#3B6EAF',
  cardio:     '#3C6E91',
  flexibility:'#1A5276',
  core:       '#1B4F72',
};

/**
 * Premium exercise card with gradient avatar, category chip and collapsible tip.
 */
export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const avatarColor = categoryColors[exercise.category] ?? '#1E2D45';
  return (
    <div
      className="rounded-2xl p-4 mb-3 flex gap-3"
      style={{
        background: '#0D1424',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
      }}
    >
      {/* Gradient avatar */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg"
        style={{
          background: `linear-gradient(135deg, ${avatarColor} 0%, #3B6EAF 100%)`,
          color: '#E8EDF5',
        }}
      >
        {exercise.name.charAt(0)}
      </div>
      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-accent text-[15px] leading-tight">{exercise.name}</h3>
          {/* Category chip */}
          <span
            className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: avatarColor + '40', color: '#4A90D9' }}
          >
            {exercise.category}
          </span>
        </div>
        <p className="text-[11px] text-accent-muted mt-0.5 mb-2 capitalize">{exercise.primaryMuscles}</p>
        <p className="text-sm text-accent/80 leading-relaxed mb-2">{exercise.instructions}</p>
        <div
          className="flex items-start gap-1.5 rounded-xl px-3 py-2"
          style={{ background: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.15)' }}
        >
          <span className="text-blue-bright text-xs mt-0.5">💡</span>
          <p className="text-[11px] text-accent/60 italic leading-relaxed">{exercise.beginnerTip}</p>
        </div>
      </div>
    </div>
  );
}