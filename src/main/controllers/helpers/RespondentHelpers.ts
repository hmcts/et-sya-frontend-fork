import { cloneDeep } from 'lodash';

import { Form } from '../../components/form/form';
import { AppRequest } from '../../definitions/appRequest';
import { CaseWithId, Respondent, YesOrNo } from '../../definitions/case';
import { ErrorPages, PageUrls, languages } from '../../definitions/constants';

export const setUserCaseForRespondent = (req: AppRequest, form: Form): void => {
  const formData = form.getParsedBody(cloneDeep(req.body), form.getFormFields());
  const selectedRespondentIndex = getRespondentIndex(req);
  if (!req.session.userCase) {
    req.session.userCase = {} as CaseWithId;
  }
  let respondent: Respondent;
  if (req.session.userCase.respondents === undefined) {
    req.session.userCase.respondents = [];
    respondent = {
      respondentNumber: 1,
    };
    req.session.userCase.respondents.push(respondent);
  } else if (req.session.userCase.respondents.length <= selectedRespondentIndex) {
    respondent = {
      respondentNumber: selectedRespondentIndex + 1,
    };
    req.session.userCase.respondents.push(respondent);
  }
  if (formData.acasCert !== undefined && formData.acasCert === YesOrNo.NO) {
    formData.acasCertNum = undefined;
  }
  if (formData.acasCert === YesOrNo.YES) {
    formData.noAcasReason = undefined;
  }
  Object.assign(req.session.userCase.respondents[selectedRespondentIndex], formData);
};

export const getRespondentIndex = (req: AppRequest): number => {
  return parseInt(req.params.respondentNumber) - 1;
};

export const getRespondentRedirectUrl = (respondentNumber: string | number, pageUrl: string): string => {
  const ValidUrls = Object.values(ValidRespondentUrls);
  for (const url of ValidUrls) {
    const welshUrl = url + languages.WELSH_URL_PARAMETER;
    const englishUrl = url + languages.ENGLISH_URL_PARAMETER;
    if ('/respondent/' + respondentNumber.toString() + pageUrl === url) {
      return url;
    } else if ('/respondent/' + respondentNumber.toString() + pageUrl === welshUrl) {
      return welshUrl;
    } else if ('/respondent/' + respondentNumber.toString() + pageUrl === englishUrl) {
      return englishUrl;
    }
  }
  return ErrorPages.NOT_FOUND;
};

export const mapSelectedRespondentValuesToCase = (selectedRespondentIndex: number, userCase: CaseWithId): void => {
  if (typeof selectedRespondentIndex !== 'undefined' && userCase.respondents !== undefined) {
    userCase.respondentName = userCase.respondents[selectedRespondentIndex]?.respondentName;
    userCase.respondentAddress1 = userCase.respondents[selectedRespondentIndex]?.respondentAddress1;
    userCase.respondentAddress2 = userCase.respondents[selectedRespondentIndex]?.respondentAddress2;
    userCase.respondentAddressTown = userCase.respondents[selectedRespondentIndex]?.respondentAddressTown;
    userCase.respondentAddressCountry = userCase.respondents[selectedRespondentIndex]?.respondentAddressCountry;
    userCase.respondentAddressPostcode = userCase.respondents[selectedRespondentIndex]?.respondentAddressPostcode;
    userCase.acasCert = userCase.respondents[selectedRespondentIndex]?.acasCert;
    userCase.acasCertNum = userCase.respondents[selectedRespondentIndex]?.acasCertNum;
    userCase.noAcasReason = userCase.respondents[selectedRespondentIndex]?.noAcasReason;
  }
};

export const updateWorkAddress = (userCase: CaseWithId, respondent: Respondent): void => {
  userCase.workAddress1 = respondent.respondentAddress1;
  userCase.workAddress2 = respondent.respondentAddress2;
  userCase.workAddressTown = respondent.respondentAddressTown;
  userCase.workAddressCountry = respondent.respondentAddressCountry;
  userCase.workAddressPostcode = respondent.respondentAddressPostcode;
};

const respondent = '/respondent/';
export const ValidRespondentUrls = {
  name1: respondent + 1 + PageUrls.RESPONDENT_NAME,
  name2: respondent + 2 + PageUrls.RESPONDENT_NAME,
  name3: respondent + 3 + PageUrls.RESPONDENT_NAME,
  name4: respondent + 4 + PageUrls.RESPONDENT_NAME,
  name5: respondent + 5 + PageUrls.RESPONDENT_NAME,
  address1: respondent + 1 + PageUrls.RESPONDENT_ADDRESS,
  address2: respondent + 2 + PageUrls.RESPONDENT_ADDRESS,
  address3: respondent + 3 + PageUrls.RESPONDENT_ADDRESS,
  address4: respondent + 4 + PageUrls.RESPONDENT_ADDRESS,
  address5: respondent + 5 + PageUrls.RESPONDENT_ADDRESS,
  acas1: respondent + 1 + PageUrls.ACAS_CERT_NUM,
  acas2: respondent + 2 + PageUrls.ACAS_CERT_NUM,
  acas3: respondent + 3 + PageUrls.ACAS_CERT_NUM,
  acas4: respondent + 4 + PageUrls.ACAS_CERT_NUM,
  acas5: respondent + 5 + PageUrls.ACAS_CERT_NUM,
  noacas1: respondent + 1 + PageUrls.NO_ACAS_NUMBER,
  noacas2: respondent + 2 + PageUrls.NO_ACAS_NUMBER,
  noacas3: respondent + 3 + PageUrls.NO_ACAS_NUMBER,
  noacas4: respondent + 4 + PageUrls.NO_ACAS_NUMBER,
  noacas5: respondent + 5 + PageUrls.NO_ACAS_NUMBER,
  workSame: respondent + 1 + PageUrls.WORK_ADDRESS,
  placeOfWork: respondent + 1 + PageUrls.PLACE_OF_WORK,
} as const;
