import { IsEmail, MaxLength } from 'class-validator';
import { IsStrongPassword } from 'src/lib/decorators/strong-password.decorator';
import { TrimLowercase } from 'src/lib/decorators/trim-lowercase.decorator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginUserArgs {
  @Field()
  @IsEmail()
  @MaxLength(100)
  @TrimLowercase()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
