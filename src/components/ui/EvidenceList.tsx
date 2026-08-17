'use client';

import React from 'react';
import { FileText, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import { StatusPill } from './StatusPill';

export interface EvidenceDocument {
  id: string;
  title: string;
  type: string;
  url: string;
  status: 'VERIFIED' | 'RECORDED' | 'FLAGGED';
  uploadedAt: string;
}

interface EvidenceListProps {
  documents: EvidenceDocument[];
  onViewDocument?: (doc: EvidenceDocument) => void;
}

export function EvidenceList({ documents, onViewDocument }: EvidenceListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.9px', textTransform: 'uppercase', color: 'var(--ink-label)', fontWeight: 500 }}>
        Supporting Evidence &amp; Documents ({documents.length})
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {documents.map((doc) => {
          const isVerified = doc.status === 'VERIFIED';
          const isFlagged = doc.status === 'FLAGGED';

          return (
            <div
              key={doc.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(20, 60, 70, 0.08)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: isFlagged
                      ? 'var(--attention-tint)'
                      : isVerified
                      ? 'var(--success-tint)'
                      : 'rgba(20, 60, 70, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isFlagged ? (
                    <AlertTriangle size={18} color="var(--attention-deep)" />
                  ) : isVerified ? (
                    <ShieldCheck size={18} color="var(--success-deep)" />
                  ) : (
                    <FileText size={18} color="var(--ink-muted)" />
                  )}
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                    {doc.title}
                  </div>
                  <div className="mono-text" style={{ fontSize: '11px', color: 'var(--ink-meta)', marginTop: '1px' }}>
                    {doc.type} · {doc.uploadedAt}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StatusPill
                  label={doc.status}
                  variant={isVerified ? 'success' : isFlagged ? 'attention' : 'neutral'}
                />

                <button
                  onClick={() => onViewDocument && onViewDocument(doc)}
                  className="btn-secondary"
                  style={{ padding: '6px 10px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Inspect</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
