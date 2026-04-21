"use client";

import React from 'react';
import { exercises } from '../../data/exercises';
import ExerciseCard from '../../components/ExerciseCard';
import BottomNav from '../../components/BottomNav';

export default function ExercisesPage() {
  return (
    <div className="px-4 pt-8 pb-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
          Library
        </p>
        <h1 className="text-2xl font-bold text-accent tracking-tight">Exercises</h1>
      </div>

      {exercises.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🏋️</span>
          <p className="text-accent font-semibold text-lg mb-1">No exercises found</p>
          <p className="text-sm text-accent-muted">Check back soon — the library is being built.</p>
        </div>
      ) : (
        <div>
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
