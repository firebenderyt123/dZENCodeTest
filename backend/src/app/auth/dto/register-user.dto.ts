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
import { IsValidUsername } from 'src/decorators/username-valid.decorator';

export class RegisterUserDto {
  @IsDefined({ message: 'Username is required' })
  @IsString({ message: 'Username should be a string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @MaxLength(50)
  @TrimLowercase()
  @IsValidUsername()
  username: string;

  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(100)
  @TrimLowercase()
  email: string;

  @IsString({ message: 'Site URL should be a string' })
  @MaxLength(255)
  @IsOptional()
  siteUrl?: string;

  @IsDefined({ message: 'Password is required' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @MaxLength(32, { message: 'Password should be less than 32 characters long' })
  @IsStrongPassword()
  password: string;
}
