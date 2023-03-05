import { Body, Controller, Post, Get, Query, Delete, Param, Patch, NotFoundException, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

  constructor (
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
  ) {}

  @Get('/whoami')
  async whoAmI(@CurrentUser() user: string) {
    return user
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authenticationService.signup(body.email, body.password);
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authenticationService.signin(body.email, body.password);
    session.userId = user.id
    return user
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running')
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const { email, password } = body;
    return this.usersService.update(id, { username: email, password });
  }
  
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
