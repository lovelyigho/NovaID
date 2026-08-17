// Immutable Audit Logging Engine

import { AuditLogEntry, UserSession } from '../types';

let mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'AUD-2026-9901',
    timestamp: '08/13/2026 14:22:05',
    userId: 'USR-BOOTSTRAP-01',
    userName: 'NICRA IT Root Admin',
    userRole: 'NICRA_NATIONAL_ADMIN',
    institutionOrCentre: 'NICRA HQ',
    action: 'SYSTEM_BOOTSTRAP',
    approvedPurpose: 'Initial System Provisioning',
    outcome: 'SUCCESS',
    details: 'One-time National Administrator root account bootstrapped out-of-band.',
    ipAddress: '10.0.4.12'
  },
  {
    id: 'AUD-2026-9902',
    timestamp: '08/13/2026 14:45:10',
    userId: 'USR-ADMIN-01',
    userName: 'Amina Bello (National Admin)',
    userRole: 'NICRA_NATIONAL_ADMIN',
    institutionOrCentre: 'NICRA HQ',
    action: 'ONBOARD_INSTITUTION',
    approvedPurpose: 'Civil Birth Notification',
    affectedRecordId: 'INST-ONEHEALTH',
    outcome: 'SUCCESS',
    details: 'OneHealth Hospital Network onboarded with credentials expiring 08/13/2027.',
    ipAddress: '10.0.4.15'
  },
  {
    id: 'AUD-2026-9903',
    timestamp: '08/13/2026 15:10:30',
    userId: 'USR-OH-88',
    userName: 'Dr. Michael Chen',
    userRole: 'BIRTH_NOTIFICATION_OFFICER',
    institutionOrCentre: 'Kandova General Hospital (OneHealth)',
    action: 'SUBMIT_BIRTH_NOTIFICATION',
    approvedPurpose: 'Point of Care Birth Registration',
    affectedRecordId: 'OH-BN-2026-8841',
    outcome: 'SUCCESS',
    details: 'Birth notification submitted for child of Mother NSN 7204-3318-9050.',
    ipAddress: '192.168.1.102'
  },
  {
    id: 'AUD-2026-9904',
    timestamp: '08/13/2026 15:35:12',
    userId: 'USR-OFFICER-02',
    userName: 'David Okon',
    userRole: 'REGISTRATION_OFFICER',
    institutionOrCentre: 'Kandova Centre #01',
    action: 'SUBMIT_CIVIL_REGISTRATION',
    approvedPurpose: 'Civil Birth Registration',
    affectedRecordId: 'APP-2026-9042',
    outcome: 'SUCCESS',
    details: 'Civil birth registration created and submitted for validation.',
    ipAddress: '10.12.1.44'
  },
  {
    id: 'AUD-2026-9905',
    timestamp: '08/13/2026 16:05:00',
    userId: 'USR-VERIFY-01',
    userName: 'Sarah Alabi',
    userRole: 'VERIFICATION_OFFICER',
    institutionOrCentre: 'Kandova Regional Queue',
    action: 'APPROVE_REGISTRATION',
    approvedPurpose: 'Application Verification',
    affectedRecordId: 'APP-2026-9042',
    affectedNsn: '7204-8819-4018',
    outcome: 'SUCCESS',
    details: 'Registration application approved. NSN 7204-8819-4018 issued via Luhn check algorithm.',
    ipAddress: '10.12.1.88'
  },
  {
    id: 'AUD-2026-9906',
    timestamp: '08/13/2026 16:40:15',
    userId: 'USR-GOV-VERIFY-09',
    userName: 'Officer Usman (Immigration)',
    userRole: 'GOVERNMENT_VERIFICATION_USER',
    institutionOrCentre: 'Novaria Citizenship & Immigration',
    action: 'IDENTITY_VERIFICATION_QUERY',
    approvedPurpose: 'Passport Application Verification',
    affectedNsn: '7204-3318-9050',
    outcome: 'SUCCESS',
    details: 'Verification query returned MATCH for name and DOB.',
    ipAddress: '10.88.3.12'
  }
];

export function logAuditEvent(
  session: UserSession,
  action: string,
  details: string,
  options?: {
    approvedPurpose?: string;
    affectedRecordId?: string;
    affectedNsn?: string;
    outcome?: 'SUCCESS' | 'BLOCKED' | 'FAILED';
  }
): AuditLogEntry {
  const now = new Date();
  const dateStr = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now
    .getDate()
    .toString()
    .padStart(2, '0')}/${now.getFullYear()}`;
  const timeStr = now.toTimeString().split(' ')[0]; // HH:mm:ss

  const entry: AuditLogEntry = {
    id: `AUD-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: `${dateStr} ${timeStr}`,
    userId: session.userId,
    userName: session.name,
    userRole: session.role,
    institutionOrCentre: session.assignedCentreId || session.assignedInstitutionId || 'NICRA HQ',
    action,
    approvedPurpose: options?.approvedPurpose || 'Standard Operational Duty',
    affectedRecordId: options?.affectedRecordId,
    affectedNsn: options?.affectedNsn,
    outcome: options?.outcome || 'SUCCESS',
    details,
    ipAddress: '127.0.0.1'
  };

  // Prepend to maintain reverse chronological order
  mockAuditLogs = [entry, ...mockAuditLogs];
  return entry;
}

export function getAuditLogs(): AuditLogEntry[] {
  return [...mockAuditLogs];
}
