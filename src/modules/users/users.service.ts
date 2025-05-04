import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async findAll(email: string): Promise<User[]> {
    try {
      const users = await this.UserModel.find({ email: { $ne: email } }).select(
        '-password -__v -_id',
      );
      return users;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve users');
    }
  }
  async getProfile(email: string): Promise<Partial<User>> {
    try {
      const user = await this.UserModel.findOne({ email: email })
        .select('-password -__v -_id')
        .lean();
      if (user) {
        return user;
      } else {
        throw new NotFoundException("Can't retrive user data at this time");
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Server faces an issue at this time, try later',
      );
    }
  }
}
