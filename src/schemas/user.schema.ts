import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ required: true, message: 'Full name is required' })
  fullName: string;

  @Prop({ min: 16, max: 60, message: 'Age must be between 16 and 60' })
  age: number;

  // { required: true, unique: true, message: 'This username is used' }
  @Prop()
  userName: string;

  //     unique: true,
  @Prop({
    required: true,
    match: /^01[0-9]{9}$/,
    message: 'Mobile Number must start with 01 followed by 9 digits.',
  })
  mobileNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
