import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from '../../DTOs/SignUpDto';
import { SignInDto } from 'src/DTOs/SignInDto';

@Controller('/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/sign-up')
  addUser(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.service.createUser(body);
  }
  @Post('/sign-in')
  loginUser(@Body(new ValidationPipe()) body: SignInDto) {
    return this.service.loginUser(body);
  }
}
