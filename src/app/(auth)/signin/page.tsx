'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, KeyRound, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserRole } from '@/lib/types';
import { ROLE_CONFIGS } from '@/lib/auth/rbac';

export default function StaffSignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState('amina.bello');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('NICRA_NATIONAL_ADMIN');
  const [accountState, setAccountState] = useState<'ACTIVE' | 'PENDING_ACTIVATION' | 'SUSPENDED' | 'LOCKED'>('ACTIVE');
  const [step, setStep] = useState<'CREDENTIALS' | 'MFA_CHALLENGE'>('CREDENTIALS');
  const [mfaCode, setMfaCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (accountState === 'SUSPENDED') {
      setErrorMessage('This account has been suspended. Contact your NICRA administrator.');
      return;
    }
    if (accountState === 'LOCKED') {
      setErrorMessage('Account locked due to repeated failed login attempts. Contact NICRA Security.');
      return;
    }
    if (accountState === 'PENDING_ACTIVATION') {
      setErrorMessage('Account activation pending. Please use your activation email link to complete MFA setup first.');
      return;
    }

    // Proceed to mandatory MFA challenge step for privileged staff
    setStep('MFA_CHALLENGE');
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.length < 6) {
      setErrorMessage('Please enter a valid 6-digit MFA verification code.');
      return;
    }

    // Direct user to appropriate console based on role
    if (selectedRole === 'REGISTRATION_OFFICER' || selectedRole === 'REGISTRATION_CENTRE_ADMIN') {
      router.push('/centre-dashboard');
    } else if (selectedRole === 'VERIFICATION_OFFICER' || selectedRole === 'SENIOR_APPROVER') {
      router.push('/verification-queue');
    } else if (selectedRole === 'DUPLICATE_REVIEW_OFFICER') {
      router.push('/duplicate-review');
    } else if (selectedRole === 'IMMIGRATION_OFFICER' || selectedRole === 'GOVERNMENT_VERIFICATION_USER') {
      router.push('/identity-verification');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #e9f4f1 0%, #f2f5fb 46%, #f7f1f7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        className="glass-officer-card"
        style={{
          maxWidth: '440px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '36px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1f8a86, #2f7d9b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(31, 138, 134, 0.3)'
            }}
          >
            <Shield size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--ink-label)', fontWeight: 600 }}>
              NICRA Back-Office Console
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
              Staff &amp; Officer Sign-In
            </div>
          </div>
        </div>

        {/* Account State Tweak Selector */}
        <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(20, 60, 70, 0.05)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--ink-label)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Simulate Account State:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {(['ACTIVE', 'PENDING_ACTIVATION', 'SUSPENDED', 'LOCKED'] as const).map(st => (
              <button
                key={st}
                type="button"
                onClick={() => { setAccountState(st); setErrorMessage(''); }}
                style={{
                  padding: '5px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  background: accountState === st ? 'var(--accent)' : 'rgba(255,255,255,0.7)',
                  color: accountState === st ? '#fff' : 'var(--ink)',
                  border: 'none'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'var(--critical-tint)',
              border: '1px solid rgba(176, 69, 69, 0.3)',
              color: 'var(--critical-deep)',
              fontSize: '12.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <AlertCircle size={18} color="var(--critical)" />
            <span>{errorMessage}</span>
          </div>
        )}

        {step === 'CREDENTIALS' ? (
          <form onSubmit={handleCredentialsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Select Role for Console Access</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                style={{ width: '100%' }}
              >
                {Object.values(ROLE_CONFIGS).map(rc => (
                  <option key={rc.role} value={rc.role}>{rc.title}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Official Username or Government Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>Authenticate Credentials</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          /* STEP 2: MFA CHALLENGE */
          <form onSubmit={handleMfaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--accent-tint)', color: 'var(--accent-deep)', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <KeyRound size={20} />
              <div>
                <strong>Multi-Factor Authentication Required:</strong> Privileged staff users must enter an authenticator code.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--ink-label)' }}>6-Digit Authenticator Code</label>
              <input
                type="text"
                className="mono-text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                style={{ fontSize: '20px', letterSpacing: '4px', textAlign: 'center' }}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setStep('CREDENTIALS')} className="btn-secondary" style={{ flex: 1 }}>
                Back
              </button>
              <button type="submit" className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} />
                <span>Verify MFA &amp; Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* Bootstrap Note */}
        <div style={{ fontSize: '11px', color: 'var(--ink-meta)', borderTop: '1px solid rgba(20, 60, 70, 0.08)', paddingTop: '14px', lineHeight: 1.4 }}>
          <strong>System Bootstrap Note:</strong> First root National Administrator account is bootstrapped out-of-band by NICRA IT. No open sign-up form exists.
        </div>
      </div>
    </div>
  );
}
