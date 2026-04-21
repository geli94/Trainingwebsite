import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
}

/**
 * A simple card component for displaying a statistic on the dashboard.
 * Use for weekly goals, workouts completed, weight tracking, etc.
 */
export default function StatCard({ title, value, subtext }: StatCardProps) {
  return (
    <div className="bg-background-card rounded-2xl p-4 flex flex-col gap-1 shadow-md">
      <span className="text-sm text-accent/80">{title}</span>
      <span className="text-2xl font-semibold text-primary-light">{value}</span>
      {subtext && <span className="text-xs text-accent/60">{subtext}</span>}
    </div>
  );
}