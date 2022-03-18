import { Response } from 'express';

import { Form } from '../components/form/form';
import { atLeastOneFieldIsChecked } from '../components/form/validator';
import { AppRequest } from '../definitions/appRequest';
import { AuthUrls, LegacyUrls, TranslationKeys } from '../definitions/constants';
import { TypesOfClaim } from '../definitions/definition';
import { FormContent, FormFields } from '../definitions/form';

import { assignFormData, conditionalRedirect, getPageContent, handleSessionErrors, setUserCase } from './helpers';

export default class TypeOfClaimController {
  private readonly form: Form;
  private readonly typeOfClaimFormContent: FormContent = {
    fields: {
      typeOfClaim: {
        id: 'typeOfClaim',
        type: 'checkboxes',
        labelHidden: false,
        label: l => l.h1,
        labelSize: 'xl',
        isPageHeading: true,
        hint: l => l.hint,
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            id: 'typeOfClaim',
            name: 'typeOfClaim',
            label: l => l.breachOfContract.checkbox,
            value: TypesOfClaim.BREACH_OF_CONTRACT,
          },
        ],
      },
    },
    submit: {
      text: l => l.continue,
    },
  };

  constructor() {
    this.form = new Form(<FormFields>this.typeOfClaimFormContent.fields);
  }

  public post = (req: AppRequest, res: Response): void => {
    const redirectUrl = conditionalRedirect(req, this.form.getFormFields(), [TypesOfClaim.BREACH_OF_CONTRACT])
      ? AuthUrls.LOGIN
      : LegacyUrls.ET1_BASE;
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, redirectUrl);
  };

  public get = (req: AppRequest, res: Response): void => {
    const content = getPageContent(req, this.typeOfClaimFormContent, [
      TranslationKeys.COMMON,
      TranslationKeys.TYPE_OF_CLAIM,
    ]);
    assignFormData(req.session.userCase, this.form.getFormFields());
    res.render(TranslationKeys.TYPE_OF_CLAIM, {
      ...content,
    });
  };
}
