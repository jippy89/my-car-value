import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles signup request', () => {
    const user = {
      email: 'aaa2@aaa2.com',
      password: 'abc',
    }
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201)
      .then((res) => {
        const { id, username } = res.body;
        expect(id).toBeDefined();
        expect(username).toEqual(user.email);
      })
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const user = {
      email: 'aaa@aaa.com',
      password: 'abc',
    }

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201)

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)

    expect(body.username).toEqual(user.email)
  });
});
