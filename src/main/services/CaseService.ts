import axios from 'axios';
import { RedisClient } from 'redis';

import { CaseDataCacheKey, YesOrNo } from '../definitions/case';
import { CcdDataModel, RedisErrors } from '../definitions/constants';

export interface initiateCaseDraftResponse {
  id: number;
  jurisdiction: string;
  state: string;
  case_type_id: string;
  created_date: Date;
  last_modified: Date;
  locked_by_user_id?: boolean | null;
  security_level?: string | null;
  case_data: CaseData;
  security_classification: string;
  callback_response_status: string | null;
}

export interface CaseData {
  case_type?: string;
  case_source?: string;
}

export const createCase = async (
  caseType: string,
  accessToken: string,
  url: string
): Promise<initiateCaseDraftResponse> => {
  const conf = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const body = {
    case_type: caseType,
    case_source: CcdDataModel.CASE_SOURCE,
  };

  return axios.post(`${url}/case-type/ET_EnglandWales/event-type/initiateCaseDraft/case`, body, conf);
};

//ToDo - Eventually this should return all the pre-login case data
export const getPreloginCaseData = (redisClient: RedisClient, guid: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    redisClient.get(guid, (err: Error, userData: string) => {
      if (userData) {
        const userDataMap = new Map(JSON.parse(userData));
        switch (String(userDataMap.get(CaseDataCacheKey.IS_SINGLE_CASE)).slice(1, -1)) {
          case YesOrNo.YES:
            resolve(CcdDataModel.SINGLE_CASE_ENGLAND);
            break;
          case YesOrNo.NO:
            resolve(CcdDataModel.MULTIPLE_CASE_ENGLAND);
            break;
        }
      }
      if (err || !userData) {
        const error = new Error(err ? err.message : RedisErrors.REDIS_ERROR);
        error.name = RedisErrors.FAILED_TO_RETREIVE;
        if (err?.stack) {
          error.stack = err.stack;
        }
        reject(error);
      }
    });
  });
};
