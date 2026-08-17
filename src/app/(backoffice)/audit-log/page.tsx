'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { getAuditLogs } from '@/lib/audit/logger';
import { History, Shield, Lock, Download, Search } from 'lucide-react';

export default function AuditLogPage() {
  const [logs, setLogs] = useState(getAuditLogs());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(l =>
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.affectedNsn && l.affectedNsn.includes(searchTerm))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="NICRA Compliance &amp; Accountability"
        title="Immutable Audit Log Viewer"
        subtitle="Complete, unalterable trail of every identity registration, search, verification, update, approval, rejection, and exceptional access event."
        actions={
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={15} />
            <span>Export Audit Log (Audited Event)</span>
          </button>
        }
        statusCluster={
          <StatusPill label="Immutability: Write-Once Read-Only Engine" variant="success" />
        }
      />

      {/* Filter Bar */}
      <div className="glass-officer-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Search size={18} color="var(--ink-muted)" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter audit entries by action, officer name, NSN, or details..."
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13.5px' }}
        />
      </div>

      {/* Audit Logs Table */}
      <div className="glass-officer-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: 'rgba(20, 60, 70, 0.06)', borderBottom: '1px solid rgba(20, 60, 70, 0.1)', color: 'var(--ink-label)', fontWeight: 600 }}>
                <th style={{ padding: '14px 16px' }}>Timestamp</th>
                <th style={{ padding: '14px 16px' }}>Actor / Role</th>
                <th style={{ padding: '14px 16px' }}>Institution / Centre</th>
                <th style={{ padding: '14px 16px' }}>Action &amp; Purpose</th>
                <th style={{ padding: '14px 16px' }}>Affected Record / NSN</th>
                <th style={{ padding: '14px 16px' }}>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(20, 60, 70, 0.06)', transition: 'background 0.15s ease' }}>
                  <td className="mono-text" style={{ padding: '14px 16px', whiteSpace: 'nowrap', fontSize: '11.5px', color: 'var(--ink-meta)' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 500, color: 'var(--ink)' }}>{log.userName}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>{log.userRole}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--ink-muted)' }}>
                    {log.institutionOrCentre}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div className="mono-text" style={{ fontWeight: 600, color: 'var(--accent-deep)', fontSize: '11.5px' }}>
                      {log.action}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                      {log.approvedPurpose} · {log.details}
                    </div>
                  </td>
                  <td className="mono-text" style={{ padding: '14px 16px', fontSize: '12px' }}>
                    {log.affectedNsn || log.affectedRecordId || '—'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <StatusPill
                      label={log.outcome}
                      variant={log.outcome === 'SUCCESS' ? 'success' : log.outcome === 'BLOCKED' ? 'attention' : 'critical'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
