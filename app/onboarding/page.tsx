"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { UserProfile } from '../../types';

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  // Local state to update form values before saving
  const [form, setForm] = useState(profile);

  const handleChange = (key: keyof UserProfile, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-6 min-h-screen text-accent bg-background">
      <h1 className="text-3xl font-bold text-primary-light mb-2">FitStart</h1>
      <p className="text-sm text-accent/60 mb-6">Simple gym guidance for fat loss</p>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Goal (hidden for now, preselected) */}
        <input type="hidden" value={form.goal} />
        {/* Current weight */}
        <div>
          <label className="block text-xs mb-1">Current Weight (kg)</label>
          <input
            type="number"
            value={form.currentWeight}
            onChange={(e) => handleChange('currentWeight', Number(e.target.value))}
            className="w-full rounded-lg px-3 py-2 bg-background-light text-accent focus:outline-none focus:ring-2 focus:ring-primary"
            min={30}
            max={300}
          />
        </div>
        {/* Height */}
        <div>
          <label className="block text-xs mb-1">Height (cm)</label>
          <input
            type="number"
            value={form.height}
            onChange={(e) => handleChange('height', Number(e.target.value))}
            className="w-full rounded-lg px-3 py-2 bg-background-light text-accent focus:outline-none focus:ring-2 focus:ring-primary"
            min={100}
            max={250}
          />
        </div>
        {/* Training days per week */}
        <div>
          <label className="block text-xs mb-1">Training Days Per Week</label>
          <select
            value={form.trainingDays}
            onChange={(e) => handleChange('trainingDays', Number(e.target.value))}
            className="w-full rounded-lg px-3 py-2 bg-background-light text-accent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[3, 4, 5].map((d) => (
              <option key={d} value={d}>
                {d} days
              </option>
            ))}
          </select>
        </div>
        {/* Preferred time */}
        <div>
          <label className="block text-xs mb-1">Preferred Workout Time</label>
          <select
            value={form.preferredTime}
            onChange={(e) => handleChange('preferredTime', e.target.value as UserProfile['preferredTime'])}
            className="w-full rounded-lg px-3 py-2 bg-background-light text-accent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {['morning', 'afternoon', 'evening'].map((time) => (
              <option key={time} value={time}>
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {/* Session length */}
        <div>
          <label className="block text-xs mb-1">Session Length</label>
          <select
            value={form.sessionLength}
            onChange={(e) => handleChange('sessionLength', Number(e.target.value))}
            className="w-full rounded-lg px-3 py-2 bg-background-light text-accent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[30, 45, 60, 75].map((mins) => (
              <option key={mins} value={mins}>
                {mins} minutes
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-primary rounded-2xl py-3 text-accent font-semibold hover:bg-primary-dark transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}