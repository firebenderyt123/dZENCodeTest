import { IsEmail, IsOptional, MaxLength } from 'class-validator';
import { IsStrongPassword } from 'src/decorators/strong-password.decorator';
import { TrimLowercase } from 'src/decorators/trim-lowercase.decorator';
import { IsValidUsername } from 'src/decorators/username-valid.decorator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterUserArgs {
  @Field()
  @TrimLowercase()
  @IsValidUsername()
  username: string;

  @Field()
  @IsEmail()
  @MaxLength(100)
  @TrimLowercase()
  email: string;

  @Field({ nullable: true, defaultValue: null })
  @MaxLength(255)
  @IsOptional()
  siteUrl?: string | null;

  @Field()
  @IsStrongPassword()
  password: string;
}
