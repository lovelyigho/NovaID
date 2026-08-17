// NovaID Centralized Mock Data & State Management Store

import {
  CitizenRecord,
  BirthNotification,
  RegistrationApplication,
  DuplicateCase,
  CorrectionRequest,
  DeathRegistration,
  ConnectedInstitution,
  OperationalMetrics,
  UserSession
} from '../types';
import { generateIdentityNumber, formatIdentityNumber } from '../id-generator';

export interface RegistrationCentre {
  id: string;
  name: string;
  code: string;
  stateCode: string;
  lgaCode: string;
  zone: string;
  centreAdminName: string;
  activeOfficersCount: number;
  pendingApplicationsCount: number;
  status: 'ACTIVE' | 'SUSPENDED';
}

// Initial Mock Citizens (All NSN/NRN numbers pass Luhn mod-10)
export const INITIAL_CITIZENS: CitizenRecord[] = [
  {
    id: 'CIT-1001',
    identifierType: 'NSN',
    nsn: '7204-3318-9050',
    legalFirstName: 'Tashara',
    middleName: 'Zahra',
    surname: 'Vashira',
    previousLegalNames: [],
    dateOfBirth: '1995-04-12', // YYYY-MM-DD
    placeOfBirth: 'Kandova General Hospital, Kandova State',
    sexAtBirth: 'FEMALE',
    citizenshipStatus: 'CITIZEN',
    basisOfCitizenship: 'BIRTH_IN_FACILITY',
    registrationDate: '08/10/2026 09:30:00',
    registrationSource: 'Kandova Registration Centre #01',
    identityStatus: 'ACTIVE',
    motherName: 'Dalmin Vashira',
    fatherName: 'Jorato Vashira',
    residentialAddress: '14 Independence Boulevard, Kandova Central',
    stateCode: 'KD',
    lgaCode: 'KD-01',
    zone: 'NORTH',
    phoneNumber: '803 456 7890',
    emailAddress: 'tashara.vashira@example.nv',
    preferredNotificationChannel: 'EMAIL',
    photoUrl: '/tashara_real_photo.jpg',
    hasFacialTemplate: true,
    hasFingerprints: true,
    registrationCentreId: 'CENTRE-KD-01',
    creatingOfficerId: 'USR-OFFICER-01',
    approvalDate: '08/10/2026 11:15:00',
    recordVersion: 1
  },
  {
    id: 'CIT-1002',
    identifierType: 'NSN',
    nsn: '8841-2094-1182',
    legalFirstName: 'Selkiv',
    middleName: 'Mirova',
    surname: 'Tavren',
    previousLegalNames: ['Selkiv Mirova'],
    dateOfBirth: '1988-11-23',
    placeOfBirth: 'Tronto Urban Hospital, Tronto State',
    sexAtBirth: 'MALE',
    citizenshipStatus: 'CITIZEN',
    basisOfCitizenship: 'BIRTH_IN_FACILITY',
    registrationDate: '08/05/2026 14:20:00',
    registrationSource: 'Tronto Central Registration Hub',
    identityStatus: 'ACTIVE',
    motherName: 'Kelmora Tavren',
    fatherName: 'Ormari Tavren',
    residentialAddress: '88 Marina Way, Tronto Urban',
    stateCode: 'TR',
    lgaCode: 'TR-01',
    zone: 'EAST',
    phoneNumber: '802 987 6543',
    emailAddress: 'selkiv.tavren@example.nv',
    preferredNotificationChannel: 'SMS',
    photoUrl: '/emeka_portrait.jpg',
    hasFacialTemplate: true,
    hasFingerprints: true,
    registrationCentreId: 'CENTRE-TR-01',
    creatingOfficerId: 'USR-OFFICER-04',
    approvalDate: '08/05/2026 16:00:00',
    recordVersion: 2
  },
  {
    id: 'CIT-1003',
    identifierType: 'NRN',
    nsn: '9014-5519-3382', // NRN Series
    legalFirstName: 'Jean-Luc',
    middleName: '',
    surname: 'Moreau',
    previousLegalNames: [],
    dateOfBirth: '1990-07-04',
    placeOfBirth: 'Lyon, France',
    sexAtBirth: 'MALE',
    citizenshipStatus: 'LAWFUL_RESIDENT',
    basisOfCitizenship: 'RESIDENT',
    registrationDate: '07/19/2026 10:00:00',
    registrationSource: 'Immigration HQ Enrolment Desk',
    identityStatus: 'ACTIVE',
    residentialAddress: '42 Marina Crest, Victoria Island, Laguna State',
    stateCode: 'LAG',
    lgaCode: 'LAG-02',
    zone: 'WEST',
    phoneNumber: '815 111 2233',
    emailAddress: 'jeanluc.moreau@example.nv',
    preferredNotificationChannel: 'EMAIL',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    hasFacialTemplate: true,
    hasFingerprints: true,
    registrationCentreId: 'CENTRE-IMM-01',
    creatingOfficerId: 'USR-IMM-02',
    approvalDate: '07/19/2026 12:30:00',
    recordVersion: 1
  }
];

export const INITIAL_BIRTH_NOTIFICATIONS: BirthNotification[] = [
  {
    id: 'OH-BN-2026-8841',
    childFirstName: 'Tariq',
    childSurname: 'Bello',
    dateTimeOfBirth: '08/12/2026 04:15:22',
    placeOfBirth: 'Kandova General Hospital',
    sexAtBirth: 'MALE',
    birthType: 'SINGLE',
    birthOrder: 1,
    motherName: 'Fatima Zahra Bello',
    motherNsn: '7204-3318-9050',
    fatherName: 'Ibrahim Bello',
    fatherNsn: '5104-9921-3049',
    attendingProfessional: 'Dr. Michael Chen (MD-4091)',
    healthFacility: 'Kandova General Hospital',
    healthFacilityCode: 'OH-FAC-KD-001',
    submittingOfficerId: 'USR-OH-88',
    notificationDate: '08/12/2026 06:00:00',
    status: 'RECEIVED'
  },
  {
    id: 'OH-BN-2026-8842',
    childFirstName: 'Ada',
    childSurname: 'Okonkwo',
    dateTimeOfBirth: '08/11/2026 21:40:10',
    placeOfBirth: 'Enugu Urban Maternity Clinic',
    sexAtBirth: 'FEMALE',
    birthType: 'SINGLE',
    motherName: 'Chioma Okonkwo',
    motherNsn: '6102-4419-8821',
    attendingProfessional: 'Nurse Mary Nnamdi',
    healthFacility: 'Enugu Maternity Hub',
    healthFacilityCode: 'OH-FAC-ENU-004',
    submittingOfficerId: 'USR-OH-12',
    notificationDate: '08/11/2026 23:15:00',
    status: 'RECEIVED'
  }
];

export const INITIAL_REGISTRATION_APPLICATIONS: RegistrationApplication[] = [
  {
    id: 'APP-2026-9042',
    type: 'BIRTH_HOSPITAL',
    birthNotificationRef: 'OH-BN-2026-8841',
    firstName: 'Tariq',
    middleName: 'Ibrahim',
    surname: 'Bello',
    dateOfBirth: '2026-08-12',
    placeOfBirth: 'Kandova General Hospital, Kandova State',
    sexAtBirth: 'MALE',
    residentialAddress: '14 Independence Boulevard, Kandova Central',
    stateCode: 'KD',
    lgaCode: 'KD-01',
    phoneNumber: '803 456 7890',
    emailAddress: 'fatima.bello@example.nv',
    motherName: 'Fatima Zahra Bello',
    motherNsn: '7204-3318-9050',
    fatherName: 'Ibrahim Bello',
    fatherNsn: '5104-9921-3049',
    evidenceDocuments: [
      {
        id: 'DOC-01',
        title: 'OneHealth Electronic Birth Notification',
        type: 'HOSPITAL_RECORD',
        url: '#',
        status: 'VERIFIED',
        uploadedAt: '08/12/2026 06:00:00'
      },
      {
        id: 'DOC-02',
        title: 'Mother NSN ID Card Scan',
        type: 'IDENTITY_DOCUMENT',
        url: '#',
        status: 'VERIFIED',
        uploadedAt: '08/13/2026 09:30:00'
      }
    ],
    photoCaptured: true,
    fingerprintsCaptured: false, // Minors < 5 age
    biometricExceptionRecorded: false,
    isLate: false,
    isHighRisk: false,
    status: 'SUBMITTED',
    submittingOfficerId: 'USR-OFFICER-01',
    registrationCentreId: 'CENTRE-KD-01',
    assignedVerificationOfficerId: 'USR-VERIFY-01',
    submittedAt: '08/13/2026 09:45:00',
    updatedAt: '08/13/2026 09:45:00'
  },
  {
    id: 'APP-2026-9108',
    type: 'BIRTH_LATE',
    firstName: 'Kabila',
    middleName: 'Yusuf',
    surname: 'Danladi',
    dateOfBirth: '2025-11-10', // > 60 days late
    placeOfBirth: 'Zaria Rural Community, Zaria State',
    sexAtBirth: 'MALE',
    residentialAddress: 'Farmstead Lane, Sabon Gari, Zaria',
    stateCode: 'ZA',
    lgaCode: 'ZA-03',
    motherName: 'Halima Danladi',
    fatherName: 'Yusuf Danladi',
    evidenceDocuments: [
      {
        id: 'DOC-03',
        title: 'Sworn Affidavit of Age Declaration',
        type: 'LEGAL_AFFIDAVIT',
        url: '#',
        status: 'VERIFIED',
        uploadedAt: '08/10/2026 11:20:00'
      },
      {
        id: 'DOC-04',
        title: 'Traditional Birth Attendant Certificate',
        type: 'COMMUNITY_EVIDENCE',
        url: '#',
        status: 'FLAGGED',
        uploadedAt: '08/10/2026 11:20:00'
      }
    ],
    photoCaptured: true,
    fingerprintsCaptured: false,
    lateReason: 'Child born in remote agrarian village during seasonal floods.',
    outsideFacilityReason: 'Nearest health facility was 45km away with flooded roads.',
    isLate: true,
    isHighRisk: true,
    status: 'PENDING_SENIOR_APPROVAL',
    submittingOfficerId: 'USR-OFFICER-03',
    registrationCentreId: 'CENTRE-ZA-02',
    assignedSeniorApproverId: 'USR-SENIOR-01',
    submittedAt: '08/10/2026 11:30:00',
    updatedAt: '08/11/2026 14:00:00'
  },
  {
    id: 'APP-2026-9250',
    type: 'NATURALIZATION',
    naturalizationRef: 'IMM-NAT-2026-0491',
    firstName: 'Jean-Luc',
    surname: 'Moreau',
    dateOfBirth: '1990-07-04',
    placeOfBirth: 'Lyon, France',
    sexAtBirth: 'MALE',
    residentialAddress: '42 Marina Crest, Victoria Island, Laguna State',
    stateCode: 'LAG',
    lgaCode: 'LAG-02',
    phoneNumber: '815 111 2233',
    emailAddress: 'jeanluc.moreau@example.nv',
    evidenceDocuments: [
      {
        id: 'DOC-05',
        title: 'Ministerial Gazette Citizenship Approval Ref #0491',
        type: 'GAZETTE_NOTICE',
        url: '#',
        status: 'VERIFIED',
        uploadedAt: '08/01/2026 09:00:00'
      }
    ],
    photoCaptured: true,
    fingerprintsCaptured: true,
    isLate: false,
    isHighRisk: false,
    status: 'PENDING_DUPLICATE_REVIEW',
    submittingOfficerId: 'USR-IMM-02',
    registrationCentreId: 'CENTRE-IMM-01',
    submittedAt: '08/01/2026 10:00:00',
    updatedAt: '08/02/2026 11:30:00'
  }
];

export const INITIAL_DUPLICATE_CASES: DuplicateCase[] = [
  {
    id: 'DUP-2026-104',
    applicationId: 'APP-2026-9250',
    candidateRecordId: 'CIT-1003',
    confidenceTier: 'MEDIUM',
    overallMatchScore: 78,
    demographicScore: 92,
    facialScore: 84,
    fingerprintScore: 95,
    differingFields: ['citizenshipStatus', 'basisOfCitizenship'],
    status: 'PENDING_REVIEW',
    assignedOfficerId: 'USR-DUP-OFFICER-01',
    createdAt: '08/02/2026 11:30:00'
  }
];

export const INITIAL_CORRECTION_REQUESTS: CorrectionRequest[] = [
  {
    id: 'CORR-2026-302',
    citizenNsn: '7204-3318-9050',
    citizenName: 'Fatima Zahra Bello',
    changeCategory: 'MATERIAL',
    fieldToUpdate: 'legalFirstName',
    currentValue: 'Fatima',
    proposedValue: 'Fatima-Zahra',
    reasonForChange: 'Correction to hyphenated legal name as per updated marriage decree.',
    evidenceType: 'Court Marriage Certificate & Gazette Entry',
    status: 'PENDING_SENIOR_APPROVAL',
    initiatingUserId: 'USR-OFFICER-01',
    reviewingOfficerId: 'USR-VERIFY-01',
    approvingSeniorOfficerId: 'USR-SENIOR-01',
    reviewNotes: 'Verified court documents and gazette publication. Recommending approval.',
    submittedAt: '08/12/2026 16:30:00'
  },
  {
    id: 'CORR-2026-309',
    citizenNsn: '8841-2094-1182',
    citizenName: 'Emeka Chidi Okonkwo',
    changeCategory: 'MINOR',
    fieldToUpdate: 'phoneNumber',
    currentValue: '802 987 6543',
    proposedValue: '802 999 1234',
    reasonForChange: 'Updated mobile phone number.',
    evidenceType: 'OTP Verification Code',
    status: 'APPROVED',
    initiatingUserId: 'CIT-1002',
    submittedAt: '08/13/2026 10:15:00',
    appliedAt: '08/13/2026 10:15:05'
  }
];

export const INITIAL_DEATH_REGISTRATIONS: DeathRegistration[] = [
  {
    id: 'DTH-2026-052',
    citizenNsn: '3109-8812-4011',
    citizenName: 'Usman Garba',
    dateOfDeath: '2026-08-01',
    placeOfDeath: 'Kandova General Hospital',
    notifierSource: 'ONEHEALTH_HOSPITAL',
    notifierName: 'Dr. Michael Chen',
    status: 'APPROVED',
    approvingOfficerId: 'USR-SENIOR-01',
    submittedAt: '08/02/2026 08:00:00',
    approvedAt: '08/02/2026 10:30:00'
  }
];

export const INITIAL_INSTITUTIONS: ConnectedInstitution[] = [
  {
    id: 'INST-ONEHEALTH',
    name: 'OneHealth National Health Network',
    code: 'ONEHEALTH',
    category: 'HEALTHCARE',
    approvedBusinessPurposes: ['Birth Notification', 'Patient Identity Verification'],
    accessibleAttributes: ['NSN', 'legalFirstName', 'surname', 'dateOfBirth', 'sexAtBirth'],
    dailySearchLimit: 50000,
    transactionLimit: 1000,
    credentialExpiryDate: '08/13/2027',
    status: 'ACTIVE',
    businessApprovalDoc: true,
    dataProtectionDoc: true,
    securityAssessmentDoc: true,
    primaryContactEmail: 'integration@onehealth.gov.nv'
  },
  {
    id: 'INST-IMMIGRATION',
    name: 'Novaria Citizenship & Immigration Service',
    code: 'IMMIGRATION',
    category: 'IMMIGRATION',
    approvedBusinessPurposes: ['Naturalization Clearance', 'Passport Verification'],
    accessibleAttributes: ['NSN', 'NRN', 'legalFirstName', 'surname', 'dateOfBirth', 'citizenshipStatus'],
    dailySearchLimit: 20000,
    transactionLimit: 500,
    credentialExpiryDate: '12/31/2026',
    status: 'ACTIVE',
    businessApprovalDoc: true,
    dataProtectionDoc: true,
    securityAssessmentDoc: true,
    primaryContactEmail: 'api@immigration.gov.nv'
  },
  {
    id: 'INST-POLICE',
    name: 'Novaria Police Service',
    code: 'POLICE',
    category: 'LAW_ENFORCEMENT',
    approvedBusinessPurposes: ['Lawful Identity Verification'],
    accessibleAttributes: ['NSN', 'legalFirstName', 'surname', 'dateOfBirth', 'photoUrl'],
    dailySearchLimit: 10000,
    transactionLimit: 200,
    credentialExpiryDate: '06/30/2027',
    status: 'ACTIVE',
    businessApprovalDoc: true,
    dataProtectionDoc: true,
    securityAssessmentDoc: true,
    primaryContactEmail: 'verify@police.gov.nv'
  }
];

export const INITIAL_REGISTRATION_CENTRES: RegistrationCentre[] = [
  {
    id: 'CENTRE-KD-01',
    name: 'Kandova Central Enrolment Centre #01',
    code: 'KD-CENTRE-01',
    stateCode: 'KD',
    lgaCode: 'KD-01',
    zone: 'NORTH',
    centreAdminName: 'Ahmadu Bello',
    activeOfficersCount: 12,
    pendingApplicationsCount: 8,
    status: 'ACTIVE'
  },
  {
    id: 'CENTRE-ZA-02',
    name: 'Zaria Rural Registration Hub #02',
    code: 'ZA-CENTRE-02',
    stateCode: 'ZA',
    lgaCode: 'ZA-03',
    zone: 'NORTH',
    centreAdminName: 'Yusuf Zaria',
    activeOfficersCount: 4,
    pendingApplicationsCount: 14,
    status: 'ACTIVE'
  },
  {
    id: 'CENTRE-LAG-01',
    name: 'Victoria Island Citizen Services Centre',
    code: 'LAG-CENTRE-01',
    stateCode: 'LAG',
    lgaCode: 'LAG-02',
    zone: 'WEST',
    centreAdminName: 'Oluwaseun Adebayo',
    activeOfficersCount: 20,
    pendingApplicationsCount: 5,
    status: 'ACTIVE'
  }
];

export const INITIAL_METRICS: OperationalMetrics = {
  totalRegisteredCitizens: 1942850,
  nsnsIssued: 1942850,
  birthRegistrationsYearToDate: 1424100,
  naturalizedRegistrationsYearToDate: 18450,
  deathRegistrationsYearToDate: 12300,
  pendingApplicationsCount: 1420,
  rejectedApplicationsCount: 310,
  lateBirthRegistrationsCount: 4120,
  potentialDuplicatesCount: 48,
  correctionRequestsCount: 190,
  activeRegistrationCentresCount: 1042,
  activeConnectedInstitutionsCount: 3,
  systemAvailabilityPercent: 99.94,
  statutoryBirthRegistrationRate: 86.4 // Meets 85% target
};
