import axiosService, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import FormData from 'form-data';

import { CaseApiDataResponse } from '../definitions/api/caseApiResponse';
import { DocumentUploadResponse } from '../definitions/api/documentApiResponse';
import { DocumentDetailsResponse } from '../definitions/api/documentDetailsResponse';
import { UserDetails } from '../definitions/appRequest';
import { CaseWithId } from '../definitions/case';
import { TseAdminDecisionItem } from '../definitions/complexTypes/genericTseApplicationTypeItem';
import { SendNotificationTypeItem } from '../definitions/complexTypes/sendNotificationTypeItem';
import { JavaApiUrls } from '../definitions/constants';
import { applicationTypes } from '../definitions/contact-applications';
import { HubLinkStatus } from '../definitions/hub';
import { toApiFormat, toApiFormatCreate } from '../helper/ApiFormatter';

import { axiosErrorDetails } from './AxiosErrorAdapter';

export class CaseApi {
  constructor(private readonly axios: AxiosInstance) {}

  createCase = async (caseData: string, userDetails: UserDetails): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.post(
        JavaApiUrls.INITIATE_CASE_DRAFT,
        toApiFormatCreate(new Map(JSON.parse(caseData)), userDetails)
      );
    } catch (error) {
      throw new Error('Error creating case: ' + axiosErrorDetails(error));
    }
  };

  getUserCases = async (): Promise<AxiosResponse<CaseApiDataResponse[]>> => {
    try {
      return await this.axios.get<CaseApiDataResponse[]>(JavaApiUrls.GET_CASES);
    } catch (error) {
      throw new Error('Error getting user cases: ' + axiosErrorDetails(error));
    }
  };

  downloadClaimPdf = async (caseId: string): Promise<AxiosResponse> => {
    try {
      return await this.axios.post(
        `${JavaApiUrls.DOWNLOAD_CLAIM_PDF}`,
        {
          caseId,
        },
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/pdf',
          },
        }
      );
    } catch (error) {
      throw new Error('Error downloading claim pdf: ' + axiosErrorDetails(error));
    }
  };

  getCaseDocument = async (docId: string): Promise<AxiosResponse> => {
    try {
      return await this.axios.get(`${JavaApiUrls.DOCUMENT_DOWNLOAD}${docId}`, {
        responseType: 'arraybuffer',
      });
    } catch (error) {
      throw new Error('Error fetching document: ' + axiosErrorDetails(error));
    }
  };

  getDocumentDetails = async (docId: string): Promise<AxiosResponse<DocumentDetailsResponse>> => {
    try {
      return await this.axios.get(`${JavaApiUrls.DOCUMENT_DETAILS}${docId}`);
    } catch (error) {
      throw new Error('Error fetching document details: ' + axiosErrorDetails(error));
    }
  };

  updateDraftCase = async (caseItem: CaseWithId): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.UPDATE_CASE_DRAFT, toApiFormat(caseItem));
    } catch (error) {
      throw new Error('Error updating draft case: ' + axiosErrorDetails(error));
    }
  };

  updateHubLinksStatuses = async (caseItem: CaseWithId): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.UPDATE_CASE_SUBMITTED, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        hub_links_statuses: caseItem.hubLinksStatuses,
      });
    } catch (error) {
      throw new Error('Error updating hub links statuses: ' + axiosErrorDetails(error));
    }
  };

  submitClaimantTse = async (caseItem: CaseWithId): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.SUBMIT_CLAIMANT_APPLICATION, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        type_c: applicationTypes.claimant.c.includes(caseItem.contactApplicationType),
        claimant_tse: {
          contactApplicationType: caseItem.contactApplicationType,
          contactApplicationText: caseItem.contactApplicationText,
          contactApplicationFile: caseItem.contactApplicationFile,
          copyToOtherPartyYesOrNo: caseItem.copyToOtherPartyYesOrNo,
          copyToOtherPartyText: caseItem.copyToOtherPartyText,
        },
      });
    } catch (error) {
      throw new Error('Error submitting claimant tse application: ' + axiosErrorDetails(error));
    }
  };

  respondToApplication = async (caseItem: CaseWithId): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.RESPOND_TO_APPLICATION, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        applicationId: caseItem.selectedGenericTseApplication.id,
        supportingMaterialFile: caseItem.supportingMaterialFile,
        isRespondingToRequestOrOrder: caseItem.isRespondingToRequestOrOrder,
        response: {
          response: caseItem.responseText,
          hasSupportingMaterial: caseItem.hasSupportingMaterial,
          copyToOtherParty: caseItem.copyToOtherPartyYesOrNo,
          copyNoGiveDetails: caseItem.copyToOtherPartyText,
        },
      });
    } catch (error) {
      throw new Error('Error responding to tse application: ' + axiosErrorDetails(error));
    }
  };

  changeApplicationStatus = async (
    caseItem: CaseWithId,
    newStatus: HubLinkStatus
  ): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.CHANGE_APPLICATION_STATUS, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        application_id: caseItem.selectedGenericTseApplication.id,
        new_status: newStatus,
      });
    } catch (error) {
      throw new Error('Error changing tse application status: ' + axiosErrorDetails(error));
    }
  };

  updateSendNotificationState = async (caseItem: CaseWithId): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.UPDATE_NOTIFICATION_STATE, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        send_notification_id: caseItem.selectedRequestOrOrder.id,
        notification_state: HubLinkStatus.VIEWED,
      });
    } catch (error) {
      throw new Error('Error updating sendNotification state: ' + axiosErrorDetails(error));
    }
  };

  updateJudgmentNotificationState = async (
    selectedJudgment: SendNotificationTypeItem,
    caseItem: CaseWithId
  ): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.UPDATE_NOTIFICATION_STATE, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        send_notification_id: selectedJudgment.id,
        notification_state: HubLinkStatus.VIEWED,
      });
    } catch (error) {
      throw new Error('Error updating judgment notification state: ' + axiosErrorDetails(error));
    }
  };

  updateDecisionState = async (
    appId: string,
    selectedDecision: TseAdminDecisionItem,
    caseItem: CaseWithId
  ): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.UPDATE_ADMIN_DECISION_STATE, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        app_id: appId,
        admin_decision_id: selectedDecision.id,
      });
    } catch (error) {
      throw new Error('Error updating judgment notification state: ' + axiosErrorDetails(error));
    }
  };

  addResponseSendNotification = async (caseItem: CaseWithId): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.ADD_RESPONSE_TO_SEND_NOTIFICATION, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        send_notification_id: caseItem.selectedRequestOrOrder.id,
        supportingMaterialFile: caseItem.supportingMaterialFile,
        pseResponseType: {
          response: caseItem.responseText,
          hasSupportingMaterial: caseItem.hasSupportingMaterial,
          copyToOtherParty: caseItem.copyToOtherPartyYesOrNo,
          copyNoGiveDetails: caseItem.copyToOtherPartyText,
        },
      });
    } catch (error) {
      throw new Error('Error adding response to sendNotification: ' + axiosErrorDetails(error));
    }
  };

  updateResponseAsViewed = async (
    caseItem: CaseWithId,
    appId: string,
    responseId: string
  ): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.TRIBUNAL_RESPONSE_VIEWED, {
        case_id: caseItem.id,
        case_type_id: caseItem.caseTypeId,
        appId,
        responseId,
      });
    } catch (error) {
      throw new Error('Error updating response to viewed: ' + axiosErrorDetails(error));
    }
  };

  getUserCase = async (id: string): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.post(JavaApiUrls.GET_CASE, { case_id: id });
    } catch (error) {
      throw new Error('Error getting user case: ' + axiosErrorDetails(error));
    }
  };

  submitCase = async (caseItem: CaseWithId): Promise<AxiosResponse<CaseApiDataResponse>> => {
    try {
      return await this.axios.put(JavaApiUrls.SUBMIT_CASE, toApiFormat(caseItem));
    } catch (error) {
      throw new Error('Error submitting case: ' + axiosErrorDetails(error));
    }
  };

  uploadDocument = async (file: UploadedFile, caseTypeId: string): Promise<AxiosResponse<DocumentUploadResponse>> => {
    try {
      const formData: FormData = new FormData();
      formData.append('document_upload', file.buffer, file.originalname);

      return await this.axios.post(JavaApiUrls.UPLOAD_FILE + caseTypeId, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
    } catch (error) {
      throw new Error('Error uploading document: ' + axiosErrorDetails(error));
    }
  };
}

export const getCaseApi = (token: string): CaseApi => {
  return new CaseApi(
    axiosService.create({
      baseURL: config.get('services.etSyaApi.host'),
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })
  );
};

export type UploadedFile =
  | {
      [fieldname: string]: Express.Multer.File;
    }
  | Express.Multer.File;
