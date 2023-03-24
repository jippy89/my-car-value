import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Used to help DI, because DI doesn't read generics well
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(email: string, password: string) {
    const defaultRole = await this.rolesService.findOneByName('user');
    const user = this.usersRepository.create({
      username: email,
      password,
      roles: [defaultRole],
    });
    await this.usersRepository.save(user);
    return user;
  }

  async findOne(id: string) {
    if (!id) return null
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    })
    return user
  }

  async find(email: string) {
    const users = await this.usersRepository.find({
      where: { username: email },
      relations: {
        roles: true
      },
    });
    return users
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.remove(user);
  }
}
