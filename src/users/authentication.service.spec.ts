import { Test, TestingModule } from '@nestjs/testing';
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
});
