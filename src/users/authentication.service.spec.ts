import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      // Notes: In the course, they modify the user entity
      // And it makes an error because they didn't implement `logUser`, etc
      // But you didn't got it because you don't want to modify the user entity
      // So they create this solution instead
      // create: (email: string, password: string) =>
      //   Promise.resolve({ id: 'asdfas', username: email, password } as User),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 'asdfas', username: email, password }),
    }

    // Create testing DI Container
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        // Basically, telling Nest DI Container to use fakeUsersService
        // when it look for UsersService
        {
          provide: UsersService,
          useValue: fakeUsersService,
        }
      ],
    }).compile()

    service = module.get(AuthenticationService)
  });

  it('can create an instance of users service', async () => {
    expect(service).toBeDefined()
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf')
    expect(user.password).not.toEqual('asdf')
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it('throws an error if user signs up with email that is in use', async () => {
    // This will only change for this test
    // Since logically `beforeEach` runs every test and the `fakeUsersService`
    // will be replaced with the new variable.
    fakeUsersService.find = () => Promise.resolve([{
      id: 'asdfas',
      username: 'aasdf@asd.com',
      password: 'asdf',
    }])

    // await expect(service.signup('aasdf@asd.com', 'asdf'))
    //   .rejects.toThrow(BadRequestException)
    // Alternatives to above
    const expectedUserError = service.signup('aasdf@asd.com', 'asdf')
    await expect(expectedUserError)
      .rejects.toThrow(BadRequestException)
  });
});
