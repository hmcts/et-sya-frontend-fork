import { CaseState, ClaimOutcomes, TypesOfClaim } from './definition';
import { UnknownRecord } from './util-types';

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export interface Case {
  dobDate?: CaseDate;
  address1?: string;
  address2?: string;
  addressTown?: string;
  addressCounty?: string;
  addressPostcode?: string;
  acasMultiple?: YesOrNo;
  updatePreference?: EmailOrPost;
  claimantRepresentedQuestion?: YesOrNo;
  caseType?: CaseType;
  telNumber?: string;
  validNoAcasReason?: YesOrNo;
  returnToExisting?: YesOrNo;
  jobTitle?: string;
  typeOfClaim?: TypesOfClaim[];
  pastEmployer?: YesOrNo;
  noticeEnd?: string;
  noticePeriod?: YesOrNo;
  noticePeriodLength?: string;
  noticePeriodUnitPaid?: WeeksOrMonths;
  noticePeriodPaid?: string;
  noticePeriodAmountPaid?: string;
  noticePeriodUnit?: WeeksOrMonths;
  isStillWorking?: StillWorking;
  workAddress1?: string;
  workAddress2?: string;
  workAddressTown?: string;
  workAddressCounty?: string;
  workAddressPostcode?: string;
  startDate?: CaseDate;
  avgWeeklyHrs?: number;
  payBeforeTax?: number;
  payAfterTax?: number;
  payBeforeTaxInterval?: PayInterval;
  payAfterTaxInterval?: PayInterval;
  employeeBenefits?: YesOrNo;
  benefitsCharCount?: string;
  claimSummaryText?: string;
  claimSummaryFile?: string; //TODO: implement proper upload document object when connecting to api.
  claimOutcome?: ClaimOutcomes[];
  compensationOutcome?: string;
  compensationAmount?: number;
  tribunalRecommendationOutcome?: string;
}

export const enum StillWorking {
  WORKING = 'WORKING',
  NOTICE = 'NOTICE',
  NO_LONGER_WORKING = 'NO LONGER WORKING',
}

export interface CaseWithId extends Case {
  id: string;
  state: CaseState;
}

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}

export const enum CaseType {
  SINGLE = 'Single',
  MULTIPLE = 'Multiple',
}

export const enum WeeksOrMonths {
  WEEKS = 'Weeks',
  MONTHS = 'Months',
}

export const enum EmailOrPost {
  EMAIL = 'Email',
  POST = 'Post',
}

export const enum GenderTitle {
  MR = 'Mr',
  MRS = 'Mrs',
  MISS = 'Miss',
  MS = 'Ms',
  MX = 'Mx',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export const enum PayInterval {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  ANNUAL = 'Annual',
}

export type DateParser = (property: string, body: UnknownRecord) => CaseDate;

export const enum CaseDataCacheKey {
  CLAIMANT_REPRESENTED = 'claimantRepresentedQuestion',
  CASE_TYPE = 'caseType',
  TYPES_OF_CLAIM = 'typesOfClaim',
}
