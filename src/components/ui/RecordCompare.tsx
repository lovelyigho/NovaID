'use client';

import React from 'react';
import { StatusPill } from './StatusPill';

export interface CompareField {
  label: string;
  leftValue: string;
  rightValue: string;
  isMatch?: boolean;
  isMono?: boolean;
}

interface RecordCompareProps {
  leftTitle: string;
  rightTitle: string;
  fields: CompareField[];
  overallMatchScore?: number;
  confidenceTier?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export function RecordCompare({
  leftTitle,
  rightTitle,
  fields,
  overallMatchScore,
  confidenceTier
}: RecordCompareProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(20, 60, 70, 0.1)' }}>
        <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
          <div style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
            {leftTitle}
          </div>
          <div style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
            {rightTitle}
          </div>
        </div>

        {overallMatchScore !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>Biometric & Demographic Score:</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: 'var(--accent)' }}>
              {overallMatchScore}%
            </span>
            {confidenceTier && (
              <StatusPill
                label={`${confidenceTier} Confidence`}
                variant={confidenceTier === 'HIGH' ? 'critical' : confidenceTier === 'MEDIUM' ? 'attention' : 'accent'}
              />
            )}
          </div>
        )}
      </div>

      {/* Field Comparison Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {fields.map((field, idx) => {
          const isDifferent = field.isMatch === false || field.leftValue !== field.rightValue;
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 1fr',
                gap: '16px',
                padding: '10px 14px',
                borderRadius: '11px',
                background: isDifferent ? 'var(--attention-tint)' : 'rgba(255, 255, 255, 0.6)',
                border: isDifferent ? '1px solid rgba(201, 138, 30, 0.3)' : '1px solid rgba(20, 60, 70, 0.06)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ fontSize: '11.5px', fontWeight: 500, color: isDifferent ? 'var(--attention-deep)' : 'var(--ink-label)' }}>
                {field.label}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--ink)', fontFamily: field.isMono ? 'var(--font-mono)' : 'inherit' }}>
                {field.leftValue || '—'}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  fontWeight: isDifferent ? 600 : 400,
                  color: isDifferent ? 'var(--attention-deep)' : 'var(--ink)',
                  fontFamily: field.isMono ? 'var(--font-mono)' : 'inherit'
                }}
              >
                {field.rightValue || '—'}
                {isDifferent && (
                  <span style={{ marginLeft: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--attention-deep)' }}>
                    (Differs)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
