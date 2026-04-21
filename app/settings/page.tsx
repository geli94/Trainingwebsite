"use client";

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { UserProfile } from '../../types';
import BottomNav from '../../components/BottomNav';

const inputStyle = {
  background: '#0D1424',
  border: '1px solid rgba(255,255,255,0.07)',
  color: '#E8EDF5',
};

export default function SettingsPage() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  // Keep form in sync if profile is loaded from localStorage after mount
  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleChange = (key: keyof UserProfile, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem('fitstartProfile');
    localStorage.removeItem('startingWeight');
    localStorage.removeItem('completedThisWeek');
    localStorage.removeItem('streak');
    localStorage.removeItem('progressNotes');
    window.location.reload();
  };

  const sharedInputClass =
    'w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-DEFAULT/50 transition-colors';

  return (
    <div className="px-4 pt-8 pb-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
          Preferences
        </p>
        <h1 className="text-2xl font-bold text-accent tracking-tight">Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Profile section */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-3">
            Profile
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Current weight */}
            <div
              className="px-4 py-4"
              style={{ background: '#0D1424', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-accent-muted mb-2">
                Current Weight (kg)
              </label>
              <input
                type="number"
                value={form.currentWeight}
                onChange={(e) => handleChange('currentWeight', Number(e.target.value))}
                className={sharedInputClass}
                style={inputStyle}
                min={30}
                max={300}
              />
            </div>

            {/* Training days */}
            <div
              className="px-4 py-4"
              style={{ background: '#0D1424', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-accent-muted mb-2">
                Training Days Per Week
              </label>
              <select
                value={form.trainingDays}
                onChange={(e) => handleChange('trainingDays', Number(e.target.value))}
                className={sharedInputClass}
                style={inputStyle}
              >
                {[3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred time */}
            <div
              className="px-4 py-4"
              style={{ background: '#0D1424', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-accent-muted mb-2">
                Preferred Workout Time
              </label>
              <select
                value={form.preferredTime}
                onChange={(e) =>
                  handleChange('preferredTime', e.target.value as UserProfile['preferredTime'])
                }
                className={sharedInputClass}
                style={inputStyle}
              >
                {['morning', 'afternoon', 'evening'].map((time) => (
                  <option key={time} value={time}>
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Session length */}
            <div className="px-4 py-4" style={{ background: '#0D1424' }}>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-accent-muted mb-2">
                Session Length
              </label>
              <select
                value={form.sessionLength}
                onChange={(e) => handleChange('sessionLength', Number(e.target.value))}
                className={sharedInputClass}
                style={inputStyle}
              >
                {[30, 45, 60, 75].map((mins) => (
                  <option key={mins} value={mins}>
                    {mins} minutes
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            className="w-full rounded-2xl py-4 text-sm font-bold transition-all active:opacity-80"
            style={{
              background: saved
                ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                : 'linear-gradient(135deg, #3B6EAF, #4A90D9)',
              color: '#E8EDF5',
              boxShadow: saved
                ? '0 0 16px rgba(34,197,94,0.3)'
                : '0 0 16px rgba(74,144,217,0.3)',
            }}
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>

          <button
            onClick={handleReset}
            className="w-full rounded-2xl py-4 text-sm font-semibold transition-opacity active:opacity-70"
            style={{
              background: '#0D1424',
              color: '#64748B',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            Reset All Data
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
