'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { MetricTile } from '@/components/ui/MetricTile';
import { StatusPill } from '@/components/ui/StatusPill';
import { INITIAL_METRICS } from '@/lib/services/mock-store';
import { Users, FileCheck, AlertTriangle, ShieldCheck, Activity, Copy, FileDiff, Skull, UserCheck } from 'lucide-react';

export default function NationalDashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('NATIONWIDE');
  const metrics = INITIAL_METRICS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="NICRA Operational Oversight"
        title={selectedRegion === 'NATIONWIDE' ? 'National Operational Dashboard' : `${selectedRegion} Regional Dashboard`}
        subtitle="Real-time nationwide population registration metrics, NSN issuance volume, system availability, and exception queues."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--ink-label)', fontWeight: 500 }}>Region Scope:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{ background: '#ffffff' }}
            >
              <option value="NATIONWIDE">Nationwide (All 5 Zones + NCT)</option>
              <option value="NORTH">North Zone (Kandova, Zaria, Sokara...)</option>
              <option value="SOUTH">South Zone (Riverside, Bayelsa...)</option>
              <option value="EAST">East Zone (Enugu, Imo, Abia...)</option>
              <option value="WEST">West Zone (Laguna, Ogun, Oyo...)</option>
              <option value="CENTRAL">Central Zone (Kogi, Benue, Jos...)</option>
              <option value="NCT">Novaria Capital Territory (NCT)</option>
            </select>
          </div>
        }
        statusCluster={
          <div style={{ display: 'flex', gap: '8px' }}>
            <StatusPill label={`Statutory Birth Target: ${metrics.statutoryBirthRegistrationRate}% (Target: 85%)`} variant="success" />
            <StatusPill label={`Core Availability: ${metrics.systemAvailabilityPercent}%`} variant="accent" />
          </div>
        }
      />

      {/* Row 1: High-Level Population & NSN Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
        <MetricTile
          label="Total Registered Citizens"
          value={metrics.totalRegisteredCitizens}
          note="Year-1 Initial Enrolment Wave (~5%)"
          noteVariant="accent"
          icon={<Users size={22} color="var(--accent)" />}
        />
        <MetricTile
          label="Unique NSNs Issued"
          value={metrics.nsnsIssued}
          note="Luhn (Mod-10) Check Digit Verified"
          noteVariant="success"
          icon={<ShieldCheck size={22} color="var(--success)" />}
        />
        <MetricTile
          label="Birth Registrations (YTD)"
          value={metrics.birthRegistrationsYearToDate}
          note="86.4% within statutory 60-day window"
          noteVariant="success"
          icon={<FileCheck size={22} color="var(--success)" />}
        />
        <MetricTile
          label="System Availability"
          value={`${metrics.systemAvailabilityPercent}%`}
          note="Target: 99.9% Uptime"
          noteVariant="accent"
          icon={<Activity size={22} color="var(--accent)" />}
        />
      </div>

      {/* Row 2: Secondary Registration Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
        <MetricTile
          label="Naturalized Citizens (YTD)"
          value={metrics.naturalizedRegistrationsYearToDate}
          note="Immigration Clearance Validated"
          noteVariant="neutral"
          icon={<UserCheck size={20} color="var(--ink-muted)" />}
        />
        <MetricTile
          label="Death Registrations (YTD)"
          value={metrics.deathRegistrationsYearToDate}
          note="NSN & Identity Record Preserved"
          noteVariant="neutral"
          icon={<Skull size={20} color="var(--ink-muted)" />}
        />
        <MetricTile
          label="Active Enrolment Centres"
          value={metrics.activeRegistrationCentresCount}
          note="1,042 Onboarded nationwide"
          noteVariant="accent"
        />
        <MetricTile
          label="Connected Institutions"
          value={metrics.activeConnectedInstitutionsCount}
          note="OneHealth, Immigration, Police"
          noteVariant="accent"
        />
      </div>

      {/* Row 3: Exception Queues & Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Exception & Review Queues Summary */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500 }}>
            Operational Review Queues
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--attention-tint)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--attention-deep)' }}>Potential Duplicates</span>
                <Copy size={16} color="var(--attention-deep)" />
              </div>
              <span className="mono-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: 'var(--attention-deep)' }}>
                {metrics.potentialDuplicatesCount}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--attention-deep)' }}>NSN Issuance Paused</span>
            </div>

            <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--accent-tint)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--accent-deep)' }}>Pending Verification</span>
                <FileCheck size={16} color="var(--accent-deep)" />
              </div>
              <span className="mono-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: 'var(--accent-deep)' }}>
                {metrics.pendingApplicationsCount}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--accent-deep)' }}>Avg SLA: 2.4 days</span>
            </div>

            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(20, 60, 70, 0.05)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Correction Requests</span>
                <FileDiff size={16} color="var(--ink-label)" />
              </div>
              <span className="mono-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: 'var(--ink)' }}>
                {metrics.correctionRequestsCount}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Material &amp; Minor</span>
            </div>
          </div>
        </div>

        {/* Security & Compliance Panel */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 500 }}>
              Security &amp; Audit Alert Panel
            </div>
            <AlertTriangle size={18} color="var(--attention-deep)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(20, 60, 70, 0.08)' }}>
              <div style={{ fontWeight: 500, color: 'var(--ink)' }}>Institutional Access Certification</div>
              <div style={{ color: 'var(--ink-muted)', marginTop: '2px' }}>OneHealth periodic data compliance check due in 12 days.</div>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(20, 60, 70, 0.08)' }}>
              <div style={{ fontWeight: 500, color: 'var(--ink)' }}>Biometric Matching Thresholds</div>
              <div style={{ color: 'var(--ink-muted)', marginTop: '2px' }}>ISO/IEC 19794 fingerprint template index active.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
