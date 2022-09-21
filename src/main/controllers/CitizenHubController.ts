import { Response } from 'express';

import { AppRequest } from '../definitions/appRequest';
import { PageUrls, TranslationKeys } from '../definitions/constants';
import { HubLinksStatuses, hubLinksMap, sectionIndexToLinkNames } from '../definitions/hub';
import { AnyRecord } from '../definitions/util-types';
import { fromApiFormat } from '../helper/ApiFormatter';
import { currentStateFn } from '../helper/state-sequence';
import mockUserCaseWithCitizenHubLinks from '../resources/mocks/mockUserCaseWithCitizenHubLinks';
import { getCaseApi } from '../services/CaseService';

import { handleUpdateSubmittedCase } from './helpers/CaseHelpers';

const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('app');

export default class CitizenHubController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    // Fake userCase for a11y tests. This isn't a nice way to do it but explained in commit.
    if (process.env.IN_TEST === 'true' && req.params.caseId === 'a11y') {
      req.session.userCase = mockUserCaseWithCitizenHubLinks;
    } else {
      try {
        req.session.userCase = fromApiFormat(
          (await getCaseApi(req.session.user?.accessToken).getUserCase(req.params.caseId)).data
        );
      } catch (error) {
        logger.error(`Could not access /citizen-hub/${req.params.caseId}`);
        return res.redirect('/not-found');
      }
    }

    const userCase = req.session.userCase;
    const currentState = currentStateFn(userCase);

    if (!userCase.hubLinksStatuses) {
      userCase.hubLinksStatuses = new HubLinksStatuses();
      handleUpdateSubmittedCase(req, logger);
    }

    const sections = Array.from(Array(8)).map((__ignored, index) => {
      return {
        title: (l: AnyRecord): string => l[`section${index + 1}`],
        links: sectionIndexToLinkNames[index].map(linkName => {
          const status = userCase.hubLinksStatuses[linkName];
          return {
            linkTxt: (l: AnyRecord): string => l[linkName],
            status: (l: AnyRecord): string => l[status],
            statusColor: () => hubLinksMap.get(status),
          };
        }),
      };
    });

    res.render(TranslationKeys.CITIZEN_HUB, {
      ...req.t(TranslationKeys.COMMON, { returnObjects: true }),
      ...req.t(TranslationKeys.CITIZEN_HUB, { returnObjects: true }),
      PageUrls,
      userCase,
      currentState,
      sections,
      hideContactUs: true,
    });
  }
}
