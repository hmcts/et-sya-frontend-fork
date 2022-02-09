import { isFieldFilledIn } from '../../components/form/validator';
import { FormContent } from '../../definitions/form';
import { AnyRecord } from '../../definitions/util-types';

export const acasFormContent: FormContent = {
  fields: {
    acasMultiple: {
      classes: 'govuk-radios--inline',
      id: 'acas-multiple',
      type: 'radios',
      label: (l: AnyRecord): string => l.label,
      values: [
        {
          label: (l: AnyRecord): string => l.yes,
          name: 'radio1',
          value: 'Yes',
          attributes: { maxLength: 2 },
        },
        {
          label: (l: AnyRecord): string => l.no,
          name: 'radio2',
          value: 'No',
          attributes: { maxLength: 2 },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: (l: AnyRecord): string => l.continue,
    classes: 'govuk-!-margin-right-2',
  },
};
