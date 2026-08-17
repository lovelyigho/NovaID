'use client';

import React from 'react';
import { StatusPill, PillVariant } from './StatusPill';

interface MetricTileProps {
  label: string;
  value: string | number;
  note?: string;
  noteVariant?: PillVariant;
  icon?: React.ReactNode;
}

export function MetricTile({ label, value, note, noteVariant = 'neutral', icon }: MetricTileProps) {
  return (
    <div className="metric-tile">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>
          {label}
        </span>
        {icon && <div style={{ opacity: 0.7 }}>{icon}</div>}
      </div>

      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 500, letterSpacing: '-0.3px', color: 'var(--ink)' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>

      {note && (
        <div style={{ marginTop: '2px' }}>
          <StatusPill label={note} variant={noteVariant} showDot={false} />
        </div>
      )}
    </div>
  );
}
