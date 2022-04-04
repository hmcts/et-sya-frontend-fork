import { Response } from 'express';

import { Form } from '../components/form/form';
import { convertToDateObject } from '../components/form/parser';
import { AppRequest } from '../definitions/appRequest';
import { CaseDate, WeeksOrMonths } from '../definitions/case';
import { PageUrls, TranslationKeys } from '../definitions/constants';
import { DateFormFields, DefaultDateFormFields } from '../definitions/dates';
import { FormContent, FormFields } from '../definitions/form';
import { DefaultRadioFormFields, RadioFormFields, saveForLaterButton, submitButton } from '../definitions/radios';
import { AnyRecord, UnknownRecord } from '../definitions/util-types';

import { assignFormData, getPageContent, handleSessionErrors, setUserCase } from './helpers';

const notice_pay: RadioFormFields = {
  ...DefaultRadioFormFields,
  id: 'notice-pay',
  classes: 'govuk-radios--inline',
};

const notice_pay_dates: DateFormFields = {
  ...DefaultDateFormFields,
  id: 'notice-pay-dates',
  parser: (body: UnknownRecord): CaseDate => convertToDateObject('noticeDate', body),
};

export default class NoticePayController {
  private readonly form: Form;
  private readonly noticePayContent: FormContent = {
    fields: {
      noticePeriodLength: {
        id: 'notice-period',
        type: 'radios',
        classes: 'govuk-radios',
        values: [
          {
            label: notice_pay.values[0].value,
            selected: false,
            subFields: {
              noticePeriodUnit: {
                id: 'notice-period-number',
                type: 'input',
                classes: 'govuk-input--width-2',
                hint: (l: AnyRecord): string => l.hint1,
                values: [
                  {
                    label: (l: AnyRecord): string => l.empty,
                    attributes: { maxLength: 2 },
                    value: 1,
                  },
                ],
              },
              noticePeriodPaid: {
                id: 'notice-period-paid',
                type: 'radios',
                classes: 'govuk-radios--inline',
                name: 'notice-period-paid',
                values: [
                  {
                    label: notice_pay_dates.values[0].label,
                    value: notice_pay_dates.values[0].name,
                    selected: false,
                  },
                  {
                    label: (l: AnyRecord): string => l.months,
                    value: WeeksOrMonths.MONTHS,
                    selected: false,
                  },
                ],
              },

              noticePeriodUnitPaid: {
                id: 'notice-period-paid-number',
                type: 'input',
                classes: 'govuk-input--width-2',
                hint: (l: AnyRecord): string => l.hint2,
                values: [
                  {
                    label: (l: AnyRecord): string => l.empty,
                    attributes: { maxLength: 2 },
                    value: 1,
                  },
                ],
              },
              noticePeriodAmountPaid: {
                id: 'notice-period-paid',
                type: 'radios',
                classes: 'govuk-radios--inline',
                name: 'notice-period-pay',
                values: [
                  {
                    label: (l: AnyRecord): string => l.weeks,
                    value: WeeksOrMonths.WEEKS,
                    selected: false,
                  },
                  {
                    label: (l: AnyRecord): string => l.months,
                    value: WeeksOrMonths.MONTHS,
                    selected: false,
                  },
                ],
              },
            },
          },
          {
            label: notice_pay.values[1].value,
            selected: false,
          },
        ],
      },
    },
    submit: submitButton,
    saveForLater: saveForLaterButton,
  };

  constructor() {
    this.form = new Form(<FormFields>this.noticePayContent.fields);
  }
  public post = (req: AppRequest, res: Response): void => {
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, PageUrls.AVERAGE_WEEKLY_HOURS);
  };

  public get = (req: AppRequest, res: Response): void => {
    const content = getPageContent(req, this.noticePayContent, [TranslationKeys.COMMON, TranslationKeys.NOTICE_PAY]);
    assignFormData(req.session.userCase, this.form.getFormFields());
    res.render(TranslationKeys.NOTICE_PAY, {
      ...content,
    });
  };
}
