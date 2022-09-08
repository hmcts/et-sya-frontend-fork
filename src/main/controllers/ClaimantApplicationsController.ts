import { Response } from 'express';

import { AppRequest } from '../definitions/appRequest';
import { PageUrls, TranslationKeys } from '../definitions/constants';
import { FormContent } from '../definitions/form';
import { getUserApplications, getUserCasesByLastModified } from '../services/CaseSelectionService';

import { getPageContent } from './helpers/FormHelpers';

export default class ClaimantApplicationsController {
  public get = async (req: AppRequest, res: Response): Promise<void> => {
    const content = getPageContent(req, <FormContent>{}, [
      TranslationKeys.COMMON,
      TranslationKeys.CLAIMANT_APPLICATIONS,
    ]);
    const userCases = await getUserCasesByLastModified(req);
    if (userCases.length === 0) {
      return res.redirect(PageUrls.HOME);
    } else {
      const usersApplications = getUserApplications(userCases);
      res.render(TranslationKeys.CLAIMANT_APPLICATIONS, {
        ...content,
        usersApplications,
      });
    }
  };
}
