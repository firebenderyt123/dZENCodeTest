import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TrimLowercase } from 'src/decorators/trim-lowercase.decorator';
import { IsValidUsername } from 'src/decorators/username-valid.decorator';

export class PatchUserDto {
  @IsString({ message: 'Username should be a string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @MaxLength(50)
  @IsOptional()
  @TrimLowercase()
  @IsValidUsername()
  username?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(100)
  @IsOptional()
  @TrimLowercase()
  email?: string;

  @IsString({ message: 'Site URL should be a string' })
  @MaxLength(255)
  @IsOptional()
  siteUrl?: string;
}
