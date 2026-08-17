'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { INITIAL_BIRTH_NOTIFICATIONS, INITIAL_CITIZENS } from '@/lib/services/mock-store';
import { NOVARIA_STATES, getLGAsByState } from '@/lib/data/novaria-admin-reference';
import { FileCheck, Search, CheckCircle2, AlertTriangle, Upload, Camera } from 'lucide-react';

export default function BirthRegistrationPage() {
  const [notificationRef, setNotificationRef] = useState('OH-BN-2026-8841');
  const [isFetched, setIsFetched] = useState(false);
  
  // Registration Form State
  const [childFirstName, setChildFirstName] = useState('Tariq');
  const [childMiddleName, setChildMiddleName] = useState('Ibrahim');
  const [childSurname, setChildSurname] = useState('Bello');
  const [dateOfBirth, setDateOfBirth] = useState('2026-08-12'); // YYYY-MM-DD
  const [placeOfBirth, setPlaceOfBirth] = useState('Kandova General Hospital');
  const [sexAtBirth, setSexAtBirth] = useState<'MALE' | 'FEMALE'>('MALE');
  
  // Parents
  const [motherNsn, setMotherNsn] = useState('7204-3318-9050');
  const [motherName, setMotherName] = useState('Fatima Zahra Bello');
  const [fatherNsn, setFatherNsn] = useState('5104-9921-3049');
  const [fatherName, setFatherName] = useState('Ibrahim Bello');
  
  // Address
  const [selectedState, setSelectedState] = useState('KD');
  const [selectedLga, setSelectedLga] = useState('KD-01');
  const [residentialAddress, setResidentialAddress] = useState('14 Independence Boulevard, Kandova Central');
  
  // Late & Exception Toggles
  const [isLateRegistration, setIsLateRegistration] = useState(false);
  const [lateReason, setLateReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableLgas = getLGAsByState(selectedState);

  const handleFetchNotification = (e: React.FormEvent) => {
    e.preventDefault();
    const found = INITIAL_BIRTH_NOTIFICATIONS.find(b => b.id === notificationRef);
    if (found) {
      setChildFirstName(found.childFirstName || '');
      setChildSurname(found.childSurname);
      setPlaceOfBirth(found.placeOfBirth);
      setSexAtBirth(found.sexAtBirth);
      setMotherNsn(found.motherNsn || '');
      setMotherName(found.motherName || '');
      setIsFetched(true);
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="Civil Registration Journey"
        title="Birth Registration &amp; Enrolment"
        subtitle="Retrieve OneHealth hospital birth notifications or initiate civil birth registration. Generates NSN upon final verification approval."
        statusCluster={
          <div style={{ display: 'flex', gap: '8px' }}>
            <StatusPill label={isLateRegistration ? 'Late Birth (>60 Days)' : 'Standard Statutory Period'} variant={isLateRegistration ? 'attention' : 'success'} />
            <StatusPill label="Statutory Window: 60 Days" variant="neutral" />
          </div>
        }
      />

      {/* Search / Retrieve OneHealth Notification Bar */}
      <div className="glass-officer-card" style={{ padding: '20px' }}>
        <form onSubmit={handleFetchNotification} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>
              OneHealth Birth Notification Reference (Optional)
            </label>
            <input
              type="text"
              className="mono-text"
              value={notificationRef}
              onChange={(e) => setNotificationRef(e.target.value)}
              placeholder="e.g. OH-BN-2026-8841"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={16} />
            <span>Retrieve Notification</span>
          </button>
        </form>

        {isFetched && (
          <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '10px', background: 'var(--success-tint)', color: 'var(--success-deep)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            <span>OneHealth Electronic Birth Notification #{notificationRef} retrieved and pre-filled into application.</span>
          </div>
        )}
      </div>

      {/* Main Registration Form */}
      {isSubmitted ? (
        <div className="glass-officer-card" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--success-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={36} color="var(--success)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 500 }}>
            Birth Registration Submitted Successfully
          </h2>
          <div className="mono-text" style={{ fontSize: '14px', color: 'var(--accent-deep)', fontWeight: 600 }}>
            Application Reference: APP-2026-9042
          </div>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)', maxWidth: '540px', lineHeight: 1.55 }}>
            The birth registration application has been logged and queued for duplicate screening and Verification Officer review. {isLateRegistration ? 'Routed to Senior Approver for late birth approval.' : ''}
          </p>
          <button onClick={() => setIsSubmitted(false)} className="btn-secondary" style={{ marginTop: '8px' }}>
            Register Another Birth
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section 1: Child Details */}
          <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '10px' }}>
              1. Child Information
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Child First Name</label>
                <input type="text" value={childFirstName} onChange={(e) => setChildFirstName(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Middle Name</label>
                <input type="text" value={childMiddleName} onChange={(e) => setChildMiddleName(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Surname / Proposed Surname</label>
                <input type="text" value={childSurname} onChange={(e) => setChildSurname(e.target.value)} required style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Date of Birth (ISO 8601: YYYY-MM-DD)</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required style={{ width: '100%' }} className="mono-text" />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Sex Recorded at Registration</label>
                <select value={sexAtBirth} onChange={(e) => setSexAtBirth(e.target.value as 'MALE' | 'FEMALE')} style={{ width: '100%' }}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Place of Birth / Hospital</label>
                <input type="text" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} required style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Section 2: Parent & Address Details */}
          <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '10px' }}>
              2. Parent Information &amp; Residence
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Mother&apos;s Legal Name</label>
                <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Mother&apos;s NSN (Verified)</label>
                <input type="text" className="mono-text" value={motherNsn} onChange={(e) => setMotherNsn(e.target.value)} style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Father&apos;s Legal Name</label>
                <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Father&apos;s NSN</label>
                <input type="text" className="mono-text" value={fatherNsn} onChange={(e) => setFatherNsn(e.target.value)} style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>State</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} style={{ width: '100%' }}>
                  {NOVARIA_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Local Government Area (LGA)</label>
                <select value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)} style={{ width: '100%' }}>
                  {availableLgas.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Residential Address</label>
                <input type="text" value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} required style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Section 3: Evidence & Late Registration */}
          <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '10px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500 }}>
                3. Supporting Evidence &amp; Late Registration
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12.5px' }}>
                <input type="checkbox" checked={isLateRegistration} onChange={(e) => setIsLateRegistration(e.target.checked)} />
                <span style={{ fontWeight: 500, color: 'var(--attention-deep)' }}>Late Registration (&gt;60 Days)</span>
              </label>
            </div>

            {isLateRegistration && (
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--attention-tint)', border: '1px solid rgba(201,138,30,0.3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--attention-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} />
                  <span>Late Birth Registration Rules (PRD 7.4): Requires rationale &amp; Senior Approver review.</span>
                </div>
                <textarea
                  rows={2}
                  value={lateReason}
                  onChange={(e) => setLateReason(e.target.value)}
                  placeholder="Enter reason for late registration (e.g. medical emergency, remote residence, delayed documentation)..."
                  required={isLateRegistration}
                  style={{ width: '100%' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '2px dashed rgba(20,60,70,0.2)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Upload size={24} color="var(--accent)" />
                <div style={{ fontSize: '12.5px', fontWeight: 500 }}>Upload Supporting Document</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Hospital Record / Sworn Affidavit / Birth Attendant Statement</div>
              </div>

              <div style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '2px dashed rgba(20,60,70,0.2)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Camera size={24} color="var(--accent)" />
                <div style={{ fontSize: '12.5px', fontWeight: 500 }}>Child Photograph Capture</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Captured where required by policy (Age 0-5)</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '12px 28px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={18} />
              <span>Submit Registration Application</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
