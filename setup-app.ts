import { ValidationPipe } from '@nestjs/common';
// Imported like this because Nest's TS setup broke `cookie-session`
const cookieSession = require('cookie-session');

export async function setupApp(app) {
  app.use(cookieSession({
    keys: ['asdfasdf'],
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
}
