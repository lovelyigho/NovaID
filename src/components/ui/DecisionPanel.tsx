'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export interface DecisionOption {
  value: string;
  label: string;
  description: string;
  variant: 'success' | 'attention' | 'critical' | 'neutral';
  requiresRationale?: boolean;
}

interface DecisionPanelProps {
  title?: string;
  options: DecisionOption[];
  onSubmit: (decision: string, rationale: string) => void;
  gateNote?: string;
  isAllowed?: boolean;
  disallowedReason?: string;
}

export function DecisionPanel({
  title = 'Officer Decision & Recommendation',
  options,
  onSubmit,
  gateNote,
  isAllowed = true,
  disallowedReason
}: DecisionPanelProps) {
  const [selectedDecision, setSelectedDecision] = useState<string>('');
  const [rationale, setRationale] = useState<string>('');

  const currentOption = options.find(o => o.value === selectedDecision);
  const isRationaleRequired = currentOption?.requiresRationale !== false;
  const isValid = selectedDecision !== '' && (!isRationaleRequired || rationale.trim().length >= 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && isAllowed) {
      onSubmit(selectedDecision, rationale);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
        {title}
      </div>

      {!isAllowed && disallowedReason && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: '12px',
            background: 'var(--critical-tint)',
            border: '1px solid rgba(176, 69, 69, 0.3)',
            color: 'var(--critical-deep)',
            fontSize: '12.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <AlertCircle size={18} color="var(--critical)" />
          <span>{disallowedReason}</span>
        </div>
      )}

      {gateNote && isAllowed && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: '12px',
            background: 'var(--accent-tint)',
            border: '1px solid rgba(31, 138, 134, 0.25)',
            color: 'var(--accent-deep)',
            fontSize: '12px',
            lineHeight: 1.5
          }}
        >
          {gateNote}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Radio Option Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {options.map((option) => {
            const isSelected = selectedDecision === option.value;
            const borderColors = {
              success: 'var(--success)',
              attention: 'var(--attention)',
              critical: 'var(--critical)',
              neutral: 'var(--accent)'
            };

            return (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: isSelected ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.65)',
                  border: isSelected ? `2px solid ${borderColors[option.variant]}` : '1px solid rgba(20, 60, 70, 0.1)',
                  cursor: isAllowed ? 'pointer' : 'not-allowed',
                  opacity: isAllowed ? 1 : 0.6,
                  transition: 'all 0.15s ease'
                }}
              >
                <input
                  type="radio"
                  name="decision"
                  value={option.value}
                  checked={isSelected}
                  disabled={!isAllowed}
                  onChange={(e) => setSelectedDecision(e.target.value)}
                  style={{ marginTop: '3px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                    {option.description}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Mandatory Rationale Input */}
        {selectedDecision && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>
              Documented Rationale &amp; Audit Justification {isRationaleRequired && <span style={{ color: 'var(--critical)' }}>* (Min 10 characters)</span>}
            </label>
            <textarea
              rows={3}
              value={rationale}
              disabled={!isAllowed}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Enter official reason, verified evidence references, and legal basis for this decision..."
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button
            type="submit"
            disabled={!isValid || !isAllowed}
            className="btn-primary"
            style={{
              opacity: isValid && isAllowed ? 1 : 0.45,
              cursor: isValid && isAllowed ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle2 size={16} />
            <span>Confirm &amp; Record Official Decision</span>
          </button>
        </div>
      </form>
    </div>
  );
}
