import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userSample: User;
  let fakeUserService: Partial<UsersService>
  let fakeAuthenticationService: Partial<AuthenticationService>

  beforeEach(async () => {
    userSample = {
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
      signin: (email, password) => Promise.resolve({
        id: userSample.id,
        username: email,
        password
      }),
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

  it('`findAllUsers` should return an array of users with a email', async () => {
    jest.spyOn(fakeUserService, 'find')
    const users = await controller.findAllUsers(userSample.username)

    expect(users.length).toEqual(1)
    expect(users[0].username).toEqual(userSample.username)
    expect(fakeUserService.find).toHaveBeenCalled()
  });

  it('`findUser` should return a user with an id', async () => {
    jest.spyOn(fakeUserService, 'findOne')
    const user = await controller.findUser(userSample.id)
    expect(user.username).toEqual(userSample.username)
    expect(fakeUserService.findOne).toHaveBeenCalled()
  });

  it('`findUser` should throw an error if user not found', async () => {
    jest.spyOn(fakeUserService, 'findOne').mockImplementation(() => Promise.resolve(null))
    await expect(controller.findUser(userSample.id)).rejects.toThrow(NotFoundException)
  })

  it('`signin` should return a user with a token', async () => {
    jest.spyOn(fakeAuthenticationService, 'signin')

    const session = {}
    const user = await controller.signin({
      email: userSample.username,
      password: userSample.password
    }, session)

    expect(user.username).toEqual(userSample.username)
    expect(session['userId']).toEqual(userSample.id)
    expect(fakeAuthenticationService.signin).toHaveBeenCalled()
  })

});
