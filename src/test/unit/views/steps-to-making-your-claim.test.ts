import fs from 'fs';
import path from 'path';

import { expect } from 'chai';
import request from 'supertest';

import { CaseDataCacheKey, CaseType, YesOrNo } from '../../../main/definitions/case';
import { PageUrls } from '../../../main/definitions/constants';
import { TypesOfClaim } from '../../../main/definitions/definition';
import { mockAppWithRedisClient, mockRedisClient, mockSession } from '../mocks/mockApp';

const stepsToMakingYourClaimJSONRaw = fs.readFileSync(
  path.resolve(__dirname, '../../../main/resources/locales/en/translation/steps-to-making-your-claim.json'),
  'utf-8'
);
const stepsToMakingYourClaimJSON = JSON.parse(stepsToMakingYourClaimJSONRaw);

const PAGE_URL = '/steps-to-making-your-claim';
const rowClass = 'govuk-table__row';
const cellClass = 'govuk-table__cell';

const tableClass = 'govuk-table';
const headerClass = 'govuk-table__header';
const titleClass = 'govuk-heading-xl govuk-!-margin-bottom-2';
const expectedTitle = stepsToMakingYourClaimJSON.h1;
const expectedHeader1 = stepsToMakingYourClaimJSON.section1.title;
const expectedHeader2 = stepsToMakingYourClaimJSON.section2.title;
const expectedHeader3 = stepsToMakingYourClaimJSON.section3.title;
const expectedHeader4 = stepsToMakingYourClaimJSON.section4.title;

let htmlRes: Document;

describe('Steps to making your claim page', () => {
  beforeAll(async () => {
    await request(
      mockAppWithRedisClient({
        session: mockSession([], [], []),
        redisClient: mockRedisClient(
          new Map<CaseDataCacheKey, string>([
            [CaseDataCacheKey.CLAIMANT_REPRESENTED, YesOrNo.YES],
            [CaseDataCacheKey.CASE_TYPE, CaseType.SINGLE],
            [CaseDataCacheKey.TYPES_OF_CLAIM, JSON.stringify([TypesOfClaim.WHISTLE_BLOWING])],
          ])
        ),
      })
    )
      .get(PAGE_URL)
      .then(res => {
        htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
      });
  });

  it('should display title', () => {
    const title = htmlRes.getElementsByClassName(titleClass);
    expect(title[0].innerHTML).contains(expectedTitle, 'Page title does not exist');
  });

  it('should display correct number of rows', () => {
    const row = htmlRes.getElementsByClassName(rowClass);
    expect(row.length).equal(12, 'number of tables found is not 14');
  });

  it('should display the correct number of tables', () => {
    const table = htmlRes.getElementsByClassName(tableClass);
    expect(table.length).equal(4, 'number of tables found is not 4');
  });

  it('should display the correct number of cells', () => {
    const cell = htmlRes.getElementsByClassName(cellClass);
    expect(cell.length).equal(16, 'number of cells found is not 20');
  });

  it('should display the correct number of table headers', () => {
    const header = htmlRes.getElementsByClassName(headerClass);
    expect(header.length).equal(4, 'number of table headers found is not 4');
  });

  it('should display the correct table header texts', () => {
    const header = htmlRes.getElementsByClassName(headerClass);
    expect(header[0].innerHTML).contains(expectedHeader1, 'could not find table 1 header text');
    expect(header[1].innerHTML).contains(expectedHeader2, 'could not find table 2 header text');
    expect(header[2].innerHTML).contains(expectedHeader3, 'could not find table 3 header text');
    expect(header[3].innerHTML).contains(expectedHeader4, 'could not find table 4 header text');
  });

  it(
    'should have the correct link(PageUrls.CLAIM_TYPE_DISCRIMINATION) on Summarise what happened to you ' +
      'when TypesOfClaim.DISCRIMINATION selected',
    async () => {
      await request(
        mockAppWithRedisClient({
          session: mockSession([], [], []),
          redisClient: mockRedisClient(
            new Map<CaseDataCacheKey, string>([
              [CaseDataCacheKey.CLAIMANT_REPRESENTED, YesOrNo.YES],
              [CaseDataCacheKey.CASE_TYPE, CaseType.SINGLE],
              [CaseDataCacheKey.TYPES_OF_CLAIM, JSON.stringify([TypesOfClaim.DISCRIMINATION])],
            ])
          ),
        })
      )
        .get(PAGE_URL)
        .then(res => {
          htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
        });
      const links = htmlRes.getElementsByClassName('govuk-link');
      expect(links[7].outerHTML).contains(PageUrls.CLAIM_TYPE_DISCRIMINATION.toString());
    }
  );
  it(
    'should have the correct link(PageUrls.CLAIM_TYPE_PAY) on Summarise what happened to you ' +
      'when TypesOfClaim.PAY_RELATED_CLAIM selected and TypesOfClaim.DISCRIMINATION is not selected',
    async () => {
      await request(
        mockAppWithRedisClient({
          session: mockSession([TypesOfClaim.WHISTLE_BLOWING, TypesOfClaim.PAY_RELATED_CLAIM], [], []),
          redisClient: mockRedisClient(
            new Map<CaseDataCacheKey, string>([
              [CaseDataCacheKey.CLAIMANT_REPRESENTED, YesOrNo.YES],
              [CaseDataCacheKey.CASE_TYPE, CaseType.SINGLE],
              [CaseDataCacheKey.TYPES_OF_CLAIM, JSON.stringify([TypesOfClaim.PAY_RELATED_CLAIM])],
            ])
          ),
        })
      )
        .get(PAGE_URL)
        .then(res => {
          htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
        });
      const links = htmlRes.getElementsByClassName('govuk-link');
      expect(links[7].outerHTML).contains(PageUrls.CLAIM_TYPE_PAY.toString());
    }
  );
  it(
    'should have the correct link(PageUrls.STILL_WORKING) on Employment status ' +
      'when TypesOfClaim.UNFAIR_DISMISSAL is selected',
    async () => {
      await request(
        mockAppWithRedisClient({
          session: mockSession([TypesOfClaim.UNFAIR_DISMISSAL], [], []),
          redisClient: mockRedisClient(
            new Map<CaseDataCacheKey, string>([
              [CaseDataCacheKey.CLAIMANT_REPRESENTED, YesOrNo.YES],
              [CaseDataCacheKey.CASE_TYPE, CaseType.SINGLE],
              [CaseDataCacheKey.TYPES_OF_CLAIM, JSON.stringify([TypesOfClaim.UNFAIR_DISMISSAL])],
            ])
          ),
        })
      )
        .get(PAGE_URL)
        .then(res => {
          htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
        });
      const links = htmlRes.getElementsByClassName('govuk-link');
      expect(links[5].outerHTML).contains(PageUrls.STILL_WORKING.toString());
    }
  );
  it(
    'should have the correct link(PageUrls.PAST_EMPLOYER) on Employment status ' +
      'when TypesOfClaim.UNFAIR_DISMISSAL is not selected',
    async () => {
      await request(
        mockAppWithRedisClient({
          session: mockSession([], [], []),
          redisClient: mockRedisClient(
            new Map<CaseDataCacheKey, string>([
              [CaseDataCacheKey.CLAIMANT_REPRESENTED, YesOrNo.YES],
              [CaseDataCacheKey.CASE_TYPE, CaseType.SINGLE],
              [CaseDataCacheKey.TYPES_OF_CLAIM, JSON.stringify([TypesOfClaim.PAY_RELATED_CLAIM])],
            ])
          ),
        })
      )
        .get(PAGE_URL)
        .then(res => {
          htmlRes = new DOMParser().parseFromString(res.text, 'text/html');
        });
      const links = htmlRes.getElementsByClassName('govuk-link');
      expect(links[5].outerHTML).contains(PageUrls.PAST_EMPLOYER.toString());
    }
  );
});
