'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Building2,
  FileCheck,
  Users,
  Copy,
  FileDiff,
  Skull,
  UserCheck,
  Search,
  Building,
  FileSpreadsheet,
  History,
  User,
  ChevronLeft,
  ChevronRight,
  Sliders,
  LogOut,
  Bell
} from 'lucide-react';
import { UserRole, UserSession } from '@/lib/types';
import { ROLE_CONFIGS } from '@/lib/auth/rbac';

interface AppShellProps {
  children: React.ReactNode;
  activeSession: UserSession;
  onRoleChange?: (newRole: UserRole) => void;
  onToggleTweakBar?: () => void;
  isTweakBarOpen?: boolean;
}

export function AppShell({
  children,
  activeSession,
  onRoleChange,
  onToggleTweakBar,
  isTweakBarOpen = false
}: AppShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { label: 'National Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['NICRA_NATIONAL_ADMIN', 'NICRA_REGIONAL_ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR'] },
    { label: 'Centre Dashboard', path: '/centre-dashboard', icon: Building2, roles: ['REGISTRATION_CENTRE_ADMIN', 'REGISTRATION_OFFICER'] },
    { label: 'Birth Registration', path: '/birth-registration', icon: FileCheck, roles: ['REGISTRATION_OFFICER', 'REGISTRATION_CENTRE_ADMIN', 'BIRTH_NOTIFICATION_OFFICER'] },
    { label: 'Verification Queue', path: '/verification-queue', icon: Users, roles: ['VERIFICATION_OFFICER', 'SENIOR_APPROVER'] },
    { label: 'Duplicate Review', path: '/duplicate-review', icon: Copy, roles: ['DUPLICATE_REVIEW_OFFICER', 'SENIOR_APPROVER'] },
    { label: 'Correction Review', path: '/correction-review', icon: FileDiff, roles: ['VERIFICATION_OFFICER', 'SENIOR_APPROVER'] },
    { label: 'Death Registration', path: '/death-registration', icon: Skull, roles: ['SENIOR_APPROVER', 'VERIFICATION_OFFICER'] },
    { label: 'Naturalization', path: '/naturalization', icon: UserCheck, roles: ['REGISTRATION_OFFICER', 'IMMIGRATION_OFFICER'] },
    { label: 'Identity Verification', path: '/identity-verification', icon: Search, roles: ['GOVERNMENT_VERIFICATION_USER', 'IMMIGRATION_OFFICER'] },
    { label: 'Institution Access', path: '/institution-access', icon: Building, roles: ['NICRA_NATIONAL_ADMIN'] },
    { label: 'Staff Provisioning', path: '/staff-provisioning', icon: Users, roles: ['NICRA_NATIONAL_ADMIN', 'NICRA_REGIONAL_ADMIN'] },
    { label: 'Reports', path: '/reports', icon: FileSpreadsheet, roles: ['NICRA_NATIONAL_ADMIN', 'NICRA_REGIONAL_ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR', 'SENIOR_APPROVER'] },
    { label: 'Audit Log', path: '/audit-log', icon: History, roles: ['NICRA_NATIONAL_ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR', 'SYSTEM_SUPPORT_ADMIN'] },
    { label: 'Citizen Portal', path: '/portal', icon: User, roles: ['CITIZEN'] },
  ];

  // Filter nav items based on active role
  const visibleNav = navItems.filter(item => item.roles.includes(activeSession.role));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar Nav Rail */}
      <aside
        style={{
          width: isCollapsed ? '76px' : '244px',
          minWidth: isCollapsed ? '76px' : '244px',
          background: 'var(--bg-nav)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s ease, min-width 0.2s ease',
          zIndex: 100,
          boxShadow: '4px 0 24px rgba(10, 30, 35, 0.35)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto'
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: isCollapsed ? '20px 14px' : '22px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1f8a86, #2f7d9b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(31, 138, 134, 0.4)'
              }}
            >
              <Shield size={20} color="#ffffff" />
            </div>
            {!isCollapsed && (
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                  NovaID
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.55)', letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: '2px' }}>
                  NICRS National Platform
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={isCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: isCollapsed ? '12px' : '10px 14px',
                  borderRadius: '10px',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.68)',
                  background: isActive ? 'rgba(31, 138, 134, 0.28)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                  fontWeight: isActive ? 500 : 400,
                  fontSize: '13px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  transition: 'all 0.15s ease'
                }}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18} color={isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.65)'} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher & User Footer */}
        <div style={{ padding: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(0, 0, 0, 0.15)' }}>
          {!isCollapsed ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.8px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.45)' }}>
                Active Role Simulator
              </div>
              <select
                value={activeSession.role}
                onChange={(e) => onRoleChange && onRoleChange(e.target.value as UserRole)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  fontSize: '11.5px',
                  padding: '6px 8px'
                }}
              >
                {Object.values(ROLE_CONFIGS).map(rc => (
                  <option key={rc.role} value={rc.role} style={{ background: '#123035', color: '#fff' }}>
                    {rc.title}
                  </option>
                ))}
              </select>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  {activeSession.name.charAt(0)}
                </div>
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeSession.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeSession.email}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
                title={`${activeSession.name} (${ROLE_CONFIGS[activeSession.role].title})`}
              >
                {activeSession.name.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'auto' }}>
        {/* Top Operational Status Bar */}
        <header
          style={{
            height: '60px',
            padding: '0 28px',
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(20, 60, 70, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 90
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--ink-label)' }}>
              Scope:
            </span>
            <span className="pill pill-accent">
              <span className="pill-dot" />
              {activeSession.accessScope} ({activeSession.assignedRegion || activeSession.assignedCentreId || 'Nationwide'})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {onToggleTweakBar && (
              <button
                onClick={onToggleTweakBar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: isTweakBarOpen ? 'var(--accent-tint)' : 'rgba(20, 60, 70, 0.06)',
                  color: isTweakBarOpen ? 'var(--accent-deep)' : 'var(--ink)',
                  fontSize: '12px'
                }}
              >
                <Sliders size={15} />
                <span>Scenario Tweaks</span>
              </button>
            )}

            <div style={{ position: 'relative', cursor: 'pointer', padding: '6px' }}>
              <Bell size={18} color="var(--ink-muted)" />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', background: 'var(--attention)' }} />
            </div>

            <Link href="/signin" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--critical)', fontSize: '12px', marginLeft: '6px' }}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: '26px 32px 60px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
