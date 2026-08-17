'use client';

import React from 'react';
import { StatusPill, PillVariant } from './StatusPill';

export interface QueueItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  status: string;
  statusVariant: PillVariant;
  isHighRisk?: boolean;
  isLate?: boolean;
  ageDays?: number;
}

interface QueueListProps {
  items: QueueItem[];
  selectedId?: string;
  onSelectItem: (id: string) => void;
  filterChips?: { label: string; count: number; active: boolean; onClick: () => void }[];
}

export function QueueList({ items, selectedId, onSelectItem, filterChips }: QueueListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Filter Chips */}
      {filterChips && filterChips.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingBottom: '4px' }}>
          {filterChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={chip.onClick}
              style={{
                padding: '5px 11px',
                borderRadius: '20px',
                fontSize: '11.5px',
                fontWeight: chip.active ? 600 : 400,
                background: chip.active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.8)',
                color: chip.active ? '#ffffff' : 'var(--ink-muted)',
                boxShadow: chip.active ? '0 4px 12px rgba(31, 138, 134, 0.3)' : 'inset 0 0 0 1px rgba(20, 60, 70, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{chip.label}</span>
              <span
                style={{
                  fontSize: '10.5px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: chip.active ? 'rgba(255, 255, 255, 0.25)' : 'rgba(20, 60, 70, 0.08)',
                  color: chip.active ? '#ffffff' : 'var(--ink-label)'
                }}
              >
                {chip.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Item List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
        {items.length === 0 ? (
          <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--ink-muted)', fontSize: '13px' }}>
            No items in queue matching criteria.
          </div>
        ) : (
          items.map((item) => {
            const isSelected = item.id === selectedId;
            const isOld = (item.ageDays || 0) >= 5;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: isSelected ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.65)',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid rgba(20, 60, 70, 0.08)',
                  boxShadow: isSelected ? '0 8px 24px -8px rgba(31, 138, 134, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="mono-text" style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--accent-deep)' }}>
                    {item.id}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isOld && (
                      <span className="pill pill-critical" style={{ fontSize: '10px', padding: '2px 7px' }}>
                        {item.ageDays}d old
                      </span>
                    )}
                    <StatusPill label={item.status} variant={item.statusVariant} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--ink)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                    {item.subtitle}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ink-meta)' }}>
                  <span className="mono-text">{item.timestamp}</span>
                  {(item.isLate || item.isHighRisk) && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {item.isLate && <span style={{ color: 'var(--attention-deep)', fontWeight: 500 }}>[Late &gt;60d]</span>}
                      {item.isHighRisk && <span style={{ color: 'var(--critical-deep)', fontWeight: 500 }}>[High Risk]</span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
