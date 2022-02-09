import { Response } from 'express';

import { Form } from '../../components/form/form';
import { AppRequest } from '../../definitions/appRequest';
import { CLAIM_STEPS } from '../../definitions/constants';
import { FormContent, FormFields } from '../../definitions/form';
import { assignFormData, getPageContent, handleSessionErrors, setUserCase } from '../helpers';

export default class VideoHearingsController {
  private readonly form: Form;

  constructor(private readonly videoHearingsContent: FormContent) {
    this.form = new Form(<FormFields>this.videoHearingsContent.fields);
  }

  public post = (req: AppRequest, res: Response): void => {
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, CLAIM_STEPS);
  };

  public get = (req: AppRequest, res: Response): void => {
    const content = getPageContent(req, this.videoHearingsContent, ['common', 'video-hearings']);
    assignFormData(req.session.userCase, this.form.getFormFields());
    res.render('video-hearings', {
      ...content,
    });
  };
}
