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
  PENSION: 'pension',
  JOB_TITLE: 'job-title',
  START_DATE: 'start-date',
  NOTICE_END: 'notice-end',
  NOTICE_PAY: 'notice-pay',
  NOTICE_LENGTH: 'notice-length',
  NOTICE_LENGTH_WEEKS: 'notice-length-weeks',
  NOTICE_LENGTH_MONTHS: 'notice-length-months',
  NOTICE_TYPE: 'notice-type',
  PAY: 'pay',
  AVERAGE_WEEKLY_HOURS: 'average-weekly-hours',
  BENEFITS: 'benefits',
  NOTICE_PERIOD: 'notice-period',
  NOTICE_PERIOD_WORKING: 'notice-period-working',
  NOTICE_PERIOD_NO_LONGER_WORKING: 'notice-period-no-longer-working',
  STEPS_TO_MAKING_YOUR_CLAIM: 'steps-to-making-your-claim',
  TYPE_OF_CLAIM: 'type-of-claim',
  REASONABLE_ADJUSTMENTS: 'reasonable-adjustments',
  DOCUMENTS: 'documents',
  COMMUNICATING: 'communicating',
  SUPPORT: 'support',
  COMFORTABLE: 'comfortable',
  TRAVEL: 'travel',
  NEW_JOB: 'new-job',
  NEW_JOB_START_DATE: 'new-job-start-date',
  NEW_JOB_PAY: 'new-job-pay',
  CLAIM_SUBMITTED: 'claim-submitted',
  CHECK_ANSWERS: 'check-your-answers',
  SUMMARISE_YOUR_CLAIM: 'summarise-your-claim',
  DESIRED_CLAIM_OUTCOME: 'desired-claim-outcome',
  COMPENSATION_OUTCOME: 'compensation-outcome',
  TRIBUNAL_RECOMMENDATION_OUTCOME: 'tribunal-recommendation-outcome',
  END_DATE: 'end-date',
  PAST_EMPLOYER: 'past-employer',
  TASK_LIST_CHECK: 'tasklist-check',
  FORM: 'form',
} as const;

export const PageUrls = {
  HOME: '/',
  INFO: '/info',
  CHECKLIST: '/checklist',
  CLAIM_SAVED: '/your-claim-has-been-saved',
  CLAIM_STEPS: '/steps-to-making-your-claim',
  CLAIM_SUBMITTED: '/your-claim-has-been-submitted',
  RETURN_TO_EXISTING: '/return-to-existing',
  LIP_OR_REPRESENTATIVE: '/lip-or-representative',
  SINGLE_OR_MULTIPLE_CLAIM: '/single-or-multiple-claim',
  ACAS_MULTIPLE_CLAIM: '/do-you-have-an-acas-no-many-resps',
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
  JOB_TITLE: '/job-title',
  PAST_EMPLOYER: '/past-employer',
  PENSION: '/pension',
  START_DATE: '/start-date',
  NOTICE_END: '/notice-end',
  NOTICE_PAY: '/notice-pay',
  NOTICE_LENGTH: '/notice-length',
  NOTICE_TYPE: '/notice-type',
  PAY: '/pay',
  AVERAGE_WEEKLY_HOURS: '/average-weekly-hours',
  BENEFITS: '/benefits',
  NOTICE_PERIOD: '/got-a-notice-period',
  CHECK_ANSWERS: '/check-your-answers',
  PLACE_OF_WORK: '/place-of-work',
  ADDRESS_LOOK_UP: '/address-lookup',
  REASONABLE_ADJUSTMENTS: '/reasonable-adjustments',
  DOCUMENTS: '/documents',
  COMMUNICATING: '/communicating',
  SUPPORT: '/support',
  COMFORTABLE: '/comfortable',
  TRAVEL: '/travel',
  NEW_JOB: '/new-job',
  NEW_JOB_START_DATE: '/new-job-start-date',
  NEW_JOB_PAY: '/new-job-pay',
  SUMMARISE_YOUR_CLAIM: '/summarise-what-happened',
  DESIRED_CLAIM_OUTCOME: '/what-you-want-from-your-claim',
  COMPENSATION_OUTCOME: '/what-compensation-are-you-seeking',
  TRIBUNAL_RECOMMENDATION_OUTCOME: '/what-tribunal-recommendation-would-you-like',
  END_DATE: '/end-date',
  DOWNLOAD_CLAIM: '/download-claim',
  PERSONAL_DETAILS_CHECK: '/personal-details-check',
} as const;

export const AuthUrls = {
  CALLBACK: '/oauth2/callback',
  LOGIN: '/login',
  LOGOUT: '/logout',
} as const;

export const JavaApiUrls = {
  GET_CASES: 'cases/user-cases',
  INITIATE_CASE_DRAFT: 'cases/initiate-case',
  UPDATE_CASE_DRAFT: 'cases/update-case',
  SUBMIT_CASE: 'cases/submit-case',
  DOWNLOAD_CLAIM_PDF: '/generate-pdf',
} as const;

export const HTTPS_PROTOCOL = 'https://';

export const RedisErrors = {
  REDIS_ERROR: 'redisError',
  DISPLAY_MESSAGE: 'Please try again or return later.',
  FAILED_TO_CONNECT: 'Error when attempting to connect to Redis',
  FAILED_TO_SAVE: 'Error when attempting to save to Redis',
  FAILED_TO_RETREIVE: 'Error when attempting to retreive value from Redis',
  CLIENT_NOT_FOUND: 'Redis client does not exist',
} as const;

export const CaseApiErrors = {
  FAILED_TO_RETREIVE_CASE: 'Error when attempting to retreive draft case from sya-api',
} as const;

export const CcdDataModel = {
  CASE_SOURCE: 'ET1 Online',
} as const;

export const EXISTING_USER = 'existingUser';
export const LOCAL_REDIS_SERVER = '127.0.0.1';
export const CITIZEN_ROLE = 'citizen';
