'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConsentCard } from '@/components/ui/ConsentCard';
import { CheckCircle2, Shield } from 'lucide-react';

export default function LoginConsentPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const handleAuthorize = () => {
    setIsAuthorized(true);
    setTimeout(() => {
      router.push('/portal');
    }, 2000);
  };

  const handleDeny = () => {
    router.push('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'var(--bg-citizen)',
        backgroundImage: 'radial-gradient(circle at 8% -6%, rgba(31,138,134,0.12) 0%, transparent 40%), radial-gradient(circle at 96% 4%, rgba(111,106,184,0.1) 0%, transparent 40%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      {isAuthorized ? (
        <div className="glass-citizen-card" style={{ maxWidth: '440px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '36px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--success-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={32} color="var(--success)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500 }}>
            Authentication Successful
          </h2>
          <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
            Redirecting back to <strong>OneHealth National Health Portal</strong> signed in...
          </div>
        </div>
      ) : (
        <ConsentCard
          requestingServiceName="OneHealth National Health Portal"
          requestingServiceCategory="Healthcare Network"
          requestedAttributes={['Full Legal Name', 'Novaria Social Number (NSN)', 'Date of Birth', 'Sex at Birth']}
          onAuthorize={handleAuthorize}
          onDeny={handleDeny}
          isAuthorizedService={true}
        />
      )}
    </div>
  );
}
