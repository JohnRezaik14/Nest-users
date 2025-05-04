import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../../DTOs/SignUpDto';
import { SignInDto } from 'src/DTOs/SignInDto';
@Controller()
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/sign-up')
  addUser(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.service.createUser(body);
  }
  @Post('/sign-in')
  loginUser(@Body(new ValidationPipe()) body: SignInDto) {
    return this.service.loginUser(body);
  }
}
