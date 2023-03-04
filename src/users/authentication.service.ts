import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.find(email)
    if (users.length) {
      throw new BadRequestException('Email in use')
    }

    // Generate a salt for password
    const salt = randomBytes(8).toString('hex')
    
    // Hash the password
    const hash = (await scrypt(password, salt, 32)) as Buffer
    const hashedPassword = `${salt}.${hash.toString('hex')}`

    // Create a new user and save
    const user = await this.userService.create(email, hashedPassword)

    // Return user
    return user
  }

  signin() {}
}
