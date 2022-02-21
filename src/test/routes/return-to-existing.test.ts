import request from 'supertest';

import { app } from '../../main/app';
import { YesOrNo } from '../../main/definitions/case';

describe('GET /return-to-existing', () => {
  it('should go to the return to existing claim page', async () => {
    const res = await request(app).get('/return-to-existing');
    expect(res.type).toStrictEqual('text/html');
    expect(res.status).toStrictEqual(200);
  });
});

describe('on POST /return-to-existing', () => {
  test('should redirect to home page when an option is selected', async () => {
    await request(app)
      .post('/return-to-existing')
      .send({ returnToExisting: YesOrNo.YES })
      .expect(res => {
        expect(res.status).toStrictEqual(302);
        expect(res.header['location']).toStrictEqual('https://employmenttribunals.service.gov.uk');
      });
  });
});
