import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body('email') email: string) {
    if (!email || !this.validateEmail(email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userService.getUser(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userService.addUser(email);
    return { status: 201, user };
  }

  private validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
