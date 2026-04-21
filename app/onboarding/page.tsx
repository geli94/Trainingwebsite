"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { UserProfile } from '../../types';

const steps = ['Weight', 'Training', 'Schedule'];

const inputStyle = {
  background: '#0D1424',
  border: '1px solid rgba(255,255,255,0.07)',
  color: '#E8EDF5',
};

export default function OnboardingPage() {
  const router = useRouter();
  const [, setProfile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  const [form, setForm] = useState<UserProfile>({
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  const [step, setStep] = useState(0);

  const handleChange = (key: keyof UserProfile, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    router.push('/');
  };

  const sharedInputClass =
    'w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-DEFAULT/50';

  return (
    <div className="flex flex-col min-h-screen px-6 pt-16 pb-8" style={{ background: '#070C18' }}>
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-accent tracking-tight mb-1">FitStart</h1>
        <p className="text-sm text-accent-muted">Simple gym guidance for fat loss</p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
          <div
            key={s}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{
              background:
                i <= step
                  ? 'linear-gradient(90deg, #3B6EAF, #4A90D9)'
                  : '#1E2D45',
            }}
          />
        ))}
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
        Step {step + 1} of {steps.length}
      </p>
      <p className="text-xl font-bold text-accent mb-6">{steps[step]}</p>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-5">
        {/* Step 0: Weight */}
        {step === 0 && (
          <>
            <div>
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
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-accent-muted mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={form.height}
                onChange={(e) => handleChange('height', Number(e.target.value))}
                className={sharedInputClass}
                style={inputStyle}
                min={100}
                max={250}
              />
            </div>
          </>
        )}

        {/* Step 1: Training */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-accent-muted mb-2">
                Training Days Per Week
              </label>
              <div className="flex gap-2">
                {[3, 4, 5].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleChange('trainingDays', d)}
                    className="flex-1 py-4 rounded-2xl text-sm font-bold transition-all active:opacity-70"
                    style={
                      form.trainingDays === d
                        ? {
                            background: 'linear-gradient(135deg, #3B6EAF, #4A90D9)',
                            color: '#E8EDF5',
                            boxShadow: '0 0 12px rgba(74,144,217,0.35)',
                          }
                        : {
                            background: '#0D1424',
                            color: '#64748B',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }
                    }
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Schedule */}
        {step === 2 && (
          <>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-accent-muted mb-2">
                Preferred Workout Time
              </label>
              <div className="flex flex-col gap-2">
                {(['morning', 'afternoon', 'evening'] as const).map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleChange('preferredTime', time)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-left transition-all active:opacity-70"
                    style={
                      form.preferredTime === time
                        ? {
                            background: 'rgba(59,110,175,0.2)',
                            color: '#4A90D9',
                            border: '1px solid rgba(74,144,217,0.4)',
                          }
                        : {
                            background: '#0D1424',
                            color: '#64748B',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }
                    }
                  >
                    <span>{time === 'morning' ? '🌅' : time === 'afternoon' ? '☀️' : '🌙'}</span>
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
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
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-auto">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-2xl py-4 text-sm font-semibold transition-opacity active:opacity-70"
              style={{ background: '#0D1424', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 rounded-2xl py-4 text-sm font-bold transition-opacity active:opacity-75"
              style={{
                background: 'linear-gradient(135deg, #3B6EAF, #4A90D9)',
                color: '#E8EDF5',
                boxShadow: '0 0 16px rgba(74,144,217,0.3)',
              }}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 rounded-2xl py-4 text-sm font-bold transition-opacity active:opacity-75"
              style={{
                background: 'linear-gradient(135deg, #3B6EAF, #4A90D9)',
                color: '#E8EDF5',
                boxShadow: '0 0 16px rgba(74,144,217,0.3)',
              }}
            >
              Get Started 🚀
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
