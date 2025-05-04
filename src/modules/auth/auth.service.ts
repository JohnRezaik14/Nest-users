import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { SignUpDto } from '../../DTOs/SignUpDto';
import { SignInDto } from '../../DTOs/SignInDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    // private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async createUser(createUserDto: SignUpDto): Promise<object> {
    const user = await this.UserModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new ConflictException('Email is already in use');
    }
    try {
      const hashedpassword = await bcrypt.hash(createUserDto.password, 10);
      const user = { ...createUserDto, password: hashedpassword };
      const createdUser = new this.UserModel(user);
      await createdUser.save();
      return {
        email: createdUser.email,
        fullName: createdUser.fullName,
        age: createdUser.age,
        mobileNumber: createdUser.mobileNumber,
      };
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
  async loginUser(loginUserDto: SignInDto): Promise<object> {
    const user = await this.UserModel.findOne({ email: loginUserDto.email });
    if (!user) {
      throw new ConflictException('This email is not registered yet');
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new ConflictException('The password you entered is incorrect');
    } else {
      const payload = { sub: user.email };
      const token = jwt.sign(
        payload,
        this.configService.getOrThrow<string>('JWT_SECRET'),
      );

      return { token };
    }
  }
}
