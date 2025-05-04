import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password too weak. Must include upper, lower, number, and min 8 chars.',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Full name must contain only alphabetic characters and spaces.',
  })
  fullName: string;

  @IsNumber({}, { message: 'Age must be a number.' })
  @Min(16, { message: 'Age must be at least 16.' })
  @Max(60, { message: 'Age must not exceed 60.' })
  @ApiProperty()
  age: number;

  @ApiProperty()
  @Matches(/^01[0-9]{9}$/, {
    message:
      'Invalid mobile number format,must start with 01 and be 11 numbers',
  })
  mobileNumber: string;

  @ApiProperty()
  @IsOptional()
  userName: string;
}
