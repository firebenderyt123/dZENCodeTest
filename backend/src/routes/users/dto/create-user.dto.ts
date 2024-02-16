import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'Username is required' })
  @IsString({ message: 'Username should be a string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @Transform(({ value }) => value.trim().toLowerCase())
  username: string;

  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsString({ message: 'Site URL should be a string' })
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : undefined))
  site_url?: string;

  @IsDefined({ message: 'Password is required' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @MaxLength(32, { message: 'Password should be less than 32 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    {
      message:
        'Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    },
  )
  password: string;
}
