import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private service: AuthService) {}
  @Get('/all')
  getAllUsers() {
    return this.service.findAll();
  }
}
