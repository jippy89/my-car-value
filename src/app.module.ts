import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// Imported like this because Nest's TS setup broke `cookie-session`
const cookieSession = require('cookie-session');

// Entities
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { dataSourceOptions } from './db/data-source';
import { RolesModule } from './roles/roles.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule, ReportsModule, RolesModule, CaslModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    })
  }],
})
export class AppModule {

  constructor (
    private configService: ConfigService
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        })
      )
      .forRoutes('*');
  }
}
