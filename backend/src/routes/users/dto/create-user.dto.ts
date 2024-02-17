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
  @Transform(
    ({ value }) => typeof value === 'string' && value.trim().toLowerCase(),
  )
  username: string;

  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Transform(
    ({ value }) => typeof value === 'string' && value.trim().toLowerCase(),
  )
  email: string;

  @IsString({ message: 'Site URL should be a string' })
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : undefined))
  site_url?: string;
}
