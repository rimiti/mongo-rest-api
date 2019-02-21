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
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(list.statusCode).toEqual(200);
    expect(list.body.results).toHaveLength(10);
    expect(list.body.pagination).toHaveProperty('current', 1);
    expect(list.body.pagination).toHaveProperty('pageCount', 13);
    expect(list.body.pagination).toHaveProperty('totalCount', 122);

    const listPage2 = await request(app)
      .get(`/lists?page=2`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(listPage2.statusCode).toEqual(200);
    expect(listPage2.body.results).toHaveLength(10);
    expect(listPage2.body.pagination).toHaveProperty('current', 2);
    expect(listPage2.body.pagination).toHaveProperty('pageCount', 13);
    expect(listPage2.body.pagination).toHaveProperty('totalCount', 122);

    const listPage1000000 = await request(app)
      .get(`/lists?page=1000000`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(listPage1000000.statusCode).toEqual(200);
    expect(listPage1000000.body.results).toHaveLength(0);
    expect(listPage1000000.body.pagination).toHaveProperty('current', 1000000);
    expect(listPage1000000.body.pagination).toHaveProperty('pageCount', 13);
    expect(listPage1000000.body.pagination).toHaveProperty('totalCount', 122);
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
