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

  async findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async find(email: string) {
    return this.usersRepository.find({ where: { username: email } });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersRepository.remove(user);
  }
}
