"use client";

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { UserProfile } from '../../types';
import BottomNav from '../../components/BottomNav';

export default function SettingsPage() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [form, setForm] = useState(profile);

  useEffect(() => {
    // Apply dark mode class on mount and when changed
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode]);

  const handleChange = (key: keyof UserProfile, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setProfile(form);
  };

  const handleReset = () => {
    // Clear all localStorage keys used by the app
    localStorage.removeItem('fitstartProfile');
    localStorage.removeItem('startingWeight');
    localStorage.removeItem('completedThisWeek');
    localStorage.removeItem('streak');
    localStorage.removeItem('progressNotes');
    // Refresh page to reinitialize defaults
    window.location.reload();
  };

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-xl font-semibold text-primary-light mb-4">Settings</h1>
      <div className="space-y-4">
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
        {/* Dark mode toggle */}
        <div className="flex items-center justify-between">
          <label className="text-xs">Dark Mode</label>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full relative ${darkMode ? 'bg-primary-light' : 'bg-background-light'}`}
          >
            <span
              className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-accent transition-all ${
                darkMode ? 'right-1' : 'left-1'
              }`}
            ></span>
          </button>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-primary rounded-2xl py-3 text-accent font-semibold"
        >
          Save Changes
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-background-light rounded-2xl py-3 text-accent font-semibold mt-2"
        >
          Reset All Data
        </button>
      </div>
      <BottomNav />
    </div>
  );
}