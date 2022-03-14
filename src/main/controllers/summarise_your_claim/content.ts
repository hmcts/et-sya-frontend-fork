import { FormContent } from '../../definitions/form';
import { AnyRecord } from '../../definitions/util-types';

export const summariseYourClaimContent: FormContent = {
  fields: {},
  submit: {
    text: (l: AnyRecord): string => l.submit,
    classes: 'govuk-!-margin-right-2',
  },
  saveForLater: {
    text: (l: AnyRecord): string => l.saveForLater,
    classes: 'govuk-button--secondary',
  },
};
