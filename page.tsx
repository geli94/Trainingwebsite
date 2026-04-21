"use client";

import React from 'react';
import { exercises } from '../../data/exercises';
import ExerciseCard from '../../components/ExerciseCard';
import BottomNav from '../../components/BottomNav';

export default function ExercisesPage() {
  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-xl font-semibold text-primary-light mb-4">Exercises</h1>
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
      <BottomNav />
    </div>
  );
}