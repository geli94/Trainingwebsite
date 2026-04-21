import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'FitStart - Personal Fitness Assistant',
  description: 'A mobile-first fitness app for beginners focusing on weight loss and gym guidance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        {/* Container ensures bottom navigation doesn't overlap content */}
        <div className="min-h-screen pb-24">{children}</div>
      </body>
    </html>
  );
}