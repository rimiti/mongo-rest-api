import request from 'supertest';
import app from '../../../src';

describe('[POST] - /lists', () => {
  it('Should returns 200', async (done) => {
    const signIn = await request(app)
      .post(`/users`)
      .send({
        login: 'john3',
        password: 'myfonciapassword',
      })
      .set('Content-Type', 'application/json');
    expect(signIn.statusCode).toEqual(204);

    const login = await request(app)
      .post(`/login`)
      .send({
        login: 'john3',
        password: 'myfonciapassword',
      })
      .set('Content-Type', 'application/json');
    expect(login.statusCode).toEqual(200);
    expect(login.body).toHaveProperty('token');

    const list = await request(app)
      .get(`/lists`)
      .set('Content-Type', 'application/json');
    expect(list.statusCode).toEqual(200);
    console.log(list.body);
    expect(list.body.pagination).toHaveProperty('current', 1);

    const listPage2 = await request(app)
      .get(`/lists?page=2`)
      .set('Content-Type', 'application/json');

    expect(listPage2.statusCode).toEqual(200);
    console.log(listPage2.body);
    expect(listPage2.body.pagination).toHaveProperty('current', 2);
    done();
  });

  it('Should returns 401', async (done) => {
    const list = await request(app)
      .get(`/lists`)
      .set('Content-Type', 'application/json');
    expect(list.statusCode).toEqual(401);
    done();
  });
});
