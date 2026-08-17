'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { VirtualIdCard } from '@/components/ui/VirtualIdCard';
import { INITIAL_CITIZENS, INITIAL_CORRECTION_REQUESTS } from '@/lib/services/mock-store';
import { Shield, User, FileEdit, History, Lock, Edit3, ArrowRight } from 'lucide-react';

export default function CitizenPortalPage() {
  const [citizen, setCitizen] = useState(INITIAL_CITIZENS[0]); // Fatima Zahra Bello
  const [activeTab, setActiveTab] = useState<'CARD' | 'PROFILE' | 'REQUESTS' | 'UPDATE'>('CARD');

  // Minor update form
  const [phone, setPhone] = useState(citizen.phoneNumber || '');
  const [email, setEmail] = useState(citizen.emailAddress || '');
  const [address, setAddress] = useState(citizen.residentialAddress);
  const [updateSuccess, setUpdateSuccess] = useState('');

  const handleMinorUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCitizen(prev => ({
      ...prev,
      phoneNumber: phone,
      emailAddress: email,
      residentialAddress: address,
      recordVersion: prev.recordVersion + 1
    }));
    setUpdateSuccess('Contact details updated immediately. Previous values preserved in audit log.');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'var(--bg-citizen)',
        backgroundImage: 'radial-gradient(circle at 8% -6%, rgba(31,138,134,0.12) 0%, transparent 40%), radial-gradient(circle at 96% 4%, rgba(111,106,184,0.1) 0%, transparent 40%), radial-gradient(circle at 62% 108%, rgba(74,158,201,0.12) 0%, transparent 50%)',
        padding: '24px 32px 60px'
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Top Navbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid rgba(20,60,70,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1f8a86, #2f7d9b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>
                NovaID Citizen Portal
              </div>
              <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                Authoritative Self-Service &amp; Virtual ID
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink)' }}>
              {citizen.legalFirstName} {citizen.surname}
            </span>
            <Link href="/" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11.5px' }}>
              Exit Portal
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '8px' }}>
          {[
            { id: 'CARD', label: 'Virtual Identity Card' },
            { id: 'PROFILE', label: 'Identity Profile' },
            { id: 'REQUESTS', label: 'Track Requests &amp; Appeals' },
            { id: 'UPDATE', label: 'Update Details' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setUpdateSuccess(''); }}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: activeTab === tab.id ? 600 : 400,
                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--ink-muted)',
                border: 'none'
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: tab.label }} />
            </button>
          ))}
        </div>

        {/* TAB 1: VIRTUAL ID CARD */}
        {activeTab === 'CARD' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
            <VirtualIdCard citizen={citizen} />
          </div>
        )}

        {/* TAB 2: IDENTITY PROFILE */}
        {activeTab === 'PROFILE' && (
          <div className="glass-citizen-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '12px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500 }}>
                Personal Identity Record
              </div>
              <StatusPill label="Material Fields: Read-Only (Audited)" variant="accent" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Legal First Name</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{citizen.legalFirstName}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Surname</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{citizen.surname}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Date of Birth (ISO 8601)</div>
                <div className="mono-text" style={{ fontSize: '14px', fontWeight: 500 }}>{citizen.dateOfBirth}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Place of Birth</div>
                <div style={{ fontSize: '13px' }}>{citizen.placeOfBirth}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Citizenship Status</div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{citizen.citizenshipStatus}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ink-label)' }}>Novaria Social Number (NSN)</div>
                <div className="mono-text" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-deep)' }}>{citizen.nsn}</div>
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(20,60,70,0.04)', fontSize: '11.5px', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} />
              <span>Material fields cannot be edited directly by citizens. Submit a correction request with legal evidence to request changes.</span>
            </div>
          </div>
        )}

        {/* TAB 3: TRACK REQUESTS */}
        {activeTab === 'REQUESTS' && (
          <div className="glass-citizen-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500 }}>
              Submitted Correction &amp; Update Requests
            </div>

            {INITIAL_CORRECTION_REQUESTS.map(req => (
              <div key={req.id} style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(20,60,70,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="mono-text" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-deep)' }}>
                    {req.id} · Category: {req.changeCategory}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginTop: '2px' }}>
                    Updating {req.fieldToUpdate}: {req.currentValue} &rarr; {req.proposedValue}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                    {req.reasonForChange}
                  </div>
                </div>

                <StatusPill label={req.status.replace('_', ' ')} variant={req.status === 'APPROVED' ? 'success' : 'attention'} />
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: UPDATE DETAILS */}
        {activeTab === 'UPDATE' && (
          <form onSubmit={handleMinorUpdateSubmit} className="glass-citizen-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '560px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '10px' }}>
              Update Contact &amp; Residential Details (Minor Update)
            </div>

            {updateSuccess && (
              <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--success-tint)', color: 'var(--success-deep)', fontSize: '12.5px' }}>
                {updateSuccess}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Residential Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Edit3 size={16} />
                <span>Save Minor Update</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
