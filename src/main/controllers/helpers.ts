import { Response } from 'express';
import { cloneDeep } from 'lodash';
import { parse } from 'postcode';
import { LoggerInstance } from 'winston';

import { isFirstDateBeforeSecond } from '../components/form/dateValidators';
import { Form } from '../components/form/form';
import {
  arePayValuesNull,
  isAcasNumberValid,
  isFieldFilledIn,
  isPayIntervalNull,
  isValidNoticeLength,
  isValidTwoDigitInteger,
} from '../components/form/validator';
import { AppRequest } from '../definitions/appRequest';
import {
  CaseDataCacheKey,
  CaseDate,
  CaseType,
  CaseWithId,
  HearingPreference,
  Respondent,
  StillWorking,
  YesOrNo,
  YesOrNoOrNotSure,
} from '../definitions/case';
import { PageUrls, mvpLocations } from '../definitions/constants';
import { sectionStatus } from '../definitions/definition';
import { FormContent, FormError, FormField, FormFields, FormInput, FormOptions } from '../definitions/form';
import { AnyRecord } from '../definitions/util-types';
import { getCaseApi } from '../services/CaseService';

export const getPageContent = (
  req: AppRequest,
  formContent: FormContent,
  translations: string[] = [],
  selectedRespondentIndex?: number
): AnyRecord => {
  const sessionErrors = req.session?.errors || [];
  const userCase = req.session?.userCase;
  mapSelectedRespondentValuesToCase(selectedRespondentIndex, userCase);

  let content = {
    form: formContent,
    sessionErrors,
    userCase,
    PageUrls,
  };
  translations.forEach(t => {
    content = { ...content, ...req.t(t, { returnObjects: true }) };
  });
  return content;
};

export const getCustomStartDateError = (req: AppRequest, form: Form, formData: Partial<CaseWithId>): FormError => {
  const dob = req.session.userCase.dobDate;
  const startDate = formData.startDate;

  if (startDate && dob && isFirstDateBeforeSecond(startDate, dob)) {
    return { errorType: 'invalidDateBeforeDOB', propertyName: Object.keys(form.getFormFields())[0] };
  }
};

export const getCustomNoticeLengthError = (req: AppRequest, formData: Partial<CaseWithId>): FormError => {
  const employmentStatus = req.session.userCase.isStillWorking;
  const noticeLength = formData.noticePeriodLength;

  if (employmentStatus !== StillWorking.NOTICE && noticeLength === '') {
    const invalid = isValidTwoDigitInteger(noticeLength);
    if (invalid) {
      return { errorType: invalid, propertyName: 'noticePeriodLength' };
    }
  } else {
    const errorType = isValidNoticeLength(noticeLength);
    if (errorType) {
      return { errorType, propertyName: 'noticePeriodLength' };
    }
  }
};

export const getPartialPayInfoError = (formData: Partial<CaseWithId>): FormError[] => {
  const payBeforeTax = formData.payBeforeTax;
  const payAfterTax = formData.payAfterTax;
  const payInterval = formData.payInterval;

  const required = isPayIntervalNull(payInterval);
  if (required) {
    return payIntervalError(payBeforeTax, payAfterTax);
  }

  if (payInterval) {
    const errorType = arePayValuesNull([`${payBeforeTax || ''}`, `${payAfterTax || ''}`]);
    if (errorType) {
      return [
        { errorType, propertyName: 'payBeforeTax' },
        { errorType, propertyName: 'payAfterTax' },
      ];
    }
  }
};

export const payIntervalError = (payBeforeTax: number, payAfterTax: number): FormError[] => {
  if (payBeforeTax && !payAfterTax) {
    return [{ errorType: 'payBeforeTax', propertyName: 'payInterval' }];
  }

  if (payAfterTax && !payBeforeTax) {
    return [{ errorType: 'payAfterTax', propertyName: 'payInterval' }];
  }

  if (payBeforeTax || payAfterTax) {
    return [{ errorType: 'required', propertyName: 'payInterval' }];
  }
};

export const getNewJobPartialPayInfoError = (formData: Partial<CaseWithId>): FormError[] => {
  const newJobPay = formData.newJobPay;
  const newJobPayInterval = formData.newJobPayInterval;

  if (newJobPay) {
    const errorType = isPayIntervalNull(newJobPayInterval);
    if (errorType) {
      return [{ errorType, propertyName: 'newJobPayInterval' }];
    }
  }

  if (newJobPayInterval) {
    const errorType = arePayValuesNull([`${newJobPay || ''}`]);
    if (errorType) {
      return [{ errorType, propertyName: 'newJobPay' }];
    }
  }
};

export const getClaimSummaryError = (formData: Partial<CaseWithId>): FormError => {
  if (formData.claimSummaryText === undefined && formData.claimSummaryFile === undefined) {
    return;
  }

  const textProvided = isFieldFilledIn(formData.claimSummaryText) === undefined;
  const fileProvided = isFieldFilledIn(formData.claimSummaryFile) === undefined;

  if (textProvided && fileProvided) {
    return { propertyName: 'claimSummaryText', errorType: 'textAndFile' };
  }

  if (!textProvided && !fileProvided) {
    return { propertyName: 'claimSummaryText', errorType: 'required' };
  }
};

export const getSessionErrors = (req: AppRequest, form: Form, formData: Partial<CaseWithId>): FormError[] => {
  //call get custom errors and add to session errors
  let sessionErrors = form.getErrors(formData);
  const custErrors = getCustomStartDateError(req, form, formData);
  const payErrors = getPartialPayInfoError(formData);
  const newJobPayErrors = getNewJobPartialPayInfoError(formData);
  const noticeErrors = getCustomNoticeLengthError(req, formData);
  const claimSummaryError = getClaimSummaryError(formData);
  const hearingPreferenceErrors = getHearingPreferenceReasonError(formData);
  const acasCertificateNumberError = getACASCertificateNumberError(formData);

  if (custErrors) {
    sessionErrors = [...sessionErrors, custErrors];
  }

  if (payErrors) {
    sessionErrors = [...sessionErrors, ...payErrors];
  }

  if (newJobPayErrors) {
    sessionErrors = [...sessionErrors, ...newJobPayErrors];
  }

  if (noticeErrors) {
    sessionErrors = [...sessionErrors, noticeErrors];
  }

  if (claimSummaryError) {
    sessionErrors = [...sessionErrors, claimSummaryError];
  }

  if (hearingPreferenceErrors) {
    sessionErrors = [...sessionErrors, hearingPreferenceErrors];
  }

  if (acasCertificateNumberError) {
    sessionErrors = [...sessionErrors, acasCertificateNumberError];
  }
  return sessionErrors;
};

export const handleSessionErrors = (req: AppRequest, res: Response, form: Form, redirectUrl: string): void => {
  const formData = form.getParsedBody(req.body, form.getFormFields());
  const sessionErrors = getSessionErrors(req, form, formData);

  req.session.errors = sessionErrors;

  const { saveForLater } = req.body;
  const requiredErrExists = sessionErrors.some(err => err.errorType === 'required');

  if (saveForLater && (requiredErrExists || !sessionErrors.length)) {
    req.session.errors = [];
    return res.redirect(PageUrls.CLAIM_SAVED);
  }
  if (sessionErrors.length) {
    req.session.save(err => {
      if (err) {
        throw err;
      }
      return res.redirect(req.url);
    });
  } else {
    const nextPage = handleReturnUrl(req, redirectUrl);
    return res.redirect(nextPage);
  }
};

export const handleSaveAsDraft = (res: Response): void => {
  return res.redirect(PageUrls.CLAIM_SAVED);
};

export const setUserCase = (req: AppRequest, form: Form): void => {
  const formData = form.getParsedBody(cloneDeep(req.body), form.getFormFields());
  if (!req.session.userCase) {
    req.session.userCase = {} as CaseWithId;
  }
  resetValuesIfNeeded(formData);
  Object.assign(req.session.userCase, formData);
};

export const setUserCaseWithRedisData = (req: AppRequest, caseData: string): void => {
  if (!req.session.userCase) {
    req.session.userCase = {} as CaseWithId;
  }
  const userDataMap: Map<CaseDataCacheKey, string> = new Map(JSON.parse(caseData));
  req.session.userCase.claimantRepresentedQuestion =
    userDataMap.get(CaseDataCacheKey.CLAIMANT_REPRESENTED) === YesOrNo.YES.toString() ? YesOrNo.YES : YesOrNo.NO;
  req.session.userCase.caseType =
    userDataMap.get(CaseDataCacheKey.CASE_TYPE) === CaseType.SINGLE.toString() ? CaseType.SINGLE : CaseType.MULTIPLE;
  req.session.userCase.typeOfClaim = JSON.parse(userDataMap.get(CaseDataCacheKey.TYPES_OF_CLAIM));
};

export const updateWorkAddress = (userCase: CaseWithId, respondent: Respondent): void => {
  userCase.workAddress1 = respondent.respondentAddress1;
  userCase.workAddress2 = respondent.respondentAddress2;
  userCase.workAddressTown = respondent.respondentAddressTown;
  userCase.workAddressCountry = respondent.respondentAddressCountry;
  userCase.workAddressPostcode = respondent.respondentAddressPostcode;
};

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
  Object.assign(req.session.userCase.respondents[selectedRespondentIndex], formData);
};

export const getRespondentIndex = (req: AppRequest): number => {
  return parseInt(req.params.respondentNumber) - 1;
};

export const assignFormData = (userCase: CaseWithId | undefined, fields: FormFields): void => {
  if (!userCase) {
    userCase = <CaseWithId>{};
    return;
  }

  Object.entries(fields).forEach(([name, field]: [string, FormOptions]) => {
    const caseName = (userCase as AnyRecord)[name];
    if (caseName) {
      field.values = field.values?.map(v => {
        Object.keys(caseName).forEach(key => {
          if (v.name === key) {
            v.value = caseName[key];
          }
        });
        return v;
      });
      for (const [, value] of Object.entries(fields)) {
        (value as FormOptions)?.values
          ?.filter((option: FormInput) => option.subFields !== undefined)
          .map((fieldWithSubFields: FormInput) => fieldWithSubFields.subFields)
          .forEach((subField: Record<string, FormField>) => assignFormData(caseName, subField));
      }
    }
  });
};

export const getRespondentRedirectUrl = (respondentNumber: string | number, pageUrl: string): string => {
  return '/respondent/' + respondentNumber.toString() + pageUrl;
};

export const conditionalRedirect = (
  req: AppRequest,
  formFields: FormFields,
  condition: boolean | string | string[]
): boolean => {
  const matchingValues = Object.entries(req.body).find(([k]) => Object.keys(formFields).some(ff => ff === k));
  if (Array.isArray(condition) && matchingValues) {
    return matchingValues.some(v => {
      return (condition as string[]).some(c => (Array.isArray(v) ? v.some(e => String(e) === c) : v.includes(c)));
    });
  }
  return matchingValues?.some(v => v === condition);
};

export const getHearingPreferenceReasonError = (formData: Partial<CaseWithId>): FormError => {
  const hearingPreferenceCheckbox = formData.hearingPreferences;
  const hearingPreferenceNeitherTextarea = formData.hearingAssistance;

  if (
    (hearingPreferenceCheckbox as string[])?.includes(HearingPreference.NEITHER) &&
    (!hearingPreferenceNeitherTextarea || (hearingPreferenceNeitherTextarea as string).trim().length === 0)
  ) {
    const errorType = isFieldFilledIn(hearingPreferenceNeitherTextarea);
    if (errorType) {
      return { errorType, propertyName: 'hearingAssistance' };
    }
  }
};

export const getACASCertificateNumberError = (formData: Partial<CaseWithId>): FormError => {
  const certificateRadioButtonSelectedValue = formData.acasCert;
  const acasCertNum = formData.acasCertNum;

  if ((certificateRadioButtonSelectedValue as string)?.includes(YesOrNo.YES)) {
    let errorType = isFieldFilledIn(acasCertNum);
    if (errorType) {
      return { errorType, propertyName: 'acasCertNum' };
    } else {
      errorType = isAcasNumberValid(acasCertNum);
      if (errorType) {
        return { errorType, propertyName: 'acasCertNum' };
      }
    }
  }
};

export const getSectionStatus = (
  detailsCheckValue: YesOrNo,
  sessionValue: string | CaseDate | number
): sectionStatus => {
  if (detailsCheckValue === YesOrNo.YES) {
    return sectionStatus.completed;
  } else if (detailsCheckValue === YesOrNo.NO || !!sessionValue) {
    return sectionStatus.inProgress;
  } else {
    return sectionStatus.notStarted;
  }
};

export const isPostcodeMVPLocation = (postCode: string): boolean => {
  const {
    outcode, // => "SW1A"
    area, // => "SW"
    district, // => "SW1"
  } = parse(postCode);
  for (let i = 0; i < mvpLocations.length; i++) {
    if (mvpLocations[i] === outcode || mvpLocations[i] === area || mvpLocations[i] === district) {
      return true;
    }
  }
  return false;
};

export const handleUpdateDraftCase = (req: AppRequest, logger: LoggerInstance): void => {
  if (!req.session.errors.length) {
    getCaseApi(req.session.user?.accessToken)
      .updateDraftCase(req.session.userCase)
      .then(() => {
        logger.info(`Updated draft case id: ${req.session.userCase.id}`);
      })
      .catch(error => {
        logger.error(error);
      });
  }
};

export const resetValuesIfNeeded = (formData: Partial<CaseWithId>): void => {
  if (
    formData.claimantPensionContribution === YesOrNoOrNotSure.NO ||
    formData.claimantPensionContribution === YesOrNoOrNotSure.NOT_SURE
  ) {
    formData.claimantPensionWeeklyContribution = undefined;
  }
  if (formData.employeeBenefits === YesOrNo.NO) {
    formData.benefitsCharCount = undefined;
  }
  if (formData.noticePeriod === YesOrNo.NO) {
    formData.noticePeriodUnit = undefined;
    formData.noticePeriodLength = undefined;
  }
  if (formData.newJob === YesOrNo.NO) {
    formData.newJobStartDate = undefined;
    formData.newJobPay = undefined;
    formData.newJobPayInterval = undefined;
  }
};

export const handleReturnUrl = (req: AppRequest, redirectUrl: string): string => {
  let nextPage = redirectUrl;
  if (req.session.returnUrl) {
    nextPage = req.session.returnUrl;
    req.session.returnUrl = undefined;
  }
  return nextPage;
};

export const mapSelectedRespondentValuesToCase = (selectedRespondentIndex: number, userCase: CaseWithId): void => {
  if (typeof selectedRespondentIndex !== 'undefined' && userCase.respondents !== undefined) {
    userCase.respondentName = userCase.respondents[selectedRespondentIndex]?.respondentName;
    userCase.respondentAddress1 = userCase.respondents[selectedRespondentIndex]?.respondentAddress1;
    userCase.respondentAddress2 = userCase.respondents[selectedRespondentIndex]?.respondentAddress2;
    userCase.respondentAddressTown = userCase.respondents[selectedRespondentIndex]?.respondentAddressTown;
    userCase.respondentAddressCountry = userCase.respondents[selectedRespondentIndex]?.respondentAddressCountry;
    userCase.respondentAddressPostcode = userCase.respondents[selectedRespondentIndex]?.respondentAddressPostcode;
    userCase.workAddress1 = userCase.respondents[selectedRespondentIndex]?.workAddress1;
    userCase.workAddress2 = userCase.respondents[selectedRespondentIndex]?.workAddress2;
    userCase.workAddressTown = userCase.respondents[selectedRespondentIndex]?.workAddressTown;
    userCase.workAddressCountry = userCase.respondents[selectedRespondentIndex]?.workAddressCountry;
    userCase.workAddressPostcode = userCase.respondents[selectedRespondentIndex]?.workAddressPostcode;
    userCase.acasCert = userCase.respondents[selectedRespondentIndex]?.acasCert;
    userCase.acasCertNum = userCase.respondents[selectedRespondentIndex]?.acasCertNum;
    userCase.noAcasReason = userCase.respondents[selectedRespondentIndex]?.noAcasReason;
  }
};
