import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: string;
}

/**
 * A premium stat card with subtle border, icon and value hierarchy.
 */
export default function StatCard({ title, value, subtext, icon }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-1"
      style={{
        background: '#0D1424',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        {icon && <span className="text-base">{icon}</span>}
        <span className="text-[11px] font-medium uppercase tracking-wider text-accent-muted">{title}</span>
      </div>
      <span className="text-2xl font-bold text-accent tracking-tight">{value}</span>
      {subtext && (
        <span className="text-[11px] text-accent-muted font-medium">{subtext}</span>
      )}
    </div>
  );
}