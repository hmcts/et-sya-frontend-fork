import { Response } from 'express';

import { Form } from '../../components/form/form';
import { AppRequest } from '../../definitions/appRequest';
import { PageUrls } from '../../definitions/constants';
import { FormContent, FormFields } from '../../definitions/form';
import { assignFormData, getPageContent, handleSessionErrors, setUserCase } from '../helpers';

export default class pastEmployerController {
  private readonly form: Form;

  constructor(private readonly pastEmployerFormContent: FormContent) {
    this.form = new Form(<FormFields>this.pastEmployerFormContent.fields);
  }

  public post = (req: AppRequest, res: Response): void => {
    // TODO: Change to the correct redirect urls
    // YES - '/are-you-still-working' RET-859
    // NO - Respondent details
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, PageUrls.HOME);
  };

  public get = (req: AppRequest, res: Response): void => {
    const content = getPageContent(req, this.pastEmployerFormContent, ['common', 'past-employer']);
    assignFormData(req.session.userCase, this.form.getFormFields());
    res.render('past-employer', {
      ...content,
    });
  };
}
