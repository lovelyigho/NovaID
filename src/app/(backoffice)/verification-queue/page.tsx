'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { QueueList, QueueItem } from '@/components/ui/QueueList';
import { EvidenceList } from '@/components/ui/EvidenceList';
import { DecisionPanel, DecisionOption } from '@/components/ui/DecisionPanel';
import { INITIAL_REGISTRATION_APPLICATIONS } from '@/lib/services/mock-store';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function VerificationQueuePage() {
  const [applications, setApplications] = useState(INITIAL_REGISTRATION_APPLICATIONS);
  const [selectedId, setSelectedId] = useState<string>('APP-2026-9042');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [decisionSuccess, setDecisionSuccess] = useState<string>('');

  const activeApp = applications.find(a => a.id === selectedId) || applications[0];

  const queueItems: QueueItem[] = applications.map(app => ({
    id: app.id,
    title: `${app.firstName} ${app.surname}`,
    subtitle: `${app.type.replace('_', ' ')} · DOB: ${app.dateOfBirth}`,
    timestamp: app.submittedAt,
    status: app.status.replace('_', ' '),
    statusVariant: app.status === 'APPROVED' ? 'success' : app.status === 'PENDING_SENIOR_APPROVAL' ? 'attention' : 'accent',
    isHighRisk: app.isHighRisk,
    isLate: app.isLate,
    ageDays: 2
  }));

  const decisionOptions: DecisionOption[] = [
    {
      value: 'APPROVE',
      label: 'Approve Registration & Issue NSN',
      description: 'Identity details and evidence verified. Automatically generates a unique 12-digit NSN.',
      variant: 'success'
    },
    {
      value: 'RETURN_INFO',
      label: 'Return for Additional Evidence / Clarification',
      description: 'Returns application to Registration Officer with specified evidence gaps.',
      variant: 'attention'
    },
    {
      value: 'REJECT',
      label: 'Reject Application',
      description: 'Rejects application with documented rationale. Applicant may lodge an appeal case.',
      variant: 'critical'
    }
  ];

  const handleDecisionSubmit = (decision: string, rationale: string) => {
    setApplications(prev => prev.map(a => {
      if (a.id === selectedId) {
        return {
          ...a,
          status: decision === 'APPROVE' ? 'APPROVED' : decision === 'RETURN_INFO' ? 'RETURNED_FOR_INFO' : 'REJECTED',
          reviewNotes: rationale,
          issuedNsn: decision === 'APPROVE' ? '7204-8819-4018' : undefined
        };
      }
      return a;
    }));
    setDecisionSuccess(`Decision logged: ${decision} for ${activeApp.firstName} ${activeApp.surname}.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PageHeader
        category="Verification Officer Console"
        title="Registration Verification Queue"
        subtitle="Review captured identity records and evidence. Approved applications automatically generate an authoritative NSN."
      />

      {decisionSuccess && (
        <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--success-tint)', color: 'var(--success-deep)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>{decisionSuccess}</span>
        </div>
      )}

      {/* 2-Column Console Layout (Queue List + Detail Review Pane) */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '20px', minHeight: '600px' }}>
        {/* Left Column: Queue Items */}
        <div className="glass-officer-card" style={{ padding: '18px' }}>
          <QueueList
            items={queueItems}
            selectedId={selectedId}
            onSelectItem={(id) => { setSelectedId(id); setDecisionSuccess(''); }}
            filterChips={[
              { label: 'All Pending', count: applications.length, active: activeFilter === 'ALL', onClick: () => setActiveFilter('ALL') },
              { label: 'Standard', count: 1, active: activeFilter === 'STANDARD', onClick: () => setActiveFilter('STANDARD') },
              { label: 'Late (>60d)', count: 1, active: activeFilter === 'LATE', onClick: () => setActiveFilter('LATE') }
            ]}
          />
        </div>

        {/* Right Column: Detailed Application Review */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          {activeApp ? (
            <>
              {/* Application Top Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(20, 60, 70, 0.08)', paddingBottom: '14px' }}>
                <div>
                  <div className="mono-text" style={{ fontSize: '12px', color: 'var(--accent-deep)', fontWeight: 600 }}>
                    {activeApp.id} · {activeApp.type}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 500, margin: '2px 0 0' }}>
                    {activeApp.firstName} {activeApp.middleName ? `${activeApp.middleName} ` : ''}{activeApp.surname}
                  </h2>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Date of Birth</div>
                  <div className="mono-text" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>
                    {activeApp.dateOfBirth} {/* ISO 8601 YYYY-MM-DD */}
                  </div>
                </div>
              </div>

              {/* Grid Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', background: 'rgba(255, 255, 255, 0.6)', padding: '16px', borderRadius: '14px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Sex at Birth</div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{activeApp.sexAtBirth}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Mother&apos;s Name / NSN</div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{activeApp.motherName || '—'}</div>
                  <div className="mono-text" style={{ fontSize: '11px', color: 'var(--ink-meta)' }}>{activeApp.motherNsn}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Submitting Centre / Officer</div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{activeApp.registrationCentreId}</div>
                  <div className="mono-text" style={{ fontSize: '11px', color: 'var(--ink-meta)' }}>{activeApp.submittingOfficerId}</div>
                </div>
              </div>

              {/* Evidence Section */}
              <EvidenceList documents={activeApp.evidenceDocuments} />

              {/* Decision Panel */}
              <DecisionPanel
                title="Verification Officer Sign-Off &amp; Action"
                options={decisionOptions}
                onSubmit={handleDecisionSubmit}
                gateNote="Conflict of Interest Rule (PRD 6.1): Verifying officer cannot be the submitting officer. Approved actions trigger immediate Luhn NSN generation."
              />
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--ink-muted)', padding: '40px' }}>Select an application from the queue to review.</div>
          )}
        </div>
      </div>
    </div>
  );
}
