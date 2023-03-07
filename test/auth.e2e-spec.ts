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
});
