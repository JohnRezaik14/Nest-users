import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('/users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Get('/all')
  getAllUsers(@Req() req: Request) {
    return this.service.findAll(req['email']);
  }
  @Get('/my-profile')
  getUserProfile(@Req() req: Request) {
    return this.service.getProfile(req['email']);
  }
}
