import { Response } from 'express';

import { AppRequest } from '../definitions/appRequest';
import { PageUrls } from '../definitions/constants';

import { getLanguageParam } from './helpers/RouterHelpers';

export default class ContactTheTribunalFileController {
  public get = (req: AppRequest, res: Response): void => {
    req.session.userCase.contactApplicationFile = undefined;
    res.redirect(
      PageUrls.TRIBUNAL_CONTACT_SELECTED.replace(':selectedOption', req.params.application) + getLanguageParam(req.url)
    );
  };
}
