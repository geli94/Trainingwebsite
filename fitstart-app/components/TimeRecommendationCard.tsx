import React from 'react';
import { recommendTrainingTime } from '../lib/helpers';
import { UserProfile } from '../types';

interface TimeRecommendationCardProps {
  preferredTime: UserProfile['preferredTime'];
  sessionLength: number;
}

/**
 * Displays the recommended training time window based on the user's preference
 * and session duration. Uses the helper function to compute the recommendation.
 */
export default function TimeRecommendationCard({ preferredTime, sessionLength }: TimeRecommendationCardProps) {
  const { window, explanation } = recommendTrainingTime(preferredTime, sessionLength);
  return (
    <div className="bg-background-card rounded-2xl p-4 shadow-md mb-4">
      <h3 className="text-sm text-accent/80 mb-2">Best Time to Train</h3>
      <p className="text-xl font-semibold text-primary-light">{window}</p>
      <p className="text-xs text-accent/60 mt-1">
        The best time to train is the one you can repeat consistently.
      </p>
      <p className="text-xs text-accent/60 mt-1">{explanation}</p>
    </div>
  );
}