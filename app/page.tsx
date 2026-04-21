"use client";

import { useLocalStorage } from '../lib/useLocalStorage';
import { UserProfile, WorkoutDay } from '../types';
import { workoutPlans } from '../data/workouts';
import { exercises } from '../data/exercises';
import BottomNav from '../components/BottomNav';
import StatCard from '../components/StatCard';
import TimeRecommendationCard from '../components/TimeRecommendationCard';

export default function DashboardPage() {
  const [profile] = useLocalStorage<UserProfile>('fitstartProfile', {
    goal: 'lose-weight',
    currentWeight: 110,
    height: 185,
    trainingDays: 4,
    preferredTime: 'morning',
    sessionLength: 45,
  });
  const [completedThisWeek] = useLocalStorage<number>('completedThisWeek', 1);
  const [streak] = useLocalStorage<number>('streak', 3);

  const plan = workoutPlans[profile.trainingDays] ?? workoutPlans[4];
  const todayIndex = 0;
  const todayWorkout: WorkoutDay | undefined = plan.days[todayIndex];

  const greetingHour = new Date().getHours();
  const greeting =
    greetingHour < 12 ? 'Good morning' : greetingHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="px-4 pt-8 pb-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
          {greeting} 👋
        </p>
        <h1 className="text-2xl font-bold text-accent tracking-tight">Dashboard</h1>
      </div>

      {/* Hero: Today's Workout */}
      {todayWorkout && (
        <div
          className="rounded-3xl p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, #1A365D 0%, #274472 55%, #3B6EAF 100%)',
            border: '1px solid rgba(74,144,217,0.2)',
            boxShadow: '0 0 30px rgba(74,144,217,0.12)',
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-bright/70 mb-1">
            Today's Workout
          </p>
          <h2 className="text-xl font-bold text-accent mb-1 tracking-tight">{todayWorkout.title}</h2>
          <p className="text-sm text-accent/70 mb-4">
            {todayWorkout.type.charAt(0).toUpperCase() + todayWorkout.type.slice(1)} &nbsp;·&nbsp; {todayWorkout.duration} min
          </p>
          <a
            href={`/workout/${plan.id}-${todayWorkout.id}`}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity active:opacity-75"
            style={{ background: '#E8EDF5', color: '#0D1424' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
            Start Workout
          </a>
        </div>
      )}

      {/* Quick Stats */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-3">
        Your Stats
      </p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard title="Weekly Goal" value={`${profile.trainingDays}×`} icon="🎯" />
        <StatCard title="Completed" value={`${completedThisWeek}`} subtext="This week" icon="✅" />
        <StatCard title="Weight" value={`${profile.currentWeight} kg`} icon="⚖️" />
        <StatCard title="Streak" value={`${streak} days`} icon="🔥" />
      </div>

      {/* Today's Exercise Preview */}
      {todayWorkout && (
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-3">
            Today's Plan
          </p>
          <div className="space-y-2">
            {todayWorkout.exercises.slice(0, 3).map((ex) => {
              const exData = exercises.find((e) => e.id === ex.exerciseId);
              return (
                <div
                  key={ex.exerciseId}
                  className="flex justify-between items-center rounded-xl px-4 py-3"
                  style={{
                    background: '#0D1424',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span className="text-sm font-medium text-accent">{exData?.name}</span>
                  <span className="text-xs text-accent-muted font-mono">
                    {ex.sets}×{ex.reps}
                  </span>
                </div>
              );
            })}
            {todayWorkout.exercises.length > 3 && (
              <p className="text-[11px] text-accent-muted text-center pt-1">
                +{todayWorkout.exercises.length - 3} more exercises
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-3">
          Fat Loss Tips
        </p>
        <div
          className="rounded-2xl p-4 space-y-2"
          style={{
            background: '#0D1424',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {[
            'Start light — form beats weight every time.',
            'Aim for 0.5–1 kg loss per week.',
            'Consistency matters more than perfection.',
            'Combine cardio with strength training.',
          ].map((tip, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-blue-bright/60 mt-0.5 text-xs">▸</span>
              <p className="text-sm text-accent/75 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best time */}
      <TimeRecommendationCard
        preferredTime={profile.preferredTime}
        sessionLength={profile.sessionLength}
      />

      <p className="text-center text-[11px] text-accent/30 mt-2 mb-4">
        Progress is made one workout at a time. You've got this.
      </p>

      <BottomNav />
    </div>
  );
}
