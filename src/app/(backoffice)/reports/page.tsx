'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { FileSpreadsheet, Download, Filter, BarChart2 } from 'lucide-react';

interface ReportCatalogueItem {
  id: string;
  name: string;
  intendedUser: string;
  purpose: string;
  dataSource: string;
  updateFrequency: string;
  containsPii: boolean;
}

const REPORT_CATALOGUE: ReportCatalogueItem[] = [
  { id: 'REP-01', name: 'Registration Performance Report', intendedUser: 'NICRA Administrators', purpose: 'Monitor volumes and processing SLA times across centres', dataSource: 'Registration Application Store', updateFrequency: 'Hourly', containsPii: false },
  { id: 'REP-02', name: 'Birth Registration Coverage Report', intendedUser: 'NICRA & Ministry of Interior', purpose: 'Monitor national birth registration coverage against statutory 60-day target', dataSource: 'OneHealth & Civil Birth Registry', updateFrequency: 'Daily', containsPii: false },
  { id: 'REP-03', name: 'Late Birth Registration Report', intendedUser: 'NICRA Operations', purpose: 'Monitor delayed birth registrations (>60 days) and senior approval outcomes', dataSource: 'Late Registration Queue', updateFrequency: 'Daily', containsPii: true },
  { id: 'REP-04', name: 'Duplicate Review Report', intendedUser: 'Duplicate & Compliance Teams', purpose: 'Track potential duplicate matches, confidence scores, and officer decisions', dataSource: 'Duplicate Review Store', updateFrequency: 'Real-time', containsPii: true },
  { id: 'REP-05', name: 'Identity Correction Report', intendedUser: 'NICRA Operations', purpose: 'Monitor material vs minor correction volumes, evidence types, and outcomes', dataSource: 'Correction Request History', updateFrequency: 'Daily', containsPii: true },
  { id: 'REP-06', name: 'Institutional Access Report', intendedUser: 'Compliance Officer', purpose: 'Review inter-agency search queries and verification activity limits', dataSource: 'API Gateway Log', updateFrequency: 'Real-time', containsPii: false },
  { id: 'REP-07', name: 'Security Exception Report', intendedUser: 'Security & Compliance', purpose: 'Investigate suspicious queries, lockouts, and exceptional access events', dataSource: 'Security Event Log', updateFrequency: 'Real-time', containsPii: true },
  { id: 'REP-08', name: 'Platform Availability Report', intendedUser: 'Technical Operations', purpose: 'Monitor uptime, service health, and API latency metrics', dataSource: 'System Monitoring Engine', updateFrequency: '5 Minutes', containsPii: false }
];

export default function ReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState('REP-01');
  const activeReport = REPORT_CATALOGUE.find(r => r.id === selectedReportId) || REPORT_CATALOGUE[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="NICRA Compliance &amp; Analytics"
        title="Operational &amp; Governance Reports"
        subtitle="Generate and export statutory compliance reports, registration coverage metrics, and inter-agency audit trails."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Report Catalogue Selection */}
        <div className="glass-officer-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.9px', color: 'var(--ink-label)', fontWeight: 600 }}>
            Report Catalogue (Section 19)
          </div>

          {REPORT_CATALOGUE.map((rep) => {
            const isSelected = rep.id === selectedReportId;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReportId(rep.id)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid rgba(20,60,70,0.08)',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? 'var(--accent-deep)' : 'var(--ink)'
                }}
              >
                {rep.name}
              </div>
            );
          })}
        </div>

        {/* Report Preview Pane */}
        <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '14px' }}>
            <div>
              <span className="mono-text" style={{ fontSize: '12px', color: 'var(--accent-deep)', fontWeight: 600 }}>
                {activeReport.id} · Intended User: {activeReport.intendedUser}
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, margin: '2px 0 0' }}>
                {activeReport.name}
              </h2>
            </div>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={16} />
              <span>Export CSV / PDF</span>
            </button>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
            <strong>Purpose:</strong> {activeReport.purpose}
          </div>

          {/* Metric Rules (PRD 12.4) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '14px', background: 'rgba(255, 255, 255, 0.65)', padding: '16px', borderRadius: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Data Source</div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{activeReport.dataSource}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Update Frequency</div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{activeReport.updateFrequency}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Contains PII Data</div>
              <StatusPill label={activeReport.containsPii ? 'PII Included (Audited)' : 'Anonymized / Summary'} variant={activeReport.containsPii ? 'attention' : 'success'} />
            </div>
          </div>

          {/* Mock Chart / Data Preview */}
          <div style={{ height: '200px', borderRadius: '14px', background: 'rgba(20, 60, 70, 0.04)', border: '1px solid rgba(20, 60, 70, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
            <BarChart2 size={40} color="var(--accent)" />
            <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
              Interactive Data Visualization Chart ({activeReport.name})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
