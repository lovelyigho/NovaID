'use client';

import React from 'react';

export type PillVariant = 'success' | 'accent' | 'attention' | 'critical' | 'neutral';

interface StatusPillProps {
  label: string;
  variant?: PillVariant;
  showDot?: boolean;
}

export function StatusPill({ label, variant = 'neutral', showDot = true }: StatusPillProps) {
  return (
    <span className={`pill pill-${variant}`}>
      {showDot && <span className="pill-dot" />}
      <span>{label}</span>
    </span>
  );
}
