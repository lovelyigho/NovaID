'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Printer, Shield, QrCode, Sparkles } from 'lucide-react';
import { CitizenRecord } from '@/lib/types';
import { maskIdentityNumber, formatIdentityNumber } from '@/lib/id-generator';

interface VirtualIdCardProps {
  citizen: CitizenRecord;
  onAuditReveal?: () => void;
}

export function VirtualIdCard({ citizen, onAuditReveal }: VirtualIdCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleToggleReveal = () => {
    if (!isRevealed && onAuditReveal) {
      onAuditReveal();
    }
    setIsRevealed(!isRevealed);
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedNsn = formatIdentityNumber(citizen.nsn);
  const displayedNsn = isRevealed ? formattedNsn : maskIdentityNumber(citizen.nsn);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px', margin: '0 auto' }}>
      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Sparkles size={14} />
          <span>{isFlipped ? 'Show Card Front' : 'Show Card Back'}</span>
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleToggleReveal}
            className="btn-secondary"
            style={{ padding: '6px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
            title={isRevealed ? 'Mask NSN' : 'Reveal full NSN (Audited Event)'}
          >
            {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isRevealed ? 'Mask NSN' : 'Reveal'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-primary"
            style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={14} />
            <span>Print Virtual Card</span>
          </button>
        </div>
      </div>

      {/* Card Wrapper */}
      <div
        className="glass-citizen-card"
        style={{
          width: '100%',
          aspectRatio: '1.586 / 1', // ID Card Standard Ratio
          position: 'relative',
          padding: '22px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(224, 242, 238, 0.72) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 20px 40px -15px rgba(14, 52, 58, 0.25)'
        }}
      >
        {/* Holographic Watermark Effect */}
        <div
          style={{
            position: 'absolute',
            right: '-40px',
            bottom: '-40px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(31, 138, 134, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {!isFlipped ? (
          /* FRONT OF CARD */
          <>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1f8a86, #2f7d9b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Shield size={16} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, color: 'var(--accent-deep)' }}>
                    Federal Republic of Novaria
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--ink)' }}>
                    National Identity Credential
                  </div>
                </div>
              </div>

              <span className="pill pill-success" style={{ fontSize: '10px', padding: '2px 8px' }}>
                {citizen.identifierType}
              </span>
            </div>

            {/* Middle Section: Photo & Identity Details */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', alignItems: 'center' }}>
              <div
                style={{
                  width: '84px',
                  height: '104px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid #ffffff',
                  boxShadow: '0 4px 12px rgba(16, 45, 52, 0.15)',
                  background: '#e0ece9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {citizen.photoUrl ? (
                  <img src={citizen.photoUrl} alt={citizen.legalFirstName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Shield size={32} color="var(--ink-muted)" />
                )}
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--ink-label)' }}>
                    Full Legal Name
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
                    {citizen.legalFirstName} {citizen.middleName ? `${citizen.middleName} ` : ''}{citizen.surname}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '4px' }}>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Date of Birth</div>
                    <div className="mono-text" style={{ fontSize: '11.5px', fontWeight: 500 }}>
                      {citizen.dateOfBirth} {/* Always YYYY-MM-DD */}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Sex / Status</div>
                    <div style={{ fontSize: '11.5px', fontWeight: 500 }}>
                      {citizen.sexAtBirth} · {citizen.citizenshipStatus === 'CITIZEN' ? 'Citizen' : 'Resident'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: NSN Number Display */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px dashed rgba(20, 60, 70, 0.15)', paddingTop: '8px' }}>
              <div>
                <div style={{ fontSize: '9.5px', letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--ink-label)' }}>
                  Novaria Social Number (NSN)
                </div>
                <div className="mono-text" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--accent-deep)', letterSpacing: '0.5px' }}>
                  {displayedNsn}
                </div>
              </div>

              <QrCode size={36} color="var(--ink)" style={{ opacity: 0.8 }} />
            </div>
          </>
        ) : (
          /* BACK OF CARD */
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-label)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Official Civil Registration Record
              </div>
              <div className="mono-text" style={{ fontSize: '10.5px', color: 'var(--ink-meta)' }}>
                Ver: {citizen.recordVersion}.0
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <div>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Place of Registration</div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink)' }}>{citizen.placeOfBirth}</div>
              </div>

              <div>
                <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Residential Address</div>
                <div style={{ fontSize: '12px', color: 'var(--ink)' }}>{citizen.residentialAddress}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Registration Date</div>
                  <div className="mono-text" style={{ fontSize: '11px' }}>{citizen.registrationDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'var(--ink-label)' }}>Authority</div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--accent-deep)' }}>NICRA Novaria</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '9px', color: 'var(--ink-muted)', marginTop: '8px', lineHeight: 1.4 }}>
              This virtual identity credential is issued under the Novaria Identity and Civil Registration Act. Unauthorized tampering or reproduction is strictly prohibited.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
