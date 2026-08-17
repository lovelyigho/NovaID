'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { RecordCompare, CompareField } from '@/components/ui/RecordCompare';
import { DecisionPanel, DecisionOption } from '@/components/ui/DecisionPanel';
import { INITIAL_CORRECTION_REQUESTS } from '@/lib/services/mock-store';
import { FileDiff, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function CorrectionReviewPage() {
  const [requests, setRequests] = useState(INITIAL_CORRECTION_REQUESTS);
  const [selectedId, setSelectedId] = useState('CORR-2026-302');
  const [decisionSuccess, setDecisionSuccess] = useState('');

  const activeReq = requests.find(r => r.id === selectedId) || requests[0];

  const compareFields: CompareField[] = [
    {
      label: `Field to Update (${activeReq.fieldToUpdate})`,
      leftValue: activeReq.currentValue,
      rightValue: activeReq.proposedValue,
      isMatch: false,
      isMono: activeReq.fieldToUpdate === 'dateOfBirth'
    },
    {
      label: 'Citizen NSN',
      leftValue: activeReq.citizenNsn,
      rightValue: activeReq.citizenNsn,
      isMatch: true,
      isMono: true
    },
    {
      label: 'Evidence Document Type',
      leftValue: activeReq.evidenceType,
      rightValue: activeReq.evidenceType,
      isMatch: true
    }
  ];

  const decisionOptions: DecisionOption[] = [
    {
      value: 'APPROVE_MATERIAL',
      label: 'Approve Material Correction & Update Active Record',
      description: 'Evidence verified. Active identity record will update while preserving full historical values for audit.',
      variant: 'success'
    },
    {
      value: 'REJECT_MATERIAL',
      label: 'Reject Correction Request',
      description: 'Insufficient legal evidence provided. Rejection notification sent to citizen with appeal path.',
      variant: 'critical'
    }
  ];

  const handleDecisionSubmit = (decision: string, rationale: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === selectedId) {
        return {
          ...r,
          status: decision === 'APPROVE_MATERIAL' ? 'APPROVED' : 'REJECTED',
          reviewNotes: rationale,
          appliedAt: decision === 'APPROVE_MATERIAL' ? '08/13/2026 12:00:00' : undefined
        };
      }
      return r;
    }));
    setDecisionSuccess(`Correction decision logged: ${decision}. NSN ${activeReq.citizenNsn} remains unchanged.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PageHeader
        category="Identity Management &amp; Audit"
        title="Identity Correction &amp; Material Change Review"
        subtitle="Review requests to alter citizen identity fields. Material changes require independent Senior Approver sign-off. Previous values remain retrievable in audit history."
        statusCluster={
          <div style={{ display: 'flex', gap: '8px' }}>
            <StatusPill label={`Change Classification: ${activeReq.changeCategory}`} variant={activeReq.changeCategory === 'MATERIAL' ? 'attention' : 'accent'} />
            <StatusPill label="NSN Integrity: UNCHANGED" variant="success" />
          </div>
        }
      />

      {decisionSuccess && (
        <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--success-tint)', color: 'var(--success-deep)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>{decisionSuccess}</span>
        </div>
      )}

      {/* Main Review Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
        {/* Left Column: Field Comparison */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '12px' }}>
            <div>
              <span className="mono-text" style={{ fontSize: '12px', color: 'var(--accent-deep)', fontWeight: 600 }}>
                {activeReq.id} · NSN: {activeReq.citizenNsn}
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, margin: '2px 0 0' }}>
                {activeReq.citizenName}
              </h2>
            </div>
            <StatusPill label={activeReq.status.replace('_', ' ')} variant={activeReq.status === 'APPROVED' ? 'success' : 'attention'} />
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.65)', fontSize: '13px' }}>
            <strong>Reason for Correction Request:</strong>
            <p style={{ color: 'var(--ink-muted)', marginTop: '4px' }}>{activeReq.reasonForChange}</p>
          </div>

          <RecordCompare
            leftTitle="Current Active Identity Record"
            rightTitle="Proposed Material Change"
            fields={compareFields}
          />
        </div>

        {/* Right Column: Senior Approval Gate */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '24px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--accent-tint)', color: 'var(--accent-deep)', fontSize: '12px', lineHeight: 1.5 }}>
            <ShieldAlert size={18} style={{ marginBottom: '4px' }} />
            <div>
              <strong>Separation of Duties (PRD 3.8 &amp; 7.13):</strong> Material identity updates (name, DOB, parentage, citizenship) cannot be approved unilaterally by a single officer. Senior Approver sign-off is required.
            </div>
          </div>

          <DecisionPanel
            title="Senior Approver Sign-Off"
            options={decisionOptions}
            onSubmit={handleDecisionSubmit}
          />
        </div>
      </div>
    </div>
  );
}
