import './globals.css';
import type { Metadata, Viewport } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'FitStart – Personal Fitness Assistant',
  description: 'A mobile-first fitness app for beginners focusing on weight loss and gym guidance.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans min-h-screen bg-background text-accent antialiased">
        {/* Mobile-only container — max-width keeps it phone-shaped on desktop */}
        <div className="mx-auto max-w-md min-h-screen relative bg-background">
          <div className="pb-20">{children}</div>
        </div>
      </body>
    </html>
  );
}