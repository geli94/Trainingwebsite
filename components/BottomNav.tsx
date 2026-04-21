"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: (active: boolean) => JSX.Element;
}

const HomeIcon = (active: boolean) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.75} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 12.75l9.75-9.75 9.75 9.75M4.5 11.25v7.5A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75v-7.5" />
  </svg>
);

const PlanIcon = (active: boolean) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.75} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const DumbbellIcon = (active: boolean) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.75} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M5.25 9.75h3v4.5h-3v-4.5zm10.5 0h3v4.5h-3v-4.5zM2.25 11.25h3v1.5h-3v-1.5zm16.5 0h3v1.5h-3v-1.5zM8.25 9.75h7.5v4.5h-7.5v-4.5z" />
  </svg>
);

const ProgressIcon = (active: boolean) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.75} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const TimerIcon = (active: boolean) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.75} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const navItems: NavItem[] = [
  { href: '/',           label: 'Home',      icon: HomeIcon },
  { href: '/plan',       label: 'Plan',      icon: PlanIcon },
  { href: '/exercises',  label: 'Exercises', icon: DumbbellIcon },
  { href: '/progress',   label: 'Progress',  icon: ProgressIcon },
  { href: '/timer',      label: 'Timer',     icon: TimerIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md"
      style={{
        background: 'rgba(7,12,24,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex justify-around items-end pt-2 pb-3 px-2">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 min-w-[48px] relative"
            >
              {/* Active indicator dot */}
              {active && (
                <span
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#4A90D9' }}
                />
              )}
              <span
                className="transition-colors duration-200"
                style={{ color: active ? '#4A90D9' : '#4A5568' }}
              >
                {icon(active)}
              </span>
              <span
                className="text-[10px] font-medium tracking-wide transition-colors duration-200"
                style={{ color: active ? '#4A90D9' : '#4A5568' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}