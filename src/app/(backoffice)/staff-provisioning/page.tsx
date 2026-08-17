'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { UserRole } from '@/lib/types';
import { ROLE_CONFIGS } from '@/lib/auth/rbac';
import { UserPlus, CheckCircle2, Shield, Mail } from 'lucide-react';

export default function StaffProvisioningPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('REGISTRATION_OFFICER');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [assignedRegion, setAssignedRegion] = useState('NORTH');
  const [assignedCentre, setAssignedCentre] = useState('CENTRE-KD-01');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="NICRA Staff Identity Governance"
        title="Staff Account Provisioning &amp; Activation"
        subtitle="Provision new NICRA staff and officer accounts. Sends an activation invite requiring mandatory Multi-Factor Authentication (MFA) enrolment."
        statusCluster={
          <StatusPill label="Scope Guard: Active Administrator Authority Enforced" variant="success" />
        }
      />

      {isSuccess ? (
        <div className="glass-officer-card" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--success-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={32} color="var(--success)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 500 }}>
            Activation Invite Sent to {email}
          </h2>
          <div style={{ fontSize: '13px', color: 'var(--ink-muted)', maxWidth: '520px' }}>
            Account status set to <strong>PENDING_ACTIVATION</strong>. The staff member must open the activation link, set their password, and enrol a second authentication factor (MFA) before signing in.
          </div>
          <button onClick={() => { setIsSuccess(false); setFullName(''); setEmail(''); }} className="btn-secondary" style={{ marginTop: '8px' }}>
            Provision Another Staff Member
          </button>
        </div>
      ) : (
        <form onSubmit={handleProvision} className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '28px', maxWidth: '640px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '10px' }}>
            Provision New Staff Account
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Assigned Role</label>
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as UserRole)} style={{ width: '100%' }}>
              {Object.values(ROLE_CONFIGS).filter(r => r.role !== 'CITIZEN').map(r => (
                <option key={r.role} value={r.role}>{r.title}</option>
              ))}
            </select>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>
              {ROLE_CONFIGS[selectedRole].description}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Staff Member Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="e.g. Ibrahim Suleiman" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Work Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@nicra.gov.nv" style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Assigned Region Scope</label>
              <select value={assignedRegion} onChange={(e) => setAssignedRegion(e.target.value)} style={{ width: '100%' }}>
                <option value="NORTH">North Zone</option>
                <option value="SOUTH">South Zone</option>
                <option value="EAST">East Zone</option>
                <option value="WEST">West Zone</option>
                <option value="CENTRAL">Central Zone</option>
                <option value="NCT">Novaria Capital Territory (NCT)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Assigned Centre / Queue</label>
              <input type="text" value={assignedCentre} onChange={(e) => setAssignedCentre(e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserPlus size={16} />
              <span>Issue Activation Invite</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
