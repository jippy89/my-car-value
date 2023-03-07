import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../setup-app';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app)
    await app.init();
  });

  it('handles signup request', () => {
    const user = {
      // This is ineffective, you might have to update this every test.
      // Probably will be changed later.
      email: 'zzz@aaa.com',
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
