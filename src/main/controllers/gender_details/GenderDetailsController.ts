import { Response } from 'express';

import { Form } from '../../components/form/form';
import { AppRequest } from '../../definitions/appRequest';
import { PageUrls, TranslationKeys } from '../../definitions/constants';
import { FormContent, FormFields } from '../../definitions/form';
import { assignFormData, getPageContent, handleSessionErrors, setUserCase } from '../helpers';

export default class GenderDetailsController {
  private readonly form: Form;

  constructor(private readonly genderDetailsContent: FormContent) {
    this.form = new Form(<FormFields>this.genderDetailsContent.fields);
  }

  public post = (req: AppRequest, res: Response): void => {
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, PageUrls.ADDRESS_DETAILS);
  };

  public get = (req: AppRequest, res: Response): void => {
    const content = getPageContent(req, this.genderDetailsContent, [
      TranslationKeys.COMMON,
      TranslationKeys.GENDER_DETAILS,
    ]);
    assignFormData(req.session.userCase, this.form.getFormFields());
    res.render(TranslationKeys.GENDER_DETAILS, {
      ...content,
    });
  };
}
