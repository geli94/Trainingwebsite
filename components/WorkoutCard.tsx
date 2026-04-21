import React from 'react';
import Link from 'next/link';
import { WorkoutDay } from '../types';

interface WorkoutCardProps {
  day: WorkoutDay;
  dayIndex: number;
  planId: string;
}

const typeColors: Record<string, string> = {
  strength: '#3B6EAF',
  cardio:   '#3C6E91',
  hiit:     '#2563EB',
  rest:     '#1E2D45',
};

/**
 * Premium workout day card with type badge and duration pill.
 */
export default function WorkoutCard({ day, dayIndex, planId }: WorkoutCardProps) {
  const typeBg = typeColors[day.type] ?? '#1E2D45';
  return (
    <Link
      href={`/workout/${planId}-${day.id}`}
      className="flex justify-between items-center mb-3 rounded-2xl p-4 active:opacity-80 transition-opacity"
      style={{
        background: '#0D1424',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Day number circle */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
          style={{ background: typeBg, color: '#E8EDF5' }}
        >
          {dayIndex + 1}
        </div>
        <div>
          <h3 className="font-semibold text-accent text-[15px] leading-tight">{day.title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-md"
              style={{ background: typeBg + '40', color: '#4A90D9' }}
            >
              {day.type}
            </span>
            <span className="text-[11px] text-accent-muted">{day.duration} min</span>
          </div>
        </div>
      </div>
      {/* Chevron */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-accent-muted flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}