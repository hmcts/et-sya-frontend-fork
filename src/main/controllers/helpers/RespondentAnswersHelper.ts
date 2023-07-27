import { CaseWithId, NoAcasNumberReason, Respondent, YesOrNo } from '../../definitions/case';
import { InterceptPaths, PageUrls } from '../../definitions/constants';
import { AnyRecord } from '../../definitions/util-types';

import { answersAddressFormatter } from './PageContentHelpers';

export const getAcasReason = (noAcasReason: NoAcasNumberReason, translations: AnyRecord): string => {
  switch (noAcasReason) {
    case NoAcasNumberReason.ANOTHER:
      return translations.acasReason.another;
    case NoAcasNumberReason.EMPLOYER:
      return translations.acasReason.employer;
    case NoAcasNumberReason.NO_POWER:
      return translations.acasReason.no_power;
    case NoAcasNumberReason.UNFAIR_DISMISSAL:
      return translations.acasReason.unfair_dismissal;
    default:
      return undefined;
  }
};

export const getRespondentSection = (
  userCase: CaseWithId,
  respondent: Respondent,
  index: number,
  translations: AnyRecord
): unknown => {
  const respondentSections = [];
  respondentSections.push(
    {
      key: {
        text:
          translations.respondentDetails.header + respondent.respondentNumber + translations.respondentDetails.details,
        classes: 'govuk-summary-list__key govuk-heading-m',
      },
      value: {},
    },
    {
      key: {
        text: translations.respondentDetails.respondentName,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text: respondent.respondentName,
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.RESPONDENT_NAME + InterceptPaths.ANSWERS_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.respondentDetails.respondentName,
          },
        ],
      },
    },
    {
      key: {
        text: translations.respondentDetails.respondentAddress,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text: answersAddressFormatter(
          respondent.respondentAddress1,
          respondent.respondentAddress2,
          respondent.respondentAddressTown,
          respondent.respondentAddressCountry,
          respondent.respondentAddressPostcode
        ),
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.RESPONDENT_ADDRESS + InterceptPaths.ANSWERS_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.respondentDetails.respondentAddress,
          },
        ],
      },
    }
  );
  if (index === 1 && userCase.pastEmployer === YesOrNo.YES) {
    respondentSections.push({
      key: {
        text: translations.respondentDetails.workedAtRespondent,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text:
          userCase.claimantWorkAddressQuestion === YesOrNo.YES
            ? translations.respondentDetails.yes
            : translations.respondentDetails.no,
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.WORK_ADDRESS + InterceptPaths.ANSWERS_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.respondentDetails.workedAtRespondent,
          },
        ],
      },
    });
  }

  if (index === 1 && userCase.claimantWorkAddressQuestion === YesOrNo.NO) {
    respondentSections.push({
      key: {
        text: translations.respondentDetails.addressWorkedAt,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text: answersAddressFormatter(
          userCase.workAddress1,
          userCase.workAddress2,
          userCase.workAddressTown,
          userCase.workAddressCountry,
          userCase.workAddressPostcode
        ),
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.PLACE_OF_WORK + InterceptPaths.ANSWERS_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.respondentDetails.addressWorkedAt,
          },
        ],
      },
    });
  }

  const acasCertValue =
    respondent.acasCert === YesOrNo.YES ? respondent.acasCertNum : translations.respondentDetails.no;
  respondentSections.push({
    key: {
      text: translations.respondentDetails.acasNumber,
      classes: 'govuk-!-font-weight-regular-m',
    },
    value: {
      text: acasCertValue,
    },
    actions: {
      items: [
        {
          href: '/respondent/' + index + PageUrls.ACAS_CERT_NUM + InterceptPaths.ANSWERS_CHANGE,
          text: translations.change,
          visuallyHiddenText: translations.respondentDetails.acasNumber,
        },
      ],
    },
  });
  if (respondent.acasCert === YesOrNo.NO) {
    const reasonText = getAcasReason(respondent.noAcasReason, translations);
    respondentSections.push({
      key: {
        text: translations.respondentDetails.noAcasReason,
        classes: 'govuk-!-font-weight-regular-m',
      },
      value: {
        text: reasonText,
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.NO_ACAS_NUMBER + InterceptPaths.ANSWERS_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.respondentDetails.noAcasReason,
          },
        ],
      },
    });
  }

  return respondentSections;
};

export const getRespondentDetailsSection = (
  respondent: Respondent,
  index: string,
  translations: AnyRecord
): unknown => {
  const respondentSections = [];
  respondentSections.push(
    {
      key: {
        text: translations.name,
      },
      value: {
        text: respondent.respondentName,
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.RESPONDENT_NAME + InterceptPaths.RESPONDENT_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.name,
          },
        ],
      },
    },
    {
      key: {
        text: translations.address,
      },
      value: {
        text: answersAddressFormatter(respondent.respondentAddress1, respondent.respondentAddressPostcode),
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.RESPONDENT_ADDRESS + InterceptPaths.RESPONDENT_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.address,
          },
        ],
      },
    },
    {
      key: {
        text: translations.acasNum,
      },
      value: {
        html: respondent.acasCertNum === undefined ? translations.unProvided : respondent.acasCertNum,
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.ACAS_CERT_NUM + InterceptPaths.RESPONDENT_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.acasNum,
          },
        ],
      },
    }
  );
  if (respondent.acasCert === YesOrNo.NO) {
    respondentSections.push({
      key: {
        text: translations.noAcasReason,
      },
      value: {
        html: getAcasReason(respondent.noAcasReason, translations),
      },
      actions: {
        items: [
          {
            href: '/respondent/' + index + PageUrls.ACAS_CERT_NUM + InterceptPaths.RESPONDENT_CHANGE,
            text: translations.change,
            visuallyHiddenText: translations.acasNum,
          },
        ],
      },
    });
  }
  return respondentSections;
};
