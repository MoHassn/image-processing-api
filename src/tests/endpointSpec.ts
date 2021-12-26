import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async (done) => {
    const response = await request
      .get('/')
      .query({ filename: 'fjord', width: '200', height: '200' });
    expect(response.status).toBe(200);
    done();
  });
  it('responds with 404 status when file does not exist', async (done) => {
    const response = await request
      .get('/')
      .query({ filename: 'nature', width: '200', height: '200' });
    expect(response.status).toBe(404);
    done();
  });
});
