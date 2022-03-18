import request from 'supertest';

import { app } from '../../main/app';
import { YesOrNo } from '../../main/definitions/case';
import { PageUrls } from '../../main/definitions/constants';

describe(`GET ${PageUrls.MULTIPLE_RESPONDENT_CHECK}`, () => {
  it('should return multiple respondent page', async () => {
    const res = await request(app).get(PageUrls.MULTIPLE_RESPONDENT_CHECK);
    expect(res.type).toStrictEqual('text/html');
    expect(res.status).toStrictEqual(200);
  });
});

describe(`on POST ${PageUrls.MULTIPLE_RESPONDENT_CHECK}`, () => {
  test('should go to acas many page when Yes has been selected', async () => {
    await request(app)
      .post(PageUrls.MULTIPLE_RESPONDENT_CHECK)
      .send({ isMultipleRespondent: YesOrNo.YES })
      .expect(res => {
        expect(res.status).toStrictEqual(302);
        expect(res.header['location']).toStrictEqual(PageUrls.ACAS_MULTIPLE_CLAIM);
      });
  }),
    test('should go to acas single page when No has been selected', async () => {
      await request(app)
        .post(PageUrls.MULTIPLE_RESPONDENT_CHECK)
        .send({ isMultipleRespondent: YesOrNo.NO })
        .expect(res => {
          expect(res.status).toStrictEqual(302);
          expect(res.header['location']).toStrictEqual(PageUrls.ACAS_SINGLE_CLAIM);
        });
    });
});
