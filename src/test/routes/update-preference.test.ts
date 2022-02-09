import request from 'supertest';

import { app } from '../../main/app';

describe('GET /how-would-you-like-to-be-updated-about-your-claim', () => {
  it('should return the how would you like to be updated about your claim page', async () => {
    const res = await request(app).get('/how-would-you-like-to-be-updated-about-your-claim');
    expect(res.type).toStrictEqual('text/html');
    expect(res.status).toStrictEqual(200);
  });
});

describe('on POST /how-would-you-like-to-be-updated-about-your-claim', () => {
  test('should reload the current page when the Email radio button is selected', async () => {
    await request(app)
      .post('/how-would-you-like-to-be-updated-about-your-claim')
      .send({ 'update-preference': 'Email' })
      .expect(res => {
        expect(res.status).toStrictEqual(302);
        expect(res.header['location']).toStrictEqual('/how-would-you-like-to-be-updated-about-your-claim');
      });
  });
});

test('should reload the current page when the Post radio button is selected', async () => {
  await request(app)
    .post('/how-would-you-like-to-be-updated-about-your-claim')
    .send({ 'update-preference': 'Post' })
    .expect(res => {
      expect(res.status).toStrictEqual(302);
      expect(res.header['location']).toStrictEqual('/how-would-you-like-to-be-updated-about-your-claim');
    });
});
