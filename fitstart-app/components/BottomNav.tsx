import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

// Simple SVG icons. You could replace these with a proper icon library later.
const HomeIcon = (active: boolean) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9.75L12 3l9 6.75v9.75a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5V9.75z"
    />
  </svg>
);
const PlanIcon = (active: boolean) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6h12M6 12h12M6 18h12"
    />
  </svg>
);
const DumbbellIcon = (active: boolean) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 9.75h3v4.5h-3v-4.5zm16.5 0h3v4.5h-3v-4.5zm-14.25 0h12.75v4.5H4.5v-4.5z"
    />
  </svg>
);
const ProgressIcon = (active: boolean) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3v18h18"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 16l3-3 2 2 4-4 3 3"
    />
  </svg>
);
const TimerIcon = (active: boolean) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6l4 2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.75c-5.522 0-10 4.477-10 10 0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10z"
    />
  </svg>
);

export default function BottomNav() {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: '/', label: 'Home', icon: HomeIcon(false) },
    { href: '/plan', label: 'Plan', icon: PlanIcon(false) },
    { href: '/exercises', label: 'Exercises', icon: DumbbellIcon(false) },
    { href: '/progress', label: 'Progress', icon: ProgressIcon(false) },
    { href: '/timer', label: 'Timer', icon: TimerIcon(false) },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-card border-t border-background-light">
      <div className="flex justify-around py-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 text-xs"
            >
              <span
                className={
                  active
                    ? 'text-primary' // active color
                    : 'text-accent/70'
                }
              >
                {/* re-render icon with active state not necessary for simple SVGs */}
                {item.icon}
              </span>
              <span className={active ? 'text-primary font-medium' : 'text-accent/70'}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}