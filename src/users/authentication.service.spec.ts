import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';

it('can create an instance of users service', async () => {
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    findOne: () => Promise.resolve({}),
    create: (email: string, password: string) => Promise.resolve({ id: 1, email, password }),
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

  const service = module.get(AuthenticationService)
  expect(service).toBeDefined()
});

// describe('AuthenticationService', () => {
//   let service: AuthenticationService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AuthenticationService],
//     }).compile();

//     service = module.get<AuthenticationService>(AuthenticationService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
