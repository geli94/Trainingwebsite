import React from 'react';
import Link from 'next/link';
import { WorkoutDay } from '../types';

interface WorkoutCardProps {
  day: WorkoutDay;
  dayIndex: number;
  planId: string;
}

/**
 * Displays a summary of a workout day. Navigates to the detail page when clicked.
 */
export default function WorkoutCard({ day, dayIndex, planId }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${planId}-${day.id}`}
      className="bg-background-card rounded-2xl p-4 shadow-md flex justify-between items-center mb-3"
    >
      <div>
        <h3 className="text-lg font-semibold text-accent">
          Day {dayIndex + 1}: {day.title}
        </h3>
        <p className="text-sm text-accent/70 capitalize">
          {day.type} • {day.duration} min
        </p>
      </div>
      <span className="text-primary-light text-sm">&gt;</span>
    </Link>
  );
}