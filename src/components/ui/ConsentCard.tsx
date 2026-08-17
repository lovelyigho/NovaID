'use client';

import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

interface ConsentCardProps {
  requestingServiceName: string;
  requestingServiceCategory: string;
  requestedAttributes: string[];
  neverSharedAttributes?: string[];
  onAuthorize: () => void;
  onDeny: () => void;
  isAuthorizedService?: boolean;
}

export function ConsentCard({
  requestingServiceName,
  requestingServiceCategory,
  requestedAttributes,
  neverSharedAttributes = ['Password', 'NovaID PIN', 'Biometric Templates & Photographs', 'Audit Log History'],
  onAuthorize,
  onDeny,
  isAuthorizedService = true
}: ConsentCardProps) {
  return (
    <div className="glass-citizen-card" style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(20, 60, 70, 0.1)', paddingBottom: '16px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: isAuthorizedService ? 'linear-gradient(135deg, #1f8a86, #2f7d9b)' : 'var(--critical-tint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(31, 138, 134, 0.3)'
          }}
        >
          {isAuthorizedService ? <ShieldCheck size={24} color="#ffffff" /> : <AlertTriangle size={24} color="var(--critical)" />}
        </div>

        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.9px', color: 'var(--ink-label)', fontWeight: 500 }}>
            Log in with NovaID
          </div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
            {requestingServiceName}
          </div>
        </div>
      </div>

      {!isAuthorizedService ? (
        <div
          style={{
            padding: '16px',
            borderRadius: '14px',
            background: 'var(--critical-tint)',
            border: '1px solid rgba(176, 69, 69, 0.3)',
            color: 'var(--critical-deep)',
            fontSize: '13px',
            lineHeight: 1.55
          }}
        >
          <strong>Security Warning:</strong> This application ({requestingServiceName}) is not registered or approved by NICRA to use the &quot;Log in with NovaID&quot; authentication service. Authentication has been blocked.
        </div>
      ) : (
        <>
          <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
            <strong>{requestingServiceName}</strong> ({requestingServiceCategory}) is requesting permission to verify your identity.
          </div>

          {/* Requested Attributes List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Attributes to be shared:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {requestedAttributes.map((attr, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '5px 11px',
                    borderRadius: '8px',
                    background: 'var(--accent-tint)',
                    color: 'var(--accent-deep)',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>

          {/* Never Shared Security Guarantee */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(20, 60, 70, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 600, color: 'var(--success-deep)' }}>
              <Lock size={14} color="var(--success)" />
              <span>Privacy Guarantee: Never shared with external services</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
              {neverSharedAttributes.join(' · ')}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              onClick={onDeny}
              className="btn-secondary"
              style={{ flex: 1, padding: '11px' }}
            >
              Cancel
            </button>
            <button
              onClick={onAuthorize}
              className="btn-primary"
              style={{ flex: 1.5, padding: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>Authorize &amp; Continue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
