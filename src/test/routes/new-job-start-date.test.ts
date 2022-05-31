import request from 'supertest';

import { PageUrls } from '../../main/definitions/constants';
import { mockApp } from '../unit/mocks/mockApp';

describe(`GET ${PageUrls.NEW_JOB_START_DATE}`, () => {
  it('should return the new job start date page', async () => {
    const res = await request(mockApp({})).get(PageUrls.NEW_JOB_START_DATE);
    expect(res.type).toStrictEqual('text/html');
    expect(res.status).toStrictEqual(200);
  });
});

describe(`on POST ${PageUrls.NEW_JOB_START_DATE}`, () => {
  test('should navigate to the new job pay page when save and continue button is clicked', async () => {
    await request(mockApp({}))
      .post(PageUrls.NEW_JOB_START_DATE)
      .send({ 'noticeEnds-day': '10', 'noticeEnds-month': '10', 'noticeEnds-year': '2014' })
      .expect(res => {
        expect(res.status).toStrictEqual(302);
        expect(res.header['location']).toStrictEqual(PageUrls.NEW_JOB_PAY);
      });
  });
});
