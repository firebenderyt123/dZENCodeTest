import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator';
import { IsStrongPassword } from 'src/decorators/strong-password.decorator';
import { TrimLowercase } from 'src/decorators/trim-lowercase.decorator';

export class SignInDto {
  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @TrimLowercase()
  email: string;

  @IsDefined({ message: 'Password is required' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @MaxLength(32, { message: 'Password should be less than 32 characters long' })
  @IsStrongPassword()
  password: string;
}
