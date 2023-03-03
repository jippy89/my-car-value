import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Used to help DI, because DI doesn't read generics well
    private usersRepository: Repository<User>, 
  ) {}

  async create(email: string, password: string) {
    const user = this.usersRepository.create({ username: email, password });
    await this.usersRepository.save(user);
    return user;
  }
}
