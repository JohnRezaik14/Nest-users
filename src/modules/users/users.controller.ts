import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Get('/all')
  getAllUsers() {
    return this.service.findAll();
  }
}
