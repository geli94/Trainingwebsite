import React from 'react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
}

/**
 * Displays details of a gym exercise for beginners. Includes an icon placeholder,
 * category, primary muscles worked, instructions, and beginner tips.
 */
export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="bg-background-card rounded-2xl p-4 shadow-md mb-4 flex gap-4">
      {/* Placeholder for exercise icon */}
      <div className="flex-shrink-0 w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center text-background font-bold">
        {exercise.name.charAt(0)}
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-accent">{exercise.name}</h3>
        <p className="text-xs text-accent/70 mb-1 capitalize">
          {exercise.category} • {exercise.primaryMuscles}
        </p>
        <p className="text-sm text-accent/80 mb-2">{exercise.instructions}</p>
        <p className="text-xs italic text-accent/60">Beginner tip: {exercise.beginnerTip}</p>
      </div>
    </div>
  );
}