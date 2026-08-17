'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { DecisionPanel, DecisionOption } from '@/components/ui/DecisionPanel';
import { INITIAL_DEATH_REGISTRATIONS } from '@/lib/services/mock-store';
import { Skull, AlertTriangle, CheckCircle2, RotateCcw, ShieldAlert } from 'lucide-react';

export default function DeathRegistrationPage() {
  const [deathRecords, setDeathRecords] = useState(INITIAL_DEATH_REGISTRATIONS);
  const [isReversalMode, setIsReversalMode] = useState(false);
  const [decisionSuccess, setDecisionSuccess] = useState('');

  // Form State
  const [citizenNsn, setCitizenNsn] = useState('7204-3318-9050');
  const [citizenName, setCitizenName] = useState('Usman Garba');
  const [dateOfDeath, setDateOfDeath] = useState('2026-08-01');
  const [placeOfDeath, setPlaceOfDeath] = useState('Kandova General Hospital');

  const decisionOptions: DecisionOption[] = isReversalMode ? [
    {
      value: 'URGENT_REVERSAL',
      label: 'Execute Urgent Reversal of Deceased Status',
      description: 'Critical Incident Action: Restores identity status to ACTIVE and notifies connected systems.',
      variant: 'critical'
    }
  ] : [
    {
      value: 'APPROVE_DEATH',
      label: 'Approve Death Registration',
      description: 'Changes identity status to DECEASED. Preserves NSN & identity record in authoritative registry.',
      variant: 'attention'
    }
  ];

  const handleDecisionSubmit = (decision: string, rationale: string) => {
    if (decision === 'URGENT_REVERSAL') {
      setDecisionSuccess(`CRITICAL INCIDENT REVERSAL EXECUTED: Identity NSN ${citizenNsn} restored to ACTIVE status.`);
    } else {
      setDecisionSuccess(`Death registration approved for NSN ${citizenNsn}. Record status updated to DECEASED.`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PageHeader
        category="Civil Status Lifecycle"
        title="Death Registration &amp; Reversal Console"
        subtitle="Process death notifications from connected health facilities or civil centres. Preserves the NSN and identity record while marking status as Deceased."
        actions={
          <button
            onClick={() => { setIsReversalMode(!isReversalMode); setDecisionSuccess(''); }}
            className={isReversalMode ? 'btn-primary' : 'btn-secondary'}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={16} />
            <span>{isReversalMode ? 'Standard Registration Mode' : 'Urgent Reversal Mode'}</span>
          </button>
        }
        statusCluster={
          <div style={{ display: 'flex', gap: '8px' }}>
            <StatusPill label={isReversalMode ? 'Mode: Critical Reversal' : 'Mode: Standard Death Registration'} variant={isReversalMode ? 'critical' : 'attention'} />
            <StatusPill label="Record Retention: Preserved" variant="success" />
          </div>
        }
      />

      {decisionSuccess && (
        <div style={{ padding: '14px 16px', borderRadius: '12px', background: isReversalMode ? 'var(--critical-tint)' : 'var(--success-tint)', color: isReversalMode ? 'var(--critical-deep)' : 'var(--success-deep)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>{decisionSuccess}</span>
        </div>
      )}

      {/* Main Form & Review Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '10px' }}>
            {isReversalMode ? 'Critical Incident: Incorrect Death Reversal' : 'Death Notification Entry'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Deceased Citizen NSN</label>
              <input type="text" className="mono-text" value={citizenNsn} onChange={(e) => setCitizenNsn(e.target.value)} required style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Citizen Legal Name</label>
              <input type="text" value={citizenName} onChange={(e) => setCitizenName(e.target.value)} required style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Date of Death (ISO 8601)</label>
              <input type="date" className="mono-text" value={dateOfDeath} onChange={(e) => setDateOfDeath(e.target.value)} required style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Place of Death</label>
              <input type="text" value={placeOfDeath} onChange={(e) => setPlaceOfDeath(e.target.value)} required style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '24px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: isReversalMode ? 'var(--critical-tint)' : 'var(--accent-tint)', color: isReversalMode ? 'var(--critical-deep)' : 'var(--accent-deep)', fontSize: '12px', lineHeight: 1.5 }}>
            <ShieldAlert size={18} style={{ marginBottom: '4px' }} />
            <div>
              {isReversalMode ? (
                <span><strong>Critical Incident Protocol:</strong> An incorrect death registration must be reversed urgently. Requires mandatory logging of root cause investigation.</span>
              ) : (
                <span><strong>Senior Approver Requirement:</strong> Changing identity status to Deceased requires authorized Senior Approver sign-off.</span>
              )}
            </div>
          </div>

          <DecisionPanel
            title={isReversalMode ? 'Confirm Status Reversal' : 'Approve Death Registration'}
            options={decisionOptions}
            onSubmit={handleDecisionSubmit}
          />
        </div>
      </div>
    </div>
  );
}
