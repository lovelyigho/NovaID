'use client';

import React from 'react';
import { Sliders, X, RefreshCw } from 'lucide-react';
import { UserRole } from '@/lib/types';
import { ROLE_CONFIGS } from '@/lib/auth/rbac';

export interface ScenarioTweaks {
  // Global
  activeRole: UserRole;
  isOfflineMode: boolean;
  
  // Birth Registration & Verification
  isLateBirthPast60Days: boolean;
  isBirthOutsideFacility: boolean;
  
  // Duplicate Review
  duplicateConfidenceTier: 'LOW' | 'MEDIUM' | 'HIGH';
  showNumericScores: boolean;
  
  // Correction Review
  correctionType: 'MINOR' | 'MATERIAL';
  pushUpdatesToConnectedSystems: boolean;
  
  // Naturalization
  applicantHoldsPriorNrn: boolean;
  immigrationRefStatus: 'ACTIVE' | 'WITHDRAWN' | 'UNVERIFIED';
  
  // Identity Verification
  verificationOutcome: 'MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH' | 'UNDER_REVIEW' | 'RESTRICTED' | 'DECEASED' | 'SERVICE_UNAVAILABLE';
  
  // Staff Sign-in
  staffAccountState: 'ACTIVE' | 'PENDING_ACTIVATION' | 'SUSPENDED' | 'LOCKED';
  
  // Citizen Portal
  isResidentNrnMode: boolean;
}

interface TweakBarProps {
  tweaks: ScenarioTweaks;
  onChangeTweak: <K extends keyof ScenarioTweaks>(key: K, value: ScenarioTweaks[K]) => void;
  onResetTweaks: () => void;
  onClose: () => void;
}

export function TweakBar({ tweaks, onChangeTweak, onResetTweaks, onClose }: TweakBarProps) {
  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        width: '360px',
        maxHeight: '80vh',
        background: 'rgba(20, 35, 42, 0.94)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={18} color="var(--accent)" />
          <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Interactive Scenario Tweaks</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={onResetTweaks} style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', padding: '4px' }} title="Reset defaults">
            <RefreshCw size={14} />
          </button>
          <button onClick={onClose} style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', padding: '4px' }} title="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tweak Controls List */}
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
        {/* Role Switcher */}
        <div>
          <label style={{ color: 'rgba(255, 255, 255, 0.65)', marginBottom: '4px', display: 'block' }}>Simulated User Role</label>
          <select
            value={tweaks.activeRole}
            onChange={(e) => onChangeTweak('activeRole', e.target.value as UserRole)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            {Object.values(ROLE_CONFIGS).map(r => (
              <option key={r.role} value={r.role} style={{ background: '#14232a' }}>{r.title}</option>
            ))}
          </select>
        </div>

        {/* Offline Toggle */}
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <span>Offline / Low-Connectivity Mode</span>
          <input
            type="checkbox"
            checked={tweaks.isOfflineMode}
            onChange={(e) => onChangeTweak('isOfflineMode', e.target.checked)}
          />
        </label>

        {/* Late Birth Toggle */}
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <span>Birth Registration &gt;60 Days (Late)</span>
          <input
            type="checkbox"
            checked={tweaks.isLateBirthPast60Days}
            onChange={(e) => onChangeTweak('isLateBirthPast60Days', e.target.checked)}
          />
        </label>

        {/* Duplicate Confidence Tier */}
        <div>
          <label style={{ color: 'rgba(255, 255, 255, 0.65)', marginBottom: '4px', display: 'block' }}>Duplicate Match Confidence Tier</label>
          <select
            value={tweaks.duplicateConfidenceTier}
            onChange={(e) => onChangeTweak('duplicateConfidenceTier', e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
            style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <option value="LOW" style={{ background: '#14232a' }}>Low Confidence (Auto-proceed candidate)</option>
            <option value="MEDIUM" style={{ background: '#14232a' }}>Medium Confidence (Pause NSN &amp; Officer Review)</option>
            <option value="HIGH" style={{ background: '#14232a' }}>High Confidence (Enhanced Investigation Required)</option>
          </select>
        </div>

        {/* Identity Verification Outcome (7 PRD Outcomes) */}
        <div>
          <label style={{ color: 'rgba(255, 255, 255, 0.65)', marginBottom: '4px', display: 'block' }}>Verification Query Outcome</label>
          <select
            value={tweaks.verificationOutcome}
            onChange={(e) => onChangeTweak('verificationOutcome', e.target.value as ScenarioTweaks['verificationOutcome'])}
            style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <option value="MATCH" style={{ background: '#14232a' }}>Match</option>
            <option value="PARTIAL_MATCH" style={{ background: '#14232a' }}>Partial Match</option>
            <option value="NO_MATCH" style={{ background: '#14232a' }}>No Match</option>
            <option value="UNDER_REVIEW" style={{ background: '#14232a' }}>Record Under Review</option>
            <option value="RESTRICTED" style={{ background: '#14232a' }}>Record Restricted</option>
            <option value="DECEASED" style={{ background: '#14232a' }}>Deceased Status</option>
            <option value="SERVICE_UNAVAILABLE" style={{ background: '#14232a' }}>Service Temporarily Unavailable</option>
          </select>
        </div>

        {/* Citizen Resident NRN Mode */}
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <span>Citizen Resident (NRN) Mode</span>
          <input
            type="checkbox"
            checked={tweaks.isResidentNrnMode}
            onChange={(e) => onChangeTweak('isResidentNrnMode', e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
}
