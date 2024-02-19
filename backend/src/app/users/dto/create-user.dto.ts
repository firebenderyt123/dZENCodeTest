import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsStrongPassword } from 'src/decorators/strong-password.decorator';
import { TrimLowercase } from 'src/decorators/trim-lowercase.decorator';

export class CreateUserDto {
  @IsDefined({ message: 'Username is required' })
  @IsString({ message: 'Username should be a string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @TrimLowercase()
  username: string;

  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @TrimLowercase()
  email: string;

  @IsString({ message: 'Site URL should be a string' })
  @IsOptional()
  siteUrl?: string;

  @IsDefined({ message: 'Password is required' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @MaxLength(32, { message: 'Password should be less than 32 characters long' })
  @IsStrongPassword()
  password: string;
}
