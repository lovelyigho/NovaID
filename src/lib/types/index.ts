// NovaID (NICRS) National Identity & Civil Registration System Types

export type UserRole =
  | 'NICRA_NATIONAL_ADMIN'
  | 'NICRA_REGIONAL_ADMIN'
  | 'REGISTRATION_CENTRE_ADMIN'
  | 'REGISTRATION_OFFICER'
  | 'VERIFICATION_OFFICER'
  | 'SENIOR_APPROVER'
  | 'DUPLICATE_REVIEW_OFFICER'
  | 'BIRTH_NOTIFICATION_OFFICER'
  | 'IMMIGRATION_OFFICER'
  | 'GOVERNMENT_VERIFICATION_USER'
  | 'COMPLIANCE_OFFICER'
  | 'AUDITOR'
  | 'CITIZEN'
  | 'SYSTEM_SUPPORT_ADMIN';

export type AccessScopeType = 'NATIONWIDE' | 'REGION' | 'CENTRE' | 'QUEUE' | 'INSTITUTION' | 'PERSONAL';

export interface UserSession {
  userId: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  accessScope: AccessScopeType;
  assignedRegion?: string;
  assignedCentreId?: string;
  assignedInstitutionId?: string;
  isMfaEnrolled: boolean;
  status: 'ACTIVE' | 'PENDING_ACTIVATION' | 'SUSPENDED' | 'LOCKED';
}

export type IdentityStatus = 'ACTIVE' | 'PENDING_ENROLMENT' | 'UNDER_REVIEW' | 'RESTRICTED' | 'SUSPENDED' | 'DECEASED';

export type CitizenshipBasis = 'BIRTH_IN_FACILITY' | 'BIRTH_OUTSIDE_FACILITY' | 'LATE_REGISTRATION' | 'NATURALIZATION' | 'RESIDENT';

export interface CitizenRecord {
  id: string; // Internal UUID
  identifierType: 'NSN' | 'NRN';
  nsn: string; // XXXX-XXXX-XXXX
  legalFirstName: string;
  middleName?: string;
  surname: string;
  previousLegalNames: string[];
  dateOfBirth: string; // ISO 8601 YYYY-MM-DD
  placeOfBirth: string;
  sexAtBirth: 'MALE' | 'FEMALE';
  citizenshipStatus: 'CITIZEN' | 'LAWFUL_RESIDENT' | 'REFUGEE';
  basisOfCitizenship: CitizenshipBasis;
  registrationDate: string; // MM/DD/YYYY HH:mm:ss
  registrationSource: string;
  identityStatus: IdentityStatus;
  
  // Relationship
  motherName?: string;
  motherNsn?: string;
  fatherName?: string;
  fatherNsn?: string;
  guardianName?: string;
  guardianNsn?: string;
  relationshipStatus?: string;
  
  // Contact
  residentialAddress: string;
  stateCode: string;
  lgaCode: string;
  zone: string;
  phoneNumber?: string;
  emailAddress?: string;
  preferredNotificationChannel: 'IN_PLATFORM' | 'EMAIL' | 'SMS' | 'GOV_CHANNEL';
  
  // Biometrics & Photo
  photoUrl?: string;
  previousPhotoUrls?: string[];
  hasFacialTemplate: boolean;
  hasFingerprints: boolean;
  biometricExceptionReason?: string;
  
  // Metadata
  registrationCentreId: string;
  creatingOfficerId: string;
  approvalDate?: string;
  recordVersion: number;
  dateOfDeath?: string;
  placeOfDeath?: string;
  
  // Retired identifier link
  retiredNrn?: string;
}

export type RegistrationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_VERIFICATION'
  | 'PENDING_SENIOR_APPROVAL'
  | 'PENDING_DUPLICATE_REVIEW'
  | 'APPROVED'
  | 'RETURNED_FOR_INFO'
  | 'REJECTED'
  | 'APPEALED';

export interface BirthNotification {
  id: string; // Ref e.g. OH-BN-2026-8841
  childFirstName?: string;
  childSurname: string;
  dateTimeOfBirth: string; // MM/DD/YYYY HH:mm:ss
  placeOfBirth: string;
  sexAtBirth: 'MALE' | 'FEMALE';
  birthType: 'SINGLE' | 'TWIN' | 'TRIPLET' | 'MULTIPLE';
  birthOrder?: number;
  motherName?: string;
  motherNsn?: string;
  fatherName?: string;
  fatherNsn?: string;
  attendingProfessional: string;
  healthFacility: string;
  healthFacilityCode: string;
  submittingOfficerId: string;
  notificationDate: string;
  status: 'RECEIVED' | 'EXCEPTION' | 'REGISTERED';
  exceptionNotes?: string;
}

export interface RegistrationApplication {
  id: string; // Ref e.g. APP-2026-9042
  type: 'BIRTH_HOSPITAL' | 'BIRTH_OUTSIDE_HOSPITAL' | 'BIRTH_LATE' | 'NATURALIZATION';
  birthNotificationRef?: string;
  naturalizationRef?: string;
  
  // Subject Info
  firstName: string;
  middleName?: string;
  surname: string;
  dateOfBirth: string; // YYYY-MM-DD
  placeOfBirth: string;
  sexAtBirth: 'MALE' | 'FEMALE';
  
  // Contact & Address
  residentialAddress: string;
  stateCode: string;
  lgaCode: string;
  phoneNumber?: string;
  emailAddress?: string;
  
  // Parents
  motherName?: string;
  motherNsn?: string;
  fatherName?: string;
  fatherNsn?: string;
  
  // Evidence
  evidenceDocuments: {
    id: string;
    title: string;
    type: string;
    url: string;
    status: 'VERIFIED' | 'RECORDED' | 'FLAGGED';
    uploadedAt: string;
  }[];
  
  // Biometrics
  photoCaptured: boolean;
  fingerprintsCaptured: boolean;
  biometricExceptionRecorded?: boolean;
  
  // Late registration / Special notes
  lateReason?: string;
  outsideFacilityReason?: string;
  witnessInfo?: string;
  isLate: boolean; // > 60 days
  isHighRisk: boolean;
  
  // Workflow
  status: RegistrationStatus;
  submittingOfficerId: string;
  registrationCentreId: string;
  assignedVerificationOfficerId?: string;
  assignedSeniorApproverId?: string;
  reviewNotes?: string;
  rejectionReason?: string;
  submittedAt: string;
  updatedAt: string;
  
  // Outcome
  issuedNsn?: string;
}

export interface DuplicateCase {
  id: string; // e.g. DUP-2026-104
  applicationId: string;
  candidateRecordId: CitizenRecord['id'];
  confidenceTier: 'LOW' | 'MEDIUM' | 'HIGH';
  overallMatchScore: number; // 0 - 100
  demographicScore: number;
  facialScore: number;
  fingerprintScore: number;
  differingFields: string[];
  status: 'PENDING_REVIEW' | 'RECOMMENDED_MERGE' | 'RECOMMENDED_SEPARATE' | 'RECOMMENDED_LINK_NRN' | 'RECOMMENDED_FRAUD' | 'APPROVED' | 'OVERRIDDEN';
  assignedOfficerId?: string;
  recommendationNotes?: string;
  seniorApproverId?: string;
  decisionNotes?: string;
  createdAt: string;
}

export interface CorrectionRequest {
  id: string; // e.g. CORR-2026-302
  citizenNsn: string;
  citizenName: string;
  changeCategory: 'MINOR' | 'MATERIAL';
  fieldToUpdate: string;
  currentValue: string;
  proposedValue: string;
  reasonForChange: string;
  evidenceType: string;
  evidenceUrl?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'PENDING_SENIOR_APPROVAL' | 'APPROVED' | 'REJECTED';
  initiatingUserId: string;
  reviewingOfficerId?: string;
  approvingSeniorOfficerId?: string;
  reviewNotes?: string;
  submittedAt: string;
  appliedAt?: string;
}

export interface DeathRegistration {
  id: string; // e.g. DTH-2026-052
  citizenNsn: string;
  citizenName: string;
  dateOfDeath: string; // YYYY-MM-DD
  placeOfDeath: string;
  notifierSource: 'ONEHEALTH_HOSPITAL' | 'CIVIL_CENTRE' | 'FAMILY_REPRESENTATIVE' | 'GOV_AUTHORITY';
  notifierName: string;
  evidenceDocumentUrl?: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REVERSED';
  approvingOfficerId?: string;
  submittedAt: string;
  approvedAt?: string;
}

export interface ConnectedInstitution {
  id: string;
  name: string;
  code: string;
  category: 'HEALTHCARE' | 'IMMIGRATION' | 'LAW_ENFORCEMENT' | 'SOCIAL_SERVICES' | 'OTHER_GOV';
  approvedBusinessPurposes: string[];
  accessibleAttributes: string[];
  dailySearchLimit: number;
  transactionLimit: number;
  credentialExpiryDate: string;
  status: 'ACTIVE' | 'PENDING_ONBOARDING' | 'SUSPENDED' | 'REVOKED';
  businessApprovalDoc: boolean;
  dataProtectionDoc: boolean;
  securityAssessmentDoc: boolean;
  primaryContactEmail: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string; // MM/DD/YYYY HH:mm:ss
  userId: string;
  userName: string;
  userRole: UserRole;
  institutionOrCentre: string;
  action: string; // e.g. 'VIEW_PROFILE', 'NSN_GENERATION', 'MATERIAL_CHANGE_APPROVED'
  approvedPurpose?: string;
  affectedRecordId?: string;
  affectedNsn?: string;
  outcome: 'SUCCESS' | 'BLOCKED' | 'FAILED';
  details: string;
  ipAddress: string;
}

export interface OperationalMetrics {
  totalRegisteredCitizens: number;
  nsnsIssued: number;
  birthRegistrationsYearToDate: number;
  naturalizedRegistrationsYearToDate: number;
  deathRegistrationsYearToDate: number;
  pendingApplicationsCount: number;
  rejectedApplicationsCount: number;
  lateBirthRegistrationsCount: number;
  potentialDuplicatesCount: number;
  correctionRequestsCount: number;
  activeRegistrationCentresCount: number;
  activeConnectedInstitutionsCount: number;
  systemAvailabilityPercent: number;
  statutoryBirthRegistrationRate: number; // target 85%
}
