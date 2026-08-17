'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/ui/AppShell';
import { TweakBar, ScenarioTweaks } from '@/components/ui/TweakBar';
import { UserRole, UserSession } from '@/lib/types';
import { ROLE_CONFIGS } from '@/lib/auth/rbac';

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<UserRole>('NICRA_NATIONAL_ADMIN');
  const [isTweakBarOpen, setIsTweakBarOpen] = useState(false);

  const [tweaks, setTweaks] = useState<ScenarioTweaks>({
    activeRole: 'NICRA_NATIONAL_ADMIN',
    isOfflineMode: false,
    isLateBirthPast60Days: false,
    isBirthOutsideFacility: false,
    duplicateConfidenceTier: 'MEDIUM',
    showNumericScores: true,
    correctionType: 'MATERIAL',
    pushUpdatesToConnectedSystems: true,
    applicantHoldsPriorNrn: false,
    immigrationRefStatus: 'ACTIVE',
    verificationOutcome: 'MATCH',
    staffAccountState: 'ACTIVE',
    isResidentNrnMode: false
  });

  const session: UserSession = {
    userId: 'USR-ADMIN-01',
    username: 'amina.bello',
    name: 'Amina Bello',
    email: 'amina.bello@nicra.gov.nv',
    role: activeRole,
    accessScope: ROLE_CONFIGS[activeRole].defaultScope,
    assignedRegion: activeRole.includes('REGIONAL') ? 'NORTH' : undefined,
    assignedCentreId: activeRole.includes('CENTRE') ? 'CENTRE-KD-01' : undefined,
    isMfaEnrolled: true,
    status: tweaks.staffAccountState
  };

  const handleChangeTweak = <K extends keyof ScenarioTweaks>(key: K, value: ScenarioTweaks[K]) => {
    setTweaks(prev => ({ ...prev, [key]: value }));
    if (key === 'activeRole') {
      setActiveRole(value as UserRole);
    }
  };

  const handleResetTweaks = () => {
    setTweaks({
      activeRole: 'NICRA_NATIONAL_ADMIN',
      isOfflineMode: false,
      isLateBirthPast60Days: false,
      isBirthOutsideFacility: false,
      duplicateConfidenceTier: 'MEDIUM',
      showNumericScores: true,
      correctionType: 'MATERIAL',
      pushUpdatesToConnectedSystems: true,
      applicantHoldsPriorNrn: false,
      immigrationRefStatus: 'ACTIVE',
      verificationOutcome: 'MATCH',
      staffAccountState: 'ACTIVE',
      isResidentNrnMode: false
    });
    setActiveRole('NICRA_NATIONAL_ADMIN');
  };

  return (
    <AppShell
      activeSession={session}
      onRoleChange={(newRole) => { setActiveRole(newRole); handleChangeTweak('activeRole', newRole); }}
      onToggleTweakBar={() => setIsTweakBarOpen(!isTweakBarOpen)}
      isTweakBarOpen={isTweakBarOpen}
    >
      {/* React Context or Prop pass could go here if needed */}
      {children}

      {isTweakBarOpen && (
        <TweakBar
          tweaks={tweaks}
          onChangeTweak={handleChangeTweak}
          onResetTweaks={handleResetTweaks}
          onClose={() => setIsTweakBarOpen(false)}
        />
      )}
    </AppShell>
  );
}
