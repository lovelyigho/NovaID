'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { RecordCompare, CompareField } from '@/components/ui/RecordCompare';
import { DecisionPanel, DecisionOption } from '@/components/ui/DecisionPanel';
import { INITIAL_DUPLICATE_CASES, INITIAL_CITIZENS, INITIAL_REGISTRATION_APPLICATIONS } from '@/lib/services/mock-store';
import { Copy, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function DuplicateReviewPage() {
  const [duplicateCases, setDuplicateCases] = useState(INITIAL_DUPLICATE_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState('DUP-2026-104');
  const [decisionSuccess, setDecisionSuccess] = useState('');

  const activeCase = duplicateCases.find(c => c.id === selectedCaseId) || duplicateCases[0];
  const app = INITIAL_REGISTRATION_APPLICATIONS.find(a => a.id === activeCase?.applicationId);
  const candidate = INITIAL_CITIZENS.find(c => c.id === activeCase?.candidateRecordId);

  const compareFields: CompareField[] = [
    { label: 'Full Legal Name', leftValue: app ? `${app.firstName} ${app.surname}` : '', rightValue: candidate ? `${candidate.legalFirstName} ${candidate.surname}` : '' },
    { label: 'Date of Birth (ISO 8601)', leftValue: app?.dateOfBirth || '', rightValue: candidate?.dateOfBirth || '', isMono: true },
    { label: 'Place of Birth', leftValue: app?.placeOfBirth || '', rightValue: candidate?.placeOfBirth || '' },
    { label: 'Sex at Birth', leftValue: app?.sexAtBirth || '', rightValue: candidate?.sexAtBirth || '' },
    { label: 'Mother&apos;s Name', leftValue: app?.motherName || '', rightValue: candidate?.motherName || '' },
    { label: 'Identifier Hold / Status', leftValue: 'New Naturalization App', rightValue: candidate ? `${candidate.identifierType}: ${candidate.nsn}` : '', isMono: true }
  ];

  const decisionOptions: DecisionOption[] = [
    {
      value: 'CONVERT_NRN',
      label: 'Retire Prior NRN & Convert to NSN (Lawful Resident Naturalization)',
      description: 'Candidate previously held an NRN. Retire NRN, link prior identity history, and issue new NSN.',
      variant: 'success'
    },
    {
      value: 'SEPARATE',
      label: 'Confirm Separate Identities (Distinct Individuals)',
      description: 'Review confirms candidates are distinct persons (e.g. twins / same name). Resume NSN issuance.',
      variant: 'neutral'
    },
    {
      value: 'MERGE',
      label: 'Recommend Identity Merge',
      description: 'Confirmed duplicate record. Recommend merging new application into candidate identity.',
      variant: 'attention'
    },
    {
      value: 'FRAUD',
      label: 'Flag for Fraud & Security Investigation',
      description: 'Suspected fraudulent identity registration. Pause issuance permanently and alert Compliance.',
      variant: 'critical'
    }
  ];

  const handleDecisionSubmit = (decision: string, rationale: string) => {
    setDuplicateCases(prev => prev.map(c => {
      if (c.id === selectedCaseId) {
        return {
          ...c,
          status: decision === 'CONVERT_NRN' ? 'RECOMMENDED_LINK_NRN' : decision === 'SEPARATE' ? 'RECOMMENDED_SEPARATE' : decision === 'MERGE' ? 'RECOMMENDED_MERGE' : 'RECOMMENDED_FRAUD',
          recommendationNotes: rationale
        };
      }
      return c;
    }));
    setDecisionSuccess(`Duplicate review recommendation logged: ${decision}. Sent to Senior Approver for final sign-off.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PageHeader
        category="Duplicate Detection &amp; Resolution"
        title="Duplicate Identity Review Console"
        subtitle="Investigate potential demographic and biometric matches before NSN issuance. No automatic merge or rejection occurs on biometric score alone."
        statusCluster={
          <div style={{ display: 'flex', gap: '8px' }}>
            <StatusPill label={`Match Confidence: ${activeCase?.confidenceTier}`} variant="attention" />
            <StatusPill label="NSN Issuance: PAUSED" variant="critical" />
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left Column: Side-by-Side Comparison */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          {/* Biometric Scores Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', background: 'rgba(255, 255, 255, 0.6)', padding: '14px', borderRadius: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Demographic Match</div>
              <div className="mono-text" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--accent)' }}>{activeCase?.demographicScore}%</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Facial Match Score</div>
              <div className="mono-text" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--accent)' }}>{activeCase?.facialScore}%</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Fingerprint ISO Match</div>
              <div className="mono-text" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--success-deep)' }}>{activeCase?.fingerprintScore}%</div>
            </div>
          </div>

          <RecordCompare
            leftTitle={`Incoming Application (${app?.id})`}
            rightTitle={`Existing Candidate Record (${candidate?.nsn})`}
            fields={compareFields}
            overallMatchScore={activeCase?.overallMatchScore}
            confidenceTier={activeCase?.confidenceTier}
          />
        </div>

        {/* Right Column: Recommendation & Senior Approval Gate */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '24px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--attention-tint)', color: 'var(--attention-deep)', fontSize: '12px', lineHeight: 1.5 }}>
            <ShieldAlert size={18} style={{ marginBottom: '4px' }} />
            <div>
              <strong>Human Oversight Requirement (PRD 3.5 &amp; 7.14):</strong> Duplicate resolution recommendations must be independently reviewed and approved by a Senior Approver before NSN issuance or record merging.
            </div>
          </div>

          <DecisionPanel
            title="Duplicate Review Recommendation"
            options={decisionOptions}
            onSubmit={handleDecisionSubmit}
          />
        </div>
      </div>
    </div>
  );
}
