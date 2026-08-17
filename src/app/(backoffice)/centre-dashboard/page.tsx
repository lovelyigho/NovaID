'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { MetricTile } from '@/components/ui/MetricTile';
import { StatusPill } from '@/components/ui/StatusPill';
import { INITIAL_REGISTRATION_CENTRES } from '@/lib/services/mock-store';
import { Building2, FileCheck, Clock, AlertTriangle, Users } from 'lucide-react';

export default function CentreDashboardPage() {
  const centre = INITIAL_REGISTRATION_CENTRES[0]; // Kandova Centre #01

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="Registration Centre Operations"
        title={centre.name}
        subtitle={`Administrative Unit Code: ${centre.code} · Kandova State (${centre.stateCode}) · LGA: ${centre.lgaCode}`}
        statusCluster={
          <StatusPill label={`Centre Status: ${centre.status}`} variant="success" />
        }
      />

      {/* Metric Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
        <MetricTile
          label="Applications Created (YTD)"
          value={14280}
          note="Births, Late &amp; Corrections"
          noteVariant="accent"
          icon={<FileCheck size={22} color="var(--accent)" />}
        />
        <MetricTile
          label="Pending Queue Reviews"
          value={centre.pendingApplicationsCount}
          note="Awaiting Verification Officer"
          noteVariant="attention"
          icon={<Clock size={22} color="var(--attention)" />}
        />
        <MetricTile
          label="Active Centre Officers"
          value={centre.activeOfficersCount}
          note="Registration Officers On Duty"
          noteVariant="success"
          icon={<Users size={22} color="var(--success)" />}
        />
        <MetricTile
          label="Avg Processing SLA"
          value="1.8 Days"
          note="Target &lt;3.0 Days"
          noteVariant="success"
        />
      </div>

      {/* Centre Activity & Officer Queue Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500 }}>
            Recent Centre Submissions &amp; Activity
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(20, 60, 70, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--ink)' }}>APP-2026-9042 · Tariq Ibrahim Bello</div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>Hospital Birth Notification (OneHealth OH-BN-2026-8841)</div>
              </div>
              <StatusPill label="Submitted" variant="accent" />
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(20, 60, 70, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--ink)' }}>APP-2026-8902 · Zainab Garba</div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>Civil Birth Registration · Approved NSN 7204-8819-4018 Issued</div>
              </div>
              <StatusPill label="Approved" variant="success" />
            </div>
          </div>
        </div>

        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 500 }}>
            Officer Duty Roster
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(20, 60, 70, 0.08)' }}>
              <span>David Okon (Reg. Officer)</span>
              <span className="mono-text" style={{ color: 'var(--success-deep)' }}>Active (8 Today)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(20, 60, 70, 0.08)' }}>
              <span>Fatima Musa (Reg. Officer)</span>
              <span className="mono-text" style={{ color: 'var(--success-deep)' }}>Active (11 Today)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span>Ahmadu Bello (Centre Admin)</span>
              <span className="mono-text" style={{ color: 'var(--accent-deep)' }}>Admin Duty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
