import { Response } from 'express';
import { LoggerInstance } from 'winston';

import { Form } from '../components/form/form';
import { isFieldFilledIn } from '../components/form/validator';
import { AppRequest } from '../definitions/appRequest';
import { PageUrls, TranslationKeys } from '../definitions/constants';
import { FormContent, FormFields } from '../definitions/form';
import { AnyRecord } from '../definitions/util-types';

import { handleUpdateDraftCase, setUserCase } from './helpers/CaseHelpers';
import { handleSessionErrors } from './helpers/ErrorHelpers';
import { assignFormData, getPageContent } from './helpers/FormHelpers';

export default class AddressDetailsController {
  private readonly form: Form;
  private readonly addressDetailsContent: FormContent = {
    fields: {
      address1: {
        id: 'address1',
        name: 'address-line1',
        type: 'text',
        classes: 'govuk-label govuk-!-width-one-half',
        label: l => l.addressLine1,
        labelSize: null,
        validator: isFieldFilledIn,
        attributes: {
          autocomplete: 'address-line1',
          maxLength: 100,
        },
      },
      address2: {
        id: 'address2',
        name: 'address-line2',
        type: 'text',
        classes: 'govuk-label govuk-!-width-one-half',
        label: l => l.addressLine2,
        labelSize: null,
        attributes: {
          autocomplete: 'address-line2',
        },
      },
      addressTown: {
        id: 'addressTown',
        name: 'address-town',
        type: 'text',
        classes: 'govuk-label govuk-!-width-one-half',
        label: l => l.town,
        labelSize: null,
        attributes: {
          autocomplete: 'address-level2',
          maxLength: 60,
        },
        validator: isFieldFilledIn,
      },
      addressCountry: {
        id: 'addressCountry',
        name: 'address-country',
        type: 'text',
        classes: 'govuk-label govuk-!-width-one-half',
        label: l => l.country,
        labelSize: null,
        validator: isFieldFilledIn,
        attributes: {
          maxLength: 60,
        },
      },
      addressPostcode: {
        id: 'addressPostcode',
        name: 'address-postcode',
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.postcode,
        labelSize: null,
        attributes: {
          maxLength: 14,
          autocomplete: 'postal-code',
        },
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
    this.form = new Form(<FormFields>this.addressDetailsContent.fields);
  }

  public post = (req: AppRequest, res: Response): void => {
    setUserCase(req, this.form);
    handleSessionErrors(req, res, this.form, PageUrls.TELEPHONE_NUMBER);
    handleUpdateDraftCase(req, this.logger);
  };

  public get = (req: AppRequest, res: Response): void => {
    const content = getPageContent(req, this.addressDetailsContent, [
      TranslationKeys.COMMON,
      TranslationKeys.ADDRESS_DETAILS,
      TranslationKeys.ENTER_ADDRESS,
    ]);
    assignFormData(req.session.userCase, this.form.getFormFields());
    res.render(TranslationKeys.ADDRESS_DETAILS, {
      ...content,
    });
  };
}
