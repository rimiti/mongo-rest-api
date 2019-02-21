import request from 'supertest';
import app from '../../../src';

describe('[POST] - /users', () => {
  it('Should returns 200', async (done) => {
    const response = await request(app)
      .post(`/users`)
      .send({
        login: 'dimitri',
        password: 'mypassword',
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toEqual(204);
    done();
  });

  it('Should returns 400 (account already exists)', async (done) => {
    const response = await request(app)
      .post(`/users`)
      .send({
        login: 'dimitri',
        password: 'mypassword',
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toEqual(400);
    done();
  });
});
