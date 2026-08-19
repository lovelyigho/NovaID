'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldCheck,
  User,
  UserCheck,
  Users,
  Search,
  ArrowRight,
  QrCode,
  Smartphone,
  Lock,
  FileCheck,
  Building2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Download,
  Activity,
  Globe,
  MapPin,
  HelpCircle,
  FileDiff,
  Award,
  Eye,
  EyeOff,
  History as HistoryIcon,
  Bell,
  Check,
  Wifi,
  Battery
} from 'lucide-react';
import { NOVARIA_STATES, getLGAsByState } from '@/lib/data/novaria-admin-reference';

function StatCounterSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const val1Ref = React.useRef<HTMLDivElement>(null);
  const val2Ref = React.useRef<HTMLDivElement>(null);
  const val3Ref = React.useRef<HTMLDivElement>(null);
  const val4Ref = React.useRef<HTMLDivElement>(null);

  const hasAnimatedRef = React.useRef(false);

  React.useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.unobserve(element);

          if (prefersReducedMotion) {
            if (val1Ref.current) val1Ref.current.textContent = '38,000,000+';
            if (val2Ref.current) val2Ref.current.textContent = '1,942,850+';
            if (val3Ref.current) val3Ref.current.textContent = '99.94%';
            if (val4Ref.current) val4Ref.current.textContent = '<5 Seconds';
            console.log('[StatCounter] prefers-reduced-motion active: set final values immediately');
            return;
          }

          const startTime = performance.now();
          const durationPerStat = 3000; // Hardcoded exact 3000ms (3.0s) duration per number
          const staggerDelay = 150; // 150ms stagger delay between each stat
          const totalDuration = durationPerStat + (3 * staggerDelay); // 3450ms total sequence

          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;

            // Stat 1: 38,000,000+ (0ms delay)
            const elapsed1 = Math.max(0, elapsed);
            const progress1 = Math.min(elapsed1 / durationPerStat, 1);
            const ease1 = easeOutCubic(progress1);
            const current1 = Math.floor(ease1 * 38000000);
            if (val1Ref.current) val1Ref.current.textContent = current1.toLocaleString('en-US') + '+';

            // Stat 2: 1,942,850+ (150ms delay)
            const elapsed2 = Math.max(0, elapsed - staggerDelay);
            const progress2 = Math.min(elapsed2 / durationPerStat, 1);
            const ease2 = easeOutCubic(progress2);
            const current2 = Math.floor(ease2 * 1942850);
            if (val2Ref.current) val2Ref.current.textContent = current2.toLocaleString('en-US') + '+';

            // Stat 3: 99.94% (300ms delay)
            const elapsed3 = Math.max(0, elapsed - (2 * staggerDelay));
            const progress3 = Math.min(elapsed3 / durationPerStat, 1);
            const ease3 = easeOutCubic(progress3);
            const current3 = (ease3 * 99.94).toFixed(2);
            if (val3Ref.current) val3Ref.current.textContent = current3 + '%';

            // Stat 4: <5 Seconds (450ms delay)
            const elapsed4 = Math.max(0, elapsed - (3 * staggerDelay));
            const progress4 = Math.min(elapsed4 / durationPerStat, 1);
            const ease4 = easeOutCubic(progress4);
            const current4 = Math.floor(ease4 * 5);
            if (val4Ref.current) val4Ref.current.textContent = '<' + current4 + ' Seconds';

            if (elapsed < totalDuration) {
              requestAnimationFrame(animate);
            } else {
              if (val1Ref.current) val1Ref.current.textContent = '38,000,000+';
              if (val2Ref.current) val2Ref.current.textContent = '1,942,850+';
              if (val3Ref.current) val3Ref.current.textContent = '99.94%';
              if (val4Ref.current) val4Ref.current.textContent = '<5 Seconds';
              console.log('[StatCounter] Animation complete! Total elapsed time:', Math.round(elapsed), 'ms (duration per stat: 3000ms, total sequence: 3450ms)');
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: 'var(--bg-nav)', color: '#ffffff', padding: '58px 40px', marginTop: '24px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '32px', textAlign: 'center' }}>
        <div>
          <div ref={val1Ref} style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', fontWeight: 600, color: 'var(--accent-tint)' }}>0+</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginTop: '6px' }}>National Population Baseline</div>
        </div>
        <div>
          <div ref={val2Ref} style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', fontWeight: 600, color: '#3ce09b' }}>0+</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginTop: '6px' }}>Unique NSNs Issued Year-One</div>
        </div>
        <div>
          <div ref={val3Ref} style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', fontWeight: 600, color: '#68c4f0' }}>0.00%</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginTop: '6px' }}>Platform Core Uptime SLA</div>
        </div>
        <div>
          <div ref={val4Ref} style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', fontWeight: 600, color: '#ffffff' }}>&lt;0 Seconds</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginTop: '6px' }}>Instant Inter-Agency Verification</div>
        </div>
      </div>
    </section>
  );
}

export default function WorldClassLandingPage() {
  // Search Bar State (NSN-only public lookup for privacy & security)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // App Demo Feature Switcher (Singpass style)
  const [activeAppFeature, setActiveAppFeature] = useState<'CARD' | 'BIOMETRIC' | 'OAUTH' | 'NOTIFICATIONS'>('CARD');

  // Virtual Card Reveal
  const [isNsnRevealed, setIsNsnRevealed] = useState(false);

  // Centre Locator Filter State
  const [selectedState, setSelectedState] = useState('KD');

  const lgas = getLGAsByState(selectedState);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    // Clean input to 12 digits
    const cleaned = searchQuery.replace(/\D/g, '');

    if (cleaned === '720433189050' || searchQuery.includes('7204-3318-9050')) {
      setSearchResult('MATCH_FOUND: NSN 7204-••••-9050 · Status: ACTIVE · Registration Centre: Kandova Central (KD-01) · Identity Type: Citizen by Birth');
    } else if (cleaned.length === 12) {
      setSearchResult(`MATCH_FOUND: NSN ${cleaned.slice(0, 4)}-••••-${cleaned.slice(8)} · Status: ACTIVE · Registration Centre: Registered Enrolment Centre`);
    } else {
      setSearchResult('RECORD_NOT_FOUND: Public verification requires a valid 12-digit NSN. Full name lookup is restricted to authenticated NICRA officers.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'var(--bg-citizen)',
        backgroundImage:
          'radial-gradient(circle at 10% -5%, rgba(31,138,134,0.18) 0%, transparent 45%), radial-gradient(circle at 90% 12%, rgba(111,106,184,0.14) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(74,158,201,0.16) 0%, transparent 50%)',
        color: 'var(--ink)',
        overflowX: 'hidden'
      }}
    >
      {/* TOP NAVIGATION BAR (High Contrast 18px Navigation Links) */}
      <header
        style={{
          height: '88px',
          padding: '0 44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(20, 60, 70, 0.16)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1f8a86, #2f7d9b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(31, 138, 134, 0.35)'
            }}
          >
            <Shield size={28} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, letterSpacing: '-0.3px', color: 'var(--ink)', lineHeight: 1.1 }}>
              NovaID
            </div>
            <div style={{ fontSize: '14px', color: 'var(--ink-muted)', letterSpacing: '0.5px', fontWeight: 600, marginTop: '2px' }}>
              NICRS National Platform
            </div>
          </div>
        </div>

        {/* Quick Nav Links (High Contrast Prominent 18px Font Size) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px', fontSize: '18px', fontWeight: 600 }}>
          <a href="#overview" style={{ color: '#102026', textDecoration: 'none' }}>Overview</a>
          <a href="#app-showcase" style={{ color: '#102026', textDecoration: 'none' }}>NovaID Mobile &amp; Virtual Card</a>
          <a href="#services" style={{ color: '#102026', textDecoration: 'none' }}>Services</a>
          <a href="#centres" style={{ color: '#102026', textDecoration: 'none' }}>Enrolment Centres</a>
          <a href="#trust" style={{ color: '#102026', textDecoration: 'none' }}>Security &amp; Privacy</a>
        </nav>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/portal" className="btn-secondary" style={{ padding: '12px 24px', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} />
            <span>Citizen Self-Service</span>
          </Link>
          <Link href="/signin" className="btn-primary" style={{ padding: '12px 24px', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} />
            <span>NICRA Staff Console</span>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="overview" style={{ padding: '56px 40px 48px', maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
          {/* Left Column: Headline & Quick Verification */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '20px', background: 'var(--accent-tint)', color: 'var(--accent-deep)', fontSize: '15px', fontWeight: 600, width: 'fit-content' }}>
              <Sparkles size={16} />
              <span>Official National Identity System of Novaria</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 600, letterSpacing: '-1px', lineHeight: 1.15, color: 'var(--ink)' }}>
              Your Trusted Digital Identity For Every Service
            </h1>

            <p style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: '640px', fontWeight: 500 }}>
              NovaID provides every citizen and lawful resident with one authoritative 12-digit identity foundation (NSN). Verify credentials instantly, access digital government platforms, and manage civil registration securely.
            </p>

            {/* Quick Status / NSN Search Widget */}
            <div className="glass-officer-card" style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '6px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--accent-deep)' }}>
                Public NSN Status Lookup
              </div>

              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search size={20} color="var(--ink-muted)" style={{ position: 'absolute', left: '14px' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter 12-digit NSN (e.g. 7204-3318-9050)..."
                    style={{ width: '100%', paddingLeft: '44px', fontSize: '16px', height: '52px' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0 26px', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Verify NSN</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Security Privacy Notice */}
              <div style={{ fontSize: '15px', color: 'var(--ink)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={17} color="var(--accent-deep)" />
                <span>Unauthenticated public lookup returns masked status only. Full identity search requires NICRA officer login.</span>
              </div>

              {searchResult && (
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    fontSize: '15px',
                    lineHeight: 1.5,
                    background: searchResult.startsWith('MATCH') ? 'var(--success-tint)' : 'var(--attention-tint)',
                    color: searchResult.startsWith('MATCH') ? 'var(--success-deep)' : 'var(--attention-deep)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {searchResult.startsWith('MATCH') ? <CheckCircle2 size={20} /> : <HelpCircle size={20} />}
                  <span className="mono-text" style={{ fontWeight: 600 }}>{searchResult}</span>
                </div>
              )}
            </div>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
              <Link href="/portal" className="btn-primary" style={{ padding: '16px 32px', fontSize: '16.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={20} />
                <span>Activate My NovaID Account</span>
              </Link>
              <Link href="/auth/login-consent" className="btn-secondary" style={{ padding: '16px 28px', fontSize: '16.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="var(--accent)" />
                <span>Demo &quot;Log in with NovaID&quot;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Framed Hero Photo & Clean Authentic Virtual Card Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>
            {/* Framed Hero Citizens Photo Banner */}
            <div
              className="rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden w-full"
              style={{
                height: '240px',
                position: 'relative'
              }}
            >
              <img
                src="/hero_modern_identity_center.jpg"
                alt="Ultra-Modern World-Class National Identity Headquarters"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Header Eyebrow */}
            <div style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700, color: 'var(--accent-deep)', width: '100%', textAlign: 'center', marginTop: '4px' }}>
              Interactive Virtual Identity Card Preview
            </div>

            {/* Authentic National ID Credential Card (100% Straight Horizontal Alignment & Razor-Sharp Photo) */}
            <div
              className="glass-citizen-card"
              style={{
                width: '100%',
                maxWidth: '440px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                position: 'relative',
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: '0 12px 36px rgba(14, 52, 58, 0.15)',
                border: '1.5px solid rgba(20, 60, 70, 0.18)',
                borderRadius: '20px',
                transform: 'none'
              }}
            >
              {/* Card Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(20, 60, 70, 0.1)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #1f8a86, #2f7d9b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={22} color="#ffffff" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--accent-deep)', lineHeight: 1.2 }}>
                      Federal Republic of Novaria
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
                      National Identity Credential
                    </div>
                  </div>
                </div>
                <span className="pill pill-success" style={{ fontSize: '13px', fontWeight: 600, padding: '4px 10px', alignSelf: 'center' }}>NSN</span>
              </div>

              {/* Card Body Row: Razor-Sharp Photo + Straight Text Column */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div className="rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex-shrink-0" style={{ width: '96px', height: '128px', aspectRatio: '3 / 4' }}>
                  <img
                    src="/passport_portrait_long_braids.jpg"
                    alt="Citizen Biometric Passport Photo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--accent-deep)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>Citizen Full Name</div>
                    <div style={{ fontSize: '19.5px', fontWeight: 600, color: 'var(--ink)', marginTop: '2px', lineHeight: 1.2 }}>Tashara Zahra Vashira</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '4px', borderTop: '1px dashed rgba(20, 60, 70, 0.12)', paddingTop: '8px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--ink-label)', fontWeight: 600 }}>Date of Birth</div>
                      <div className="mono-text" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>1995-04-12</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--ink-label)', fontWeight: 600 }}>Status</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--success-deep)', marginTop: '2px' }}>Citizen (KD)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(20, 60, 70, 0.12)', paddingTop: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-deep)', fontWeight: 700 }}>
                    Novaria Social Number (NSN)
                  </div>
                  <div className="mono-text" style={{ fontSize: '21px', fontWeight: 600, color: 'var(--accent-deep)' }}>
                    {isNsnRevealed ? '7204-3318-9050' : '••••-••••-9050'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => setIsNsnRevealed(!isNsnRevealed)}
                    style={{ background: 'rgba(31,138,134,0.08)', border: '1px solid rgba(20,60,70,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {isNsnRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
                    <span>{isNsnRevealed ? 'Mask' : 'Reveal'}</span>
                  </button>
                  <QrCode size={38} color="var(--ink)" style={{ flexShrink: 0 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATS IMPACT COUNTER (Count-Up Animated on Viewport Intersection) */}
      <StatCounterSection />

      {/* INTERACTIVE MOBILE APP & VIRTUAL CARD SHOWCASE (Singpass style with REAL SMARTPHONE APP INTERFACE UI) */}
      <section id="app-showcase" style={{ padding: '76px 40px', maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700, color: 'var(--accent-deep)' }}>
            Everyday Digital Convenience
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 600, letterSpacing: '-0.3px', margin: '8px 0 12px' }}>
            Interactive NovaID Mobile App Showcase
          </h2>
          <p style={{ fontSize: '16.5px', color: 'var(--ink-muted)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            Switch between interactive features below to test how citizens manage their virtual card, authenticate with biometric face sign-in, and log into government portals.
          </p>
        </div>

        {/* Feature Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {[
            { id: 'CARD', label: 'Wallet Pass', icon: ShieldCheck },
            { id: 'OAUTH', label: 'Scan / QR Verification', icon: QrCode },
            { id: 'BIOMETRIC', label: 'Security & Biometrics', icon: UserCheck },
            { id: 'NOTIFICATIONS', label: 'Account & Civil Feeds', icon: FileCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeAppFeature === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAppFeature(tab.id as any)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '14px',
                  fontSize: '15.5px',
                  fontWeight: 600,
                  background: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.95)',
                  color: isActive ? '#ffffff' : 'var(--ink)',
                  border: isActive ? 'none' : '1px solid rgba(20,60,70,0.22)',
                  boxShadow: isActive ? '0 8px 24px rgba(31, 138, 134, 0.35)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
              >
                <Icon size={18} />
                <span dangerouslySetInnerHTML={{ __html: tab.label }} />
              </button>
            );
          })}
        </div>

        {/* REAL SMARTPHONE APP UI MOCKUP (Enterprise Modern Mobile Identity Wallet) */}
        <div
          className="glass-officer-card"
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            padding: '52px',
            display: 'flex',
            alignItems: 'center',
            gap: '52px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(226, 243, 240, 0.82))'
          }}
        >
          {/* Real Smartphone Frame Chassis (Spacious Enterprise Proportions) */}
          <div
            style={{
              width: '330px',
              height: '610px',
              borderRadius: '44px',
              background: '#162329',
              border: '9px solid #283740',
              boxShadow: '0 32px 75px rgba(10, 30, 35, 0.42)',
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            {/* Real Smartphone Status Bar & Camera Notch */}
            <div style={{ background: '#f5faf9', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '10px 16px 6px', borderBottom: '1px solid rgba(20,60,70,0.08)' }}>
              <div style={{ width: '68px', height: '4px', background: '#283740', borderRadius: '2px', margin: '0 auto 8px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>
                <span>09:41</span>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Wifi size={13} color="var(--ink)" />
                  <Battery size={14} color="var(--ink)" />
                </div>
              </div>
            </div>

            {/* REAL MOBILE APP LIGHT UI CONTAINER (Spacious Inner Layout) */}
            <div style={{ flex: 1, background: '#f5faf9', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
              
              {/* TAB 1: VIRTUAL ID CARD MOBILE APP VIEW */}
              {activeAppFeature === 'CARD' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Shield size={18} color="var(--accent-deep)" />
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>NovaID Wallet</span>
                    </div>
                    <span style={{ fontSize: '11.5px', background: 'var(--success-tint)', color: 'var(--success-deep)', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>Active</span>
                  </div>

                  {/* Modern Wallet Pass Card with Emblem Watermark & Crisp Contrast */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #103c39 0%, #1a6e6b 50%, #145956 100%)',
                      borderRadius: '20px',
                      padding: '18px 20px',
                      color: '#ffffff',
                      boxShadow: '0 12px 28px rgba(16, 75, 72, 0.35)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Subtle National Emblem Background Watermark */}
                    <div style={{ position: 'absolute', right: '-24px', bottom: '-24px', opacity: 0.08, pointerEvents: 'none', transform: 'rotate(-12deg)' }}>
                      <Shield size={160} color="#ffffff" />
                    </div>

                    {/* Card Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                      <div>
                        <div style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>REPUBLIC OF NOVARIA</div>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, marginTop: '2px', color: '#ffffff' }}>National Identity Credential</div>
                      </div>
                      <span style={{ fontSize: '10.5px', background: 'rgba(255,255,255,0.22)', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, letterSpacing: '0.5px' }}>NSN</span>
                    </div>

                    {/* Card Body: High-Definition Framed Portrait + Bold Name + Single-Line Masked NSN */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                      <div className="rounded-xl overflow-hidden border border-white/20 shadow-sm flex-shrink-0" style={{ width: '68px', height: '88px', aspectRatio: '3 / 4', background: 'transparent' }}>
                        <img
                          src="/passport_portrait_long_braids.jpg"
                          alt="Tashara Zahra Vashira"
                          className="w-full h-full object-cover"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            imageRendering: '-webkit-optimize-contrast'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.8px' }}>CITIZEN FULL NAME</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>Tashara Z. Vashira</div>

                        <div style={{ marginTop: '6px' }}>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.8px' }}>NOVARIA SOCIAL NUMBER</div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginTop: '2px', width: '100%' }}>
                            <span className="mono-text" style={{ fontSize: '13.5px', fontWeight: 700, letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>
                              {isNsnRevealed ? '7204-3318-9050' : '•••• •••• 9050'}
                            </span>
                            <button
                              onClick={() => setIsNsnRevealed(!isNsnRevealed)}
                              style={{ background: 'rgba(255,255,255,0.22)', border: 'none', borderRadius: '6px', padding: '3px 6px', fontSize: '10.5px', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}
                            >
                              {isNsnRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean Separated Interactive QR Action Tile Below Card */}
                  <div className="flex items-center justify-between" style={{ background: '#ffffff', borderRadius: '16px', padding: '14px 16px', border: '1px solid rgba(20,60,70,0.12)', boxShadow: '0 4px 14px rgba(10,30,35,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--accent-tint)', color: 'var(--accent-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <QrCode size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>Quick-Scan Identity QR</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>Tap to present official pass</div>
                      </div>
                    </div>
                    <ChevronRight size={18} color="var(--ink-disabled)" />
                  </div>
                </div>
              )}

              {/* TAB 2: BIOMETRIC FACE SIGN-IN MOBILE APP VIEW */}
              {activeAppFeature === 'BIOMETRIC' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', margin: 'auto 0', textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', border: '3px dashed var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', boxShadow: '0 8px 24px rgba(31,138,134,0.15)' }}>
                    <UserCheck size={52} color="var(--accent-deep)" />
                    <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid var(--success)', opacity: 0.9 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>Biometric Face Match</div>
                    <div style={{ fontSize: '13.5px', color: 'var(--success-deep)', fontWeight: 600, marginTop: '4px' }}>✓ 99.4% Match Confirmed</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>ISO/IEC 39794 Facial Scanner</div>
                  </div>
                  <div style={{ width: '100%', background: 'var(--success-tint)', color: 'var(--success-deep)', border: '1px solid rgba(53,148,108,0.3)', borderRadius: '12px', padding: '10px', fontSize: '13px', fontWeight: 600 }}>
                    Face Match Authenticated
                  </div>
                </div>
              )}

              {/* TAB 3: OAUTH LOG IN WITH NOVAID MOBILE APP VIEW */}
              {activeAppFeature === 'OAUTH' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: 'auto 0' }}>
                  <div style={{ fontSize: '12px', color: 'var(--accent-deep)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>OAuth 2.0 Consent</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>Log in to OneHealth Network</div>
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '12px', border: '1px solid rgba(20,60,70,0.12)', fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ color: 'var(--ink-muted)', fontWeight: 600 }}>Requested Attributes:</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}><Check size={14} color="var(--success)" /> Full Legal Name</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}><Check size={14} color="var(--success)" /> NSN (7204-••••-9050)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}><Check size={14} color="var(--success)" /> Civil Status (Active)</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <div style={{ flex: 1, background: 'var(--accent)', color: '#ffffff', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>Approve</div>
                    <div style={{ flex: 1, background: 'rgba(20,60,70,0.08)', color: 'var(--ink)', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>Cancel</div>
                  </div>
                </div>
              )}

              {/* TAB 4: BIRTH & CIVIL ALERTS MOBILE APP VIEW */}
              {activeAppFeature === 'NOTIFICATIONS' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: 'auto 0' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bell size={16} color="var(--accent-deep)" />
                    <span>Civil Status Feed</span>
                  </div>
                  <div style={{ background: '#ffffff', borderLeft: '4px solid var(--success)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(20,60,70,0.1)', fontSize: '12.5px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>Birth Registration Processed</div>
                    <div style={{ color: 'var(--ink-muted)', marginTop: '3px' }}>Ref: OH-BN-2026-8841 · Kandova Hospital</div>
                  </div>
                  <div style={{ background: '#ffffff', borderLeft: '4px solid var(--accent)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(20,60,70,0.1)', fontSize: '12.5px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>OAuth Login Successful</div>
                    <div style={{ color: 'var(--ink-muted)', marginTop: '3px' }}>Immigration Portal via NovaID</div>
                  </div>
                </div>
              )}
            </div>

            {/* REAL MOBILE BOTTOM APP TAB NAVIGATION BAR (Citizen-Friendly Labels: Wallet, Scan / QR, Security, Account) */}
            <div style={{ background: '#f5faf9', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px', padding: '10px 14px 12px', borderTop: '1px solid rgba(20,60,70,0.12)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: activeAppFeature === 'CARD' ? 'var(--accent-deep)' : 'var(--ink-muted)', cursor: 'pointer' }} onClick={() => setActiveAppFeature('CARD')}>
                <ShieldCheck size={20} />
                <span style={{ fontSize: '11px', fontWeight: 600 }}>Wallet</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: activeAppFeature === 'OAUTH' ? 'var(--accent-deep)' : 'var(--ink-muted)', cursor: 'pointer' }} onClick={() => setActiveAppFeature('OAUTH')}>
                <QrCode size={20} />
                <span style={{ fontSize: '11px', fontWeight: 600 }}>Scan / QR</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: activeAppFeature === 'BIOMETRIC' ? 'var(--accent-deep)' : 'var(--ink-muted)', cursor: 'pointer' }} onClick={() => setActiveAppFeature('BIOMETRIC')}>
                <UserCheck size={20} />
                <span style={{ fontSize: '11px', fontWeight: 600 }}>Security</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: activeAppFeature === 'NOTIFICATIONS' ? 'var(--accent-deep)' : 'var(--ink-muted)', cursor: 'pointer' }} onClick={() => setActiveAppFeature('NOTIFICATIONS')}>
                <User size={20} />
                <span style={{ fontSize: '11px', fontWeight: 600 }}>Account</span>
              </div>
            </div>
          </div>

          {/* Explanatory Text Column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 600, color: 'var(--ink)' }}>
              {activeAppFeature === 'CARD' && 'Virtual ID Card Always In Your Pocket'}
              {activeAppFeature === 'BIOMETRIC' && 'Biometric Passwordless Security'}
              {activeAppFeature === 'OAUTH' && 'Log In To Government Portals Without Password'}
              {activeAppFeature === 'NOTIFICATIONS' && 'Real-Time Birth &amp; Civil Record Updates'}
            </h3>

            <p style={{ fontSize: '16.5px', color: 'var(--ink-muted)', lineHeight: 1.65 }}>
              {activeAppFeature === 'CARD' && 'Citizens can view their official virtual identity card, toggle NSN masking, and verify credentials directly from their mobile app wallet.'}
              {activeAppFeature === 'BIOMETRIC' && 'On-device facial template matching ensures that sensitive biometric data is verified securely against ISO/IEC 39794 standards.'}
              {activeAppFeature === 'OAUTH' && 'Select "Log in with NovaID" on connected portals like OneHealth or Immigration to authenticate safely without managing passwords.'}
              {activeAppFeature === 'NOTIFICATIONS' && 'Receive instant status notifications when hospital birth notifications are processed and NSNs are issued.'}
            </p>

            <Link href="/portal" className="btn-primary" style={{ padding: '12px 24px', fontSize: '15.5px', fontWeight: 600, width: 'fit-content', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>Try Interactive Citizen Portal</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE SERVICES GRID (Singpass & NIA Ghana style) */}
      <section id="services" style={{ background: 'rgba(255, 255, 255, 0.65)', padding: '76px 40px', borderTop: '1px solid rgba(20,60,70,0.12)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700, color: 'var(--accent-deep)' }}>
              National Identity Core Capabilities
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 600, letterSpacing: '-0.3px', margin: '8px 0 12px' }}>
              End-to-End Civil Registration &amp; Verification
            </h2>
            <p style={{ fontSize: '16.5px', color: 'var(--ink-muted)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
              Built according to the Novaria National Identity System Act, providing secure lifecycle management from birth to verification.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '28px' }}>
            <Link href="/auth/login-consent" className="glass-officer-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', textDecoration: 'none', color: 'var(--ink)' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--accent-tint)', color: 'var(--accent-deep)', width: 'fit-content' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 600, margin: 0 }}>Log in with NovaID (OAuth 2.0)</h3>
              <p style={{ fontSize: '15.5px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.6 }}>
                Single sign-on for government portals (OneHealth, Immigration, Tax). Citizens approve attribute sharing per login request.
              </p>
            </Link>

            <Link href="/birth-registration" className="glass-officer-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', textDecoration: 'none', color: 'var(--ink)' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--success-tint)', color: 'var(--success-deep)', width: 'fit-content' }}>
                <FileCheck size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 600, margin: 0 }}>Birth Notification &amp; Enrolment</h3>
              <p style={{ fontSize: '15.5px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.6 }}>
                Hospital point-of-care notifications from OneHealth linked to statutory 60-day civil registration and NSN assignment.
              </p>
            </Link>

            <Link href="/duplicate-review" className="glass-officer-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', textDecoration: 'none', color: 'var(--ink)' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--attention-tint)', color: 'var(--attention-deep)', width: 'fit-content' }}>
                <FileDiff size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 600, margin: 0 }}>De-Duplication &amp; Resolution</h3>
              <p style={{ fontSize: '15.5px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.6 }}>
                Multi-attribute demographic &amp; biometric matching console to ensure each citizen possesses strictly one active NSN.
              </p>
            </Link>

            <Link href="/naturalization" className="glass-officer-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', textDecoration: 'none', color: 'var(--ink)' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(111,106,184,0.12)', color: 'var(--data-2)', width: 'fit-content' }}>
                <Award size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 600, margin: 0 }}>Naturalized Citizen Onboarding</h3>
              <p style={{ fontSize: '15.5px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.6 }}>
                Validates Ministry of Interior approvals, retires prior NRN resident numbers, and links historical records to new NSNs.
              </p>
            </Link>

            <Link href="/identity-verification" className="glass-officer-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', textDecoration: 'none', color: 'var(--ink)' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(74,158,201,0.12)', color: 'var(--data-1)', width: 'fit-content' }}>
                <Globe size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 600, margin: 0 }}>Inter-Agency Verification API</h3>
              <p style={{ fontSize: '15.5px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.6 }}>
                High-throughput verification engine returning statutory outcomes for authorized financial and public sector institutions.
              </p>
            </Link>

            <Link href="/audit-log" className="glass-officer-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', textDecoration: 'none', color: 'var(--ink)' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(20,60,70,0.08)', color: 'var(--ink)', width: 'fit-content' }}>
                <HistoryIcon size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 600, margin: 0 }}>Immutable Audit Logging</h3>
              <p style={{ fontSize: '15.5px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.6 }}>
                Cryptographically logged records of every registration, query, modification, approval, and record reveal across Novaria.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* REGISTRATION CENTRE LOCATOR (NIA Ghana style) */}
      <section id="centres" style={{ padding: '76px 40px', maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700, color: 'var(--accent-deep)' }}>
            Nationwide Coverage across 30 States &amp; NCT
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 600, letterSpacing: '-0.3px', margin: '8px 0 12px' }}>
            Find a Registration Centre Near You
          </h2>
          <p style={{ fontSize: '16.5px', color: 'var(--ink-muted)', maxWidth: '640px', margin: '0 auto' }}>
            Locate authorized NICRA enrolment centres and LGA hubs across Novaria&apos;s 5 geopolitical zones.
          </p>
        </div>

        <div className="glass-officer-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <label style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>Filter by State:</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{ padding: '10px 16px', fontSize: '15.5px', fontWeight: 600, borderRadius: '10px', minWidth: '280px' }}
            >
              {NOVARIA_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name} ({state.zoneCode})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
            {lgas.slice(0, 6).map((lga) => (
              <div key={lga.code} style={{ padding: '18px', borderRadius: '14px', background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(20,60,70,0.14)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '16.5px', fontWeight: 600, color: 'var(--ink)' }}>{lga.name} Enrolment Hub</div>
                  <span className="mono-text" style={{ fontSize: '13.5px', background: 'var(--accent-tint)', color: 'var(--accent-deep)', padding: '4px 9px', borderRadius: '6px', fontWeight: 600 }}>{lga.code}</span>
                </div>
                <div style={{ fontSize: '15px', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} color="var(--accent)" />
                  <span>Main Civic Centre Building</span>
                </div>
                <div style={{ fontSize: '14.5px', color: 'var(--success-deep)', fontWeight: 600, marginTop: '4px' }}>
                  ● Open Mon - Fri (08:00 - 16:00)
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER & STATUTORY DISCLAIMER (High Contrast 15px+ Text) */}
      <footer id="trust" style={{ background: '#0b191e', color: '#ffffff', padding: '64px 40px 36px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={30} color="var(--accent-tint)" />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 600 }}>NovaID</span>
              </div>
              <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.6, maxWidth: '420px' }}>
                National Identity Credential &amp; Registration System (NICRS). Operating under the statutory mandate of the Novaria National Identity System Act.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--accent-tint)' }}>Public Services</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
                <Link href="/portal" style={{ color: '#ffffff', textDecoration: 'none' }}>Citizen Portal</Link>
                <Link href="/auth/login-consent" style={{ color: '#ffffff', textDecoration: 'none' }}>Log in with NovaID</Link>
                <a href="#centres" style={{ color: '#ffffff', textDecoration: 'none' }}>Enrolment Centres</a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--accent-tint)' }}>NICRA Staff</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
                <Link href="/signin" style={{ color: '#ffffff', textDecoration: 'none' }}>Staff Login</Link>
                <Link href="/dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>National Dashboard</Link>
                <Link href="/audit-log" style={{ color: '#ffffff', textDecoration: 'none' }}>Audit Trail</Link>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--accent-tint)' }}>Legal &amp; Privacy</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
                <span style={{ color: '#ffffff' }}>Data Protection Policy</span>
                <span style={{ color: '#ffffff' }}>Security Framework</span>
                <span style={{ color: '#ffffff' }}>Statutory Notice</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', color: 'rgba(255,255,255,0.92)' }}>
            <div>&copy; 2026 Federal Republic of Novaria — National Identity &amp; Civil Registration Authority (NICRA). All rights reserved.</div>
            <div style={{ display: 'flex', gap: '18px', fontWeight: 500 }}>
              <span>Strictly Official Use</span>
              <span>ISO/IEC 39794 Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
