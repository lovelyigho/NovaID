'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { Search, ShieldCheck, AlertCircle, Lock } from 'lucide-react';

export default function IdentityVerificationPage() {
  const [queryNsn, setQueryNsn] = useState('7204-3318-9050');
  const [queryFirstName, setQueryFirstName] = useState('Fatima');
  const [querySurname, setQuerySurname] = useState('Bello');
  const [queryDob, setQueryDob] = useState('1995-04-12');
  const [approvedPurpose, setApprovedPurpose] = useState('PASSPORT_VERIFICATION');
  
  const [queryOutcome, setQueryOutcome] = useState<'MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH' | 'UNDER_REVIEW' | 'RESTRICTED' | 'DECEASED' | 'SERVICE_UNAVAILABLE' | null>(null);

  const handleRunQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryOutcome('MATCH');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="Inter-Agency Verification Service"
        title="Government Identity Verification Console"
        subtitle="Submit citizen attributes for lawful verification. NovaID returns an authoritative status result without exposing unrelated citizen personal records."
        statusCluster={
          <StatusPill label="Privacy by Design (PRD 3.2): Minimum Information Returned" variant="success" />
        }
      />

      <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <form onSubmit={handleRunQuery} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Approved Verification Purpose *</label>
              <select value={approvedPurpose} onChange={(e) => setApprovedPurpose(e.target.value)} style={{ width: '100%' }} required>
                <option value="PASSPORT_VERIFICATION">Passport &amp; Travel Document Verification</option>
                <option value="HEALTHCARE_PATIENT_MATCH">Healthcare Patient Identity Matching</option>
                <option value="LAW_ENFORCEMENT_LAWFUL_QUERY">Lawful Law Enforcement Query</option>
                <option value="SOCIAL_BENEFIT_ELIGIBILITY">Social Service Benefit Eligibility</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Citizen NSN or NRN</label>
              <input type="text" className="mono-text" value={queryNsn} onChange={(e) => setQueryNsn(e.target.value)} required style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>First Name</label>
              <input type="text" value={queryFirstName} onChange={(e) => setQueryFirstName(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Surname</label>
              <input type="text" value={querySurname} onChange={(e) => setQuerySurname(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Date of Birth (ISO 8601)</label>
              <input type="date" className="mono-text" value={queryDob} onChange={(e) => setQueryDob(e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} />
              <span>Execute Verification Query</span>
            </button>
          </div>
        </form>

        {/* Outcome Results Card */}
        {queryOutcome && (
          <div
            style={{
              marginTop: '12px',
              padding: '20px',
              borderRadius: '14px',
              background: queryOutcome === 'MATCH' ? 'var(--success-tint)' : queryOutcome === 'PARTIAL_MATCH' ? 'var(--accent-tint)' : 'var(--attention-tint)',
              border: '1px solid rgba(20, 60, 70, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={24} color={queryOutcome === 'MATCH' ? 'var(--success)' : 'var(--accent)'} />
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>
                  Verification Result: {queryOutcome.replace('_', ' ')}
                </span>
              </div>
              <StatusPill label={`Purpose: ${approvedPurpose}`} variant="accent" />
            </div>

            <div style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
              NovaID authoritative registry confirms that NSN <strong>{queryNsn}</strong> matches the submitted demographic attributes for {queryFirstName} {querySurname}.
            </div>

            <div style={{ fontSize: '11px', color: 'var(--ink-meta)', borderTop: '1px dashed rgba(20,60,70,0.15)', paddingTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={12} />
              <span>Verification query logged under Audit ID AUD-2026-9906. Complete citizen profile withheld per privacy policy.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
