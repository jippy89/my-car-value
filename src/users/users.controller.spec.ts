import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>
  let fakeAuthenticationService: Partial<AuthenticationService>

  beforeEach(async () => {
    const userSample = {
      id: '1',
      username: 'test@test.com',
      password: 'test'
    }
    // Why do I create intelligent mock?
    // Because it's from the course, you can actually create simple mock
    // I just want to practice my Jest skill
    fakeUserService = {
      find: (email: string) => Promise.resolve([userSample]),
      findOne: (id:string) => Promise.resolve({
        id,
        username: userSample.username,
        password: userSample.password
      }),
      // update: (id, attrs) => Promise.resolve({
      //   id,
      //   username: attrs.username ? attrs.username : userSample.username,
      //   password: attrs.password ? attrs.password : userSample.password
      // }),
      // remove: (id: string) => Promise.resolve(userSample),
    }
    fakeAuthenticationService = {
      // signup: () => Promise.resolve({}),
      // signin: () => Promise.resolve({}),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: fakeUserService
      }, {
        provide: AuthenticationService,
        useValue: fakeAuthenticationService
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
