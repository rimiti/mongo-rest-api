import request from 'supertest';
import app from '../../../src';

describe('[POST] - /login', () => {
  it('Should returns 200', async (done) => {
    const signIn = await request(app)
      .post(`/users`)
      .send({
        login: 'john',
        password: 'myPassword',
      })
      .set('Content-Type', 'application/json');

    expect(signIn.statusCode).toEqual(204);
    done();

    const response = await request(app)
      .post(`/login`)
      .send({
        login: 'john',
        password: 'myPassword',
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    done();
  });

  it('Should returns 400', async (done) => {
    const response = await request(app)
      .post(`/login`)
      .send({
        login: 'john2',
        password: 'wrongPassword',
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toEqual(400);
    done();
  });
});
