import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupApp } from 'setup-app';
// Imported like this because Nest's TS setup broke `cookie-session`
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //   keys: ['asdfasdf'],
  // }))
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  // }));
  setupApp(app)
  await app.listen(3000);
}
bootstrap();
