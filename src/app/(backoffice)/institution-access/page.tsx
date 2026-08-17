'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { INITIAL_INSTITUTIONS } from '@/lib/services/mock-store';
import { Building, Key, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

export default function InstitutionAccessPage() {
  const [institutions, setInstitutions] = useState(INITIAL_INSTITUTIONS);
  const [selectedInstId, setSelectedInstId] = useState('INST-ONEHEALTH');

  const activeInst = institutions.find(i => i.id === selectedInstId) || institutions[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="NICRA Inter-Agency Governance"
        title="Connected Institution Access &amp; Onboarding"
        subtitle="Manage government institution onboarding, approved business purposes, attribute access grants, and API integration credential expiry."
        actions={
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} />
            <span>Onboard New Institution</span>
          </button>
        }
      />

      {/* 2-Column Console */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '20px' }}>
        {/* Left Column: Institution List */}
        <div className="glass-officer-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.9px', color: 'var(--ink-label)', fontWeight: 600 }}>
            Registered Institutions ({institutions.length})
          </div>

          {institutions.map((inst) => {
            const isSelected = inst.id === selectedInstId;
            return (
              <div
                key={inst.id}
                onClick={() => setSelectedInstId(inst.id)}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.65)',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid rgba(20,60,70,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>{inst.name}</span>
                  <StatusPill label={inst.status} variant={inst.status === 'ACTIVE' ? 'success' : 'attention'} />
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>
                  Code: {inst.code} · Category: {inst.category}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Access Configuration */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          {activeInst && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '14px' }}>
                <div>
                  <span className="mono-text" style={{ fontSize: '12px', color: 'var(--accent-deep)', fontWeight: 600 }}>
                    {activeInst.id} · {activeInst.code}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 500, margin: '2px 0 0' }}>
                    {activeInst.name}
                  </h2>
                </div>
                <StatusPill label={`Credential Expiry: ${activeInst.credentialExpiryDate}`} variant="accent" />
              </div>

              {/* Compliance Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--success-tint)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--success-deep)' }}>
                  <CheckCircle2 size={16} />
                  <span>Business Purpose Approved</span>
                </div>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--success-tint)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--success-deep)' }}>
                  <CheckCircle2 size={16} />
                  <span>Data Protection Review Passed</span>
                </div>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--success-tint)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--success-deep)' }}>
                  <CheckCircle2 size={16} />
                  <span>Security Audit Certified</span>
                </div>
              </div>

              {/* Accessible Attributes */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                  Approved Accessible Identity Attributes:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeInst.accessibleAttributes.map((attr, idx) => (
                    <span key={idx} style={{ padding: '5px 11px', borderRadius: '8px', background: 'var(--accent-tint)', color: 'var(--accent-deep)', fontSize: '12px', fontWeight: 500 }}>
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rate & Search Limits */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'rgba(255, 255, 255, 0.6)', padding: '16px', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Daily Search Rate Limit</div>
                  <div className="mono-text" style={{ fontSize: '16px', fontWeight: 600 }}>{activeInst.dailySearchLimit.toLocaleString()} Queries/Day</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Max Transaction Limit</div>
                  <div className="mono-text" style={{ fontSize: '16px', fontWeight: 600 }}>{activeInst.transactionLimit.toLocaleString()} Transactions/Min</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
