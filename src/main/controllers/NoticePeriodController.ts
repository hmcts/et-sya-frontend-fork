import { Response } from 'express';
import { LoggerInstance } from 'winston';

import { Form } from '../components/form/form';
import { AppRequest } from '../definitions/appRequest';
import { StillWorking, YesOrNo } from '../definitions/case';
import { PageUrls, TranslationKeys } from '../definitions/constants';
import { FormContent, FormFields } from '../definitions/form';
import { AnyRecord } from '../definitions/util-types';

import { handleUpdateDraftCase, setUserCase } from './helpers/CaseHelpers';
import { handleSessionErrors } from './helpers/ErrorHelpers';
import { assignFormData, getPageContent } from './helpers/FormHelpers';
import { conditionalRedirect } from './helpers/RouterHelpers';

export default class NoticePeriodController {
  private readonly form: Form;
  private readonly noticePeriodFormContent: FormContent = {
    fields: {
      noticePeriod: {
        id: 'notice-period',
        type: 'radios',
        label: (l: AnyRecord): string => l.legend,
        labelSize: 'xl',
        labelHidden: false,
        classes: 'govuk-radios--inline',
        values: [
          {
            label: (l: AnyRecord): string => l.yes,
            value: YesOrNo.YES,
          },
          {
            label: (l: AnyRecord): string => l.no,
            value: YesOrNo.NO,
          },
        ],
      },
    },
    submit: {
      text: (l: AnyRecord): string => l.submit,
      classes: 'govuk-!-margin-right-2',
    },
    saveForLater: {
      text: (l: AnyRecord): string => l.saveForLater,
      classes: 'govuk-button--secondary',
    },
  };

  constructor(private logger: LoggerInstance) {
    this.form = new Form(<FormFields>this.noticePeriodFormContent.fields);
  }

  public post = (req: AppRequest, res: Response): void => {
    const redirectUrl = conditionalRedirect(req, this.form.getFormFields(), YesOrNo.YES)
      ? PageUrls.NOTICE_TYPE
      : PageUrls.AVERAGE_WEEKLY_HOURS;
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, redirectUrl);
    handleUpdateDraftCase(req, this.logger);
  };

  public get = (req: AppRequest, res: Response): void => {
    const session = req.session;
    const content = getPageContent(req, this.noticePeriodFormContent, [
      TranslationKeys.COMMON,
      session.userCase?.isStillWorking === StillWorking.NO_LONGER_WORKING
        ? TranslationKeys.NOTICE_PERIOD_NO_LONGER_WORKING
        : TranslationKeys.NOTICE_PERIOD_WORKING,
    ]);
    const employmentStatus = session.userCase?.isStillWorking;
    assignFormData(session.userCase, this.form.getFormFields());
    res.render(TranslationKeys.NOTICE_PERIOD, {
      ...content,
      employmentStatus,
    });
  };
}
