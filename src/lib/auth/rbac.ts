// Role-Based Access Control (RBAC) & Scope Guard Engine

import { UserRole, AccessScopeType, UserSession, CitizenRecord } from '../types';
import { maskIdentityNumber } from '../id-generator';

export interface RoleConfig {
  role: UserRole;
  title: string;
  defaultScope: AccessScopeType;
  description: string;
  canCreateRegistrations: boolean;
  canVerifyRegistrations: boolean;
  canSeniorApprove: boolean;
  canDuplicateReview: boolean;
  canMaterialChangeApprove: boolean;
  canOnboardInstitutions: boolean;
  canViewAuditLogs: boolean;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  NICRA_NATIONAL_ADMIN: {
    role: 'NICRA_NATIONAL_ADMIN',
    title: 'NICRA National Administrator',
    defaultScope: 'NATIONWIDE',
    description: 'Manage institutions, centres, roles, access policies and national system configuration',
    canCreateRegistrations: false,
    canVerifyRegistrations: false,
    canSeniorApprove: true,
    canDuplicateReview: true,
    canMaterialChangeApprove: true,
    canOnboardInstitutions: true,
    canViewAuditLogs: true,
  },
  NICRA_REGIONAL_ADMIN: {
    role: 'NICRA_REGIONAL_ADMIN',
    title: 'NICRA Regional Administrator',
    defaultScope: 'REGION',
    description: 'Monitor centres, officers and applications within the assigned region',
    canCreateRegistrations: false,
    canVerifyRegistrations: false,
    canSeniorApprove: true,
    canDuplicateReview: true,
    canMaterialChangeApprove: true,
    canOnboardInstitutions: false,
    canViewAuditLogs: true,
  },
  REGISTRATION_CENTRE_ADMIN: {
    role: 'REGISTRATION_CENTRE_ADMIN',
    title: 'Registration Centre Administrator',
    defaultScope: 'CENTRE',
    description: 'Manage centre staff and monitor centre operations',
    canCreateRegistrations: true,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: true,
  },
  REGISTRATION_OFFICER: {
    role: 'REGISTRATION_OFFICER',
    title: 'Registration Officer',
    defaultScope: 'CENTRE',
    description: 'Create and submit registrations and correction requests',
    canCreateRegistrations: true,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: false,
  },
  VERIFICATION_OFFICER: {
    role: 'VERIFICATION_OFFICER',
    title: 'Verification Officer',
    defaultScope: 'QUEUE',
    description: 'Review information, validate evidence, and request clarification',
    canCreateRegistrations: false,
    canVerifyRegistrations: true,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: false,
  },
  SENIOR_APPROVER: {
    role: 'SENIOR_APPROVER',
    title: 'Senior Approver',
    defaultScope: 'REGION',
    description: 'Approve high-risk registrations, material corrections and duplicate resolutions',
    canCreateRegistrations: false,
    canVerifyRegistrations: true,
    canSeniorApprove: true,
    canDuplicateReview: false,
    canMaterialChangeApprove: true,
    canOnboardInstitutions: false,
    canViewAuditLogs: true,
  },
  DUPLICATE_REVIEW_OFFICER: {
    role: 'DUPLICATE_REVIEW_OFFICER',
    title: 'Duplicate Review Officer',
    defaultScope: 'QUEUE',
    description: 'Investigate possible duplicate identities and recommend merge / link / separate',
    canCreateRegistrations: false,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: true,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: true,
  },
  BIRTH_NOTIFICATION_OFFICER: {
    role: 'BIRTH_NOTIFICATION_OFFICER',
    title: 'Birth Notification Officer',
    defaultScope: 'INSTITUTION',
    description: 'Submit and track birth notifications from connected health facilities',
    canCreateRegistrations: true,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: false,
  },
  IMMIGRATION_OFFICER: {
    role: 'IMMIGRATION_OFFICER',
    title: 'Immigration Officer',
    defaultScope: 'INSTITUTION',
    description: 'Submit and confirm naturalization approval references',
    canCreateRegistrations: true,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: false,
  },
  GOVERNMENT_VERIFICATION_USER: {
    role: 'GOVERNMENT_VERIFICATION_USER',
    title: 'Government Verification User',
    defaultScope: 'INSTITUTION',
    description: 'Verify permitted identity attributes for an approved purpose',
    canCreateRegistrations: false,
    canVerifyRegistrations: true,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: false,
  },
  COMPLIANCE_OFFICER: {
    role: 'COMPLIANCE_OFFICER',
    title: 'Compliance Officer',
    defaultScope: 'NATIONWIDE',
    description: 'Review access history, unusual activity and compliance reports',
    canCreateRegistrations: false,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: true,
  },
  AUDITOR: {
    role: 'AUDITOR',
    title: 'Auditor',
    defaultScope: 'NATIONWIDE',
    description: 'Review audit records without modifying identity information',
    canCreateRegistrations: false,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: true,
  },
  CITIZEN: {
    role: 'CITIZEN',
    title: 'Citizen / Resident',
    defaultScope: 'PERSONAL',
    description: 'View permitted personal information, virtual card, and initiate requests',
    canCreateRegistrations: false,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: false,
  },
  SYSTEM_SUPPORT_ADMIN: {
    role: 'SYSTEM_SUPPORT_ADMIN',
    title: 'System Support Administrator',
    defaultScope: 'NATIONWIDE',
    description: 'Monitor system health without routine access to readable citizen records',
    canCreateRegistrations: false,
    canVerifyRegistrations: false,
    canSeniorApprove: false,
    canDuplicateReview: false,
    canMaterialChangeApprove: false,
    canOnboardInstitutions: false,
    canViewAuditLogs: true,
  }
};

/**
 * Checks if an officer can approve a given application (enforcing Conflict of Interest rule).
 * Rule: Submitting officer cannot approve their own application.
 */
export function canApproveApplication(session: UserSession, submittingOfficerId: string): { allowed: boolean; reason?: string } {
  if (session.userId === submittingOfficerId) {
    return {
      allowed: false,
      reason: 'Conflict of Interest: Registration Officers cannot approve applications they created.'
    };
  }

  const config = ROLE_CONFIGS[session.role];
  if (!config.canVerifyRegistrations && !config.canSeniorApprove) {
    return {
      allowed: false,
      reason: `Role '${config.title}' is not authorized to approve applications.`
    };
  }

  return { allowed: true };
}

/**
 * Returns a citizen record with masked fields based on access role and reveal toggle.
 */
export function formatCitizenRecordForView(record: CitizenRecord, session: UserSession, isRevealed: boolean = false): CitizenRecord {
  if (isRevealed || session.role === 'CITIZEN' || session.role === 'NICRA_NATIONAL_ADMIN') {
    return record;
  }

  // System Support Administrators must not have routine access to readable citizen records (PRD 6.1)
  if (session.role === 'SYSTEM_SUPPORT_ADMIN') {
    return {
      ...record,
      nsn: maskIdentityNumber(record.nsn),
      legalFirstName: '••••••••',
      surname: '••••••••',
      residentialAddress: '••••••••••••••••',
      phoneNumber: '••••••••',
      emailAddress: '••••••••'
    };
  }

  // Default masking for standard search/lists
  return {
    ...record,
    nsn: maskIdentityNumber(record.nsn)
  };
}
