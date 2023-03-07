import { ClaimantCorrespondence } from '../complexTypes/claimantCorrespondence';
import { ClaimantEmploymentDetails } from '../complexTypes/claimantEmploymentDetails';
import { ClaimantHearingPreference } from '../complexTypes/claimantHearingPreference';
import { ClaimantIndividual } from '../complexTypes/claimantIndividual';
import { ClaimantRequests } from '../complexTypes/claimantRequests';
import { NewEmploymentDetails } from '../complexTypes/newEmploymentDetails';
import { RespondentType } from '../complexTypes/respondent';
import { TaskListCheckType } from '../complexTypes/taskListCheckType';
import { WorkAddressDetails } from '../complexTypes/workAddressDetails';
import { HubLinksStatuses } from '../hub';
import {TriageQuestions} from "../complexTypes/triageQuestions";

interface CaseDataApiBody {
  caseType: string;
  typesOfClaim: string[];
  ClaimantPcqId?: string;
  claimantRepresentedQuestion: string;
  claimant_TypeOfClaimant?: string;
  caseSource: string;
  claimantIndType?: ClaimantIndividual;
  claimantType?: ClaimantCorrespondence;
  claimantHearingPreference?: ClaimantHearingPreference;
  claimantTaskListChecks?: TaskListCheckType;
  claimantOtherType?: ClaimantEmploymentDetails;
  claimantRequests?: ClaimantRequests;
  triageQuestions?: TriageQuestions;
  newEmploymentType?: NewEmploymentDetails;
  respondentCollection?: RespondentRequestBody[];
  claimantWorkAddressQuestion?: string;
  claimantWorkAddress?: WorkAddressDetails;
  hubLinksStatuses?: HubLinksStatuses;
}

export interface CreateCaseBody {
  post_code: string;
  case_data: CaseDataApiBody;
}

export interface UpdateCaseBody {
  case_id: string;
  case_type_id: string;
  case_data: CaseDataApiBody;
}

export interface RespondentRequestBody {
  value: RespondentType;
  id?: string;
}
