'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { UserCheck, Search, CheckCircle2, ShieldCheck, Camera, FileText } from 'lucide-react';

export default function NaturalizationPage() {
  const [immigrationRef, setImmigrationRef] = useState('IMM-NAT-2026-0491');
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Applicant info
  const [legalFirstName, setLegalFirstName] = useState('Jean-Luc');
  const [surname, setSurname] = useState('Moreau');
  const [dateOfBirth, setDateOfBirth] = useState('1990-07-04');
  const [placeOfBirth, setPlaceOfBirth] = useState('Lyon, France');
  const [previousNationality, setPreviousNationality] = useState('France');
  const [priorNrn, setPriorNrn] = useState('9014-5519-3382');

  const handleValidateReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (immigrationRef.trim()) {
      setIsValidated(true);
    }
  };

  const handleSubmitEnrolment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PageHeader
        category="Civil Registration Journey"
        title="Naturalized Citizen Registration"
        subtitle="Validate Immigration citizenship approval references, capture biometrics, and issue an NSN. Converts and retires prior Novaria Resident Numbers (NRNs)."
        statusCluster={
          <div style={{ display: 'flex', gap: '8px' }}>
            <StatusPill label="Immigration Ref: IMM-NAT-2026-0491" variant="accent" />
            <StatusPill label="Prior NRN Detected: 9014-5519-3382" variant="attention" />
          </div>
        }
      />

      {/* Validation Bar */}
      <div className="glass-officer-card" style={{ padding: '20px' }}>
        <form onSubmit={handleValidateReference} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>
              Immigration Naturalization Approval Reference Number
            </label>
            <input
              type="text"
              className="mono-text"
              value={immigrationRef}
              onChange={(e) => setImmigrationRef(e.target.value)}
              placeholder="IMM-NAT-2026-XXXX"
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={16} />
            <span>Validate Immigration Reference</span>
          </button>
        </form>

        {isValidated && (
          <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '10px', background: 'var(--success-tint)', color: 'var(--success-deep)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            <span>Immigration Citizenship Approval Reference Validated: Active &amp; Verified. Gazette #0491.</span>
          </div>
        )}
      </div>

      {isSubmitted ? (
        <div className="glass-officer-card" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--success-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={36} color="var(--success)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 500 }}>
            Naturalization Identity Enrolment Complete
          </h2>
          <div className="mono-text" style={{ fontSize: '14px', color: 'var(--accent-deep)', fontWeight: 600 }}>
            Application Ref: APP-2026-9250 · Prior NRN 9014-5519-3382 Linked &amp; Retired
          </div>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)', maxWidth: '540px' }}>
            Application queued for duplicate review. Upon final sign-off, a new NSN will be issued to the naturalized citizen.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmitEnrolment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-officer-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, borderBottom: '1px solid rgba(20,60,70,0.08)', paddingBottom: '10px' }}>
              Applicant Personal Details &amp; Prior Resident Status
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Legal First Name</label>
                <input type="text" value={legalFirstName} onChange={(e) => setLegalFirstName(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Surname</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Date of Birth (ISO 8601)</label>
                <input type="date" className="mono-text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Place of Birth</label>
                <input type="text" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Previous Nationality</label>
                <input type="text" value={previousNationality} onChange={(e) => setPreviousNationality(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Prior NRN (If Lawful Resident)</label>
                <input type="text" className="mono-text" value={priorNrn} onChange={(e) => setPriorNrn(e.target.value)} style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '12px 28px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={18} />
              <span>Submit Naturalization Identity Application</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
