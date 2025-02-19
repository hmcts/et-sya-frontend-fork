import request from 'supertest';

import { app } from '../../main/app';
import { YesOrNo } from '../../main/definitions/case';
import { PageUrls } from '../../main/definitions/constants';
import { mockApp } from '../unit/mocks/mockApp';

describe(`GET ${PageUrls.RETURN_TO_EXISTING}`, () => {
  it('should go to the return to existing claim page', async () => {
    const res = await request(mockApp({})).get(PageUrls.RETURN_TO_EXISTING);
    expect(res.type).toStrictEqual('text/html');
    expect(res.status).toStrictEqual(200);
  });
});

describe(`on POST ${PageUrls.RETURN_TO_EXISTING}`, () => {
  test('should go to legacy ET page when YES option is selected', async () => {
    await request(mockApp({}))
      .post(PageUrls.RETURN_TO_EXISTING)
      .send({ returnToExisting: YesOrNo.YES })
      .expect(res => {
        expect(res.status).toStrictEqual(302);
        expect(res.header['location']).toStrictEqual('https://et-stg-azure.staging.et.dsd.io');
      });
  });

  test('should go to login page when NO option is selected', async () => {
    await request(app)
      .post(PageUrls.RETURN_TO_EXISTING)
      .send({ returnToExisting: YesOrNo.NO })
      .expect(res => {
        expect(res.status).toStrictEqual(302);
        expect(res.header['location']).toStrictEqual(PageUrls.CLAIMANT_APPLICATIONS);
      });
  });
});
