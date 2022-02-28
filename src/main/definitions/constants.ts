export const LegacyUrls = {
  ET1: 'https://employmenttribunals.service.gov.uk/en/apply/application-number',
  ET1_BASE: 'https://employmenttribunals.service.gov.uk',
  ET1_APPLY: '/apply',
  ET1_PATH: '/application-number',
  ACAS_EC_URL: 'https://www.acas.org.uk/early-conciliation',
} as const;

export const TranslationKeys = {
  COMMON: 'common',
  HOME: 'home',
  CHECKLIST: 'checklist',
  LIP_OR_REPRESENTATIVE: 'lip-or-representative',
  SINGLE_OR_MULTIPLE_CLAIM: 'single-or-multiple-claim',
  MULTIPLE_RESPONDENT_CHECK: 'multiple-respondent-check',
  ACAS_SINGLE_CLAIM: 'acas-single-claim',
  ACAS_MULTIPLE_CLAIM: 'acas-multiple',
  ADDRESS_DETAILS: 'address-details',
  DATE_OF_BIRTH: 'date-of-birth',
  GENDER_DETAILS: 'gender-details',
  RETURN_TO_EXISTING: 'return-to-existing',
  TELEPHONE_NUMBER: 'telephone-number',
  UPDATE_PREFERENCE: 'update-preference',
  NO_ACAS_NUMBER: 'valid-no-acas-reason',
  STILL_WORKING: 'still-working',
  VIDEO_HEARINGS: 'video-hearings',
  CONTACT_ACAS: 'contact-acas',
  EMPLOYMENT_DETAILS_PENSION: 'employment-details-pension',
  JOB_TITLE: 'job-title',
  STEPS_TO_MAKING_YOUR_CLAIM: 'steps-to-making-your-claim',
  TYPE_OF_CLAIM: 'type-of-claim',
} as const;

export const PageUrls = {
  HOME: '/',
  INFO: '/info',
  CHECKLIST: '/checklist',
  CLAIM_SAVED: '/your-claim-has-been-saved',
  CLAIM_STEPS: '/steps-to-making-your-claim',
  RETURN_TO_EXISTING: '/return-to-existing',
  LIP_OR_REPRESENTATIVE: '/lip-or-representative',
  SINGLE_OR_MULTIPLE_CLAIM: '/single-or-multiple-claim',
  ACAS_SINGLE_CLAIM: '/do-you-have-an-acas-single-resps',
  ACAS_MULTIPLE_CLAIM: '/do-you-have-an-acas-no-many-resps',
  MULTIPLE_RESPONDENT_CHECK: '/multiple-respondent-check',
  NO_ACAS_NUMBER: '/do-you-have-a-valid-no-acas-reason',
  STILL_WORKING: '/are-you-still-working',
  TYPE_OF_CLAIM: '/type-of-claim',
  NEW_ACCOUNT_LANDING: '/new-account-landing',
  DOB_DETAILS: '/dob-details',
  ADDRESS_DETAILS: '/address-details',
  CONTACT_ACAS: '/contact-acas',
  VIDEO_HEARINGS: '/would-you-want-to-take-part-in-video-hearings',
  TELEPHONE_NUMBER: '/telephone-number',
  GENDER_DETAILS: '/gender-details',
  UPDATE_PREFERENCES: '/how-would-you-like-to-be-updated-about-your-claim',
  PRESENT_EMPLOYER: '/present-employer',
  JOB_TITLE: '/job-title',
  PAST_EMPLOYER: '/past-employer',
  EMPLOYMENT_DETAILS_PENSION: '/employment-details-notice-pension',
} as const;

export const AuthUrls = {
  CALLBACK: '/oauth2/callback',
  LOGIN: '/login',
  LOGOUT: '/logout',
} as const;

export const HTTPS_PROTOCOL = 'https://';
