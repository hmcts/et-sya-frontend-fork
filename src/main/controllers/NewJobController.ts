import { Response } from 'express';

import { Form } from '../components/form/form';
import { AppRequest } from '../definitions/appRequest';
import { YesOrNo } from '../definitions/case';
import { PageUrls, TranslationKeys } from '../definitions/constants';
import { FormContent, FormFields } from '../definitions/form';
import { YesNoRadioValues, saveForLaterButton, submitButton } from '../definitions/radios';

import { assignFormData, conditionalRedirect, getPageContent, handleSessionErrors, setUserCase } from './helpers';

export default class NewJobController {
  private readonly form: Form;
  private readonly newJobContent: FormContent = {
    fields: {
      newJob: {
        id: 'new-job',
        type: 'radios',
        classes: 'govuk-radios--inline',
        values: YesNoRadioValues,
      },
    },
    submit: submitButton,
    saveForLater: saveForLaterButton,
  };

  constructor() {
    this.form = new Form(<FormFields>this.newJobContent.fields);
  }

  public post = (req: AppRequest, res: Response): void => {
    const redirectUrl = conditionalRedirect(req, this.form.getFormFields(), YesOrNo.YES)
      ? PageUrls.NEW_JOB_START_DATE
      : PageUrls.HOME;
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, redirectUrl);
  };

  public get = (req: AppRequest, res: Response): void => {
    const content = getPageContent(req, this.newJobContent, [TranslationKeys.COMMON, TranslationKeys.NEW_JOB]);
    assignFormData(req.session.userCase, this.form.getFormFields());
    res.render(TranslationKeys.NEW_JOB, {
      ...content,
    });
  };
}
