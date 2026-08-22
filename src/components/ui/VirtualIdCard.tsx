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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
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
          position: 'relative',
          padding: '24px 26px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(224, 242, 238, 0.82) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 20px 40px -15px rgba(14, 52, 58, 0.25)',
          borderRadius: '20px'
        }}
      >
        {/* Holographic Watermark Effect (Subtle Low-Opacity Background Watermark) */}
        <div
          style={{
            position: 'absolute',
            right: '-30px',
            bottom: '-30px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(31, 138, 134, 0.03) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {!isFlipped ? (
          /* FRONT OF CARD */
          <>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9px',
                    background: 'linear-gradient(135deg, #1f8a86, #2f7d9b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Shield size={18} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--accent-deep)' }}>
                    Federal State of Novaria
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>
                    National Identity Credential
                  </div>
                </div>
              </div>

              <span className="pill pill-success" style={{ fontSize: '10.5px', padding: '3px 10px', fontWeight: 600 }}>
                {citizen.identifierType}
              </span>
            </div>

            {/* Middle Section: Prominent Citizen Photo & Identity Details */}
            <div style={{ display: 'flex', gap: '18px', marginTop: '16px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              {/* Prominent Portrait Container (~45% Larger, White Framing, High-Res Sharpness) */}
              <div
                style={{
                  width: '120px',
                  height: '150px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '3px solid #ffffff',
                  boxShadow: '0 8px 20px rgba(16, 45, 52, 0.18), inset 0 0 0 1px rgba(20, 60, 70, 0.08)',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {citizen.photoUrl ? (
                  <img
                    src={citizen.photoUrl}
                    alt={citizen.legalFirstName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      imageRendering: '-webkit-optimize-contrast'
                    }}
                  />
                ) : (
                  <Shield size={40} color="var(--ink-muted)" />
                )}
              </div>

              {/* Rebalanced Citizen Information Column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--ink-label)', fontWeight: 700 }}>
                    CITIZEN FULL NAME
                  </div>
                  <div style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginTop: '2px' }}>
                    {citizen.legalFirstName} {citizen.middleName ? `${citizen.middleName} ` : ''}{citizen.surname}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px', borderTop: '1px dashed rgba(20, 60, 70, 0.12)', paddingTop: '6px' }}>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-label)', fontWeight: 600 }}>Date of Birth</div>
                    <div className="mono-text" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', marginTop: '1px' }}>
                      {citizen.dateOfBirth}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9.5px', color: 'var(--ink-label)', fontWeight: 600 }}>Sex / Status</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', marginTop: '1px' }}>
                      {citizen.sexAtBirth} · {citizen.citizenshipStatus === 'CITIZEN' ? 'Citizen' : 'Resident'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: NSN Number Display */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '14px', borderTop: '1px dashed rgba(20, 60, 70, 0.15)', paddingTop: '10px', position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--ink-label)', fontWeight: 700 }}>
                  NOVARIA SOCIAL NUMBER (NSN)
                </div>
                <div className="mono-text" style={{ fontSize: '17.5px', fontWeight: 700, color: 'var(--accent-deep)', letterSpacing: '0.5px', marginTop: '2px' }}>
                  {displayedNsn}
                </div>
              </div>

              <QrCode size={38} color="var(--ink)" style={{ opacity: 0.85, flexShrink: 0 }} />
            </div>
          </>
        ) : (
          /* BACK OF CARD */
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-label)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Official Civil Registration Record
              </div>
              <div className="mono-text" style={{ fontSize: '11px', color: 'var(--ink-meta)', fontWeight: 600 }}>
                Ver: {citizen.recordVersion}.0
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--ink-label)', fontWeight: 700 }}>Place of Registration</div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--ink)', marginTop: '1px' }}>{citizen.placeOfBirth}</div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: 'var(--ink-label)', fontWeight: 700 }}>Residential Address</div>
                <div style={{ fontSize: '12.5px', color: 'var(--ink)', marginTop: '1px' }}>{citizen.residentialAddress}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-label)', fontWeight: 700 }}>Registration Date</div>
                  <div className="mono-text" style={{ fontSize: '11.5px', fontWeight: 600, marginTop: '1px' }}>{citizen.registrationDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-label)', fontWeight: 700 }}>Authority</div>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--accent-deep)', marginTop: '1px' }}>NICRA Novaria</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)', marginTop: '12px', lineHeight: 1.4, position: 'relative', zIndex: 1 }}>
              This virtual identity credential is issued under the Novaria Identity and Civil Registration Act. Unauthorized tampering or reproduction is strictly prohibited.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
