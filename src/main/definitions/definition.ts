export const enum TypesOfClaim {
  BREACH_OF_CONTRACT = 'breachOfContract',
  DISCRIMINATION = 'discrimination',
}

export const enum ClaimOutcomes {
  COMPENSATION = 'compensation',
  TRIBUNAL_RECOMMENDATION = 'tribunalRecommendation',
  OLD_JOB = 'oldJob',
  ANOTHER_JOB = 'anotherJob',
}

export const enum CaseState {
  DRAFT = 'Draft',
  AWAITING_SUBMISSION_TO_HMCTS = 'AWAITING_SUBMISSION_TO_HMCTS',
  SUBMITTED = 'SUBMITTED',
}
