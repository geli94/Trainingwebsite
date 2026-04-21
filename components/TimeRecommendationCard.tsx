import React from 'react';
import { recommendTrainingTime } from '../lib/helpers';
import { UserProfile } from '../types';

interface TimeRecommendationCardProps {
  preferredTime: UserProfile['preferredTime'];
  sessionLength: number;
}

/**
 * Premium card showing recommended training window with a clock icon.
 */
export default function TimeRecommendationCard({ preferredTime, sessionLength }: TimeRecommendationCardProps) {
  const { window, explanation } = recommendTrainingTime(preferredTime, sessionLength);
  return (
    <div
      className="rounded-2xl p-4 mb-4"
      style={{
        background: '#0D1424',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🕐</span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-muted">Best Time to Train</span>
      </div>
      <p className="text-xl font-bold text-accent tracking-tight">{window}</p>
      <p className="text-[12px] text-accent-muted mt-1.5 leading-relaxed">{explanation}</p>
      <p className="text-[11px] text-accent/40 mt-1 italic">
        Consistency beats timing — pick a slot you can show up for every day.
      </p>
    </div>
  );
}