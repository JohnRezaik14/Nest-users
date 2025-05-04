import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.UserModel.find().exec();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }
}
