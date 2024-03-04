import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length, MaxLength } from 'class-validator';
import { TrimLowercase } from 'src/lib/decorators/trim-lowercase.decorator';
import { IsValidUsername } from 'src/lib/decorators/username-valid.decorator';

@ArgsType()
export class PatchUserDto {
  @Field({ nullable: true })
  @Length(1, 50)
  @IsOptional()
  @TrimLowercase()
  @IsValidUsername()
  username?: string;

  @Field({ nullable: true })
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  @TrimLowercase()
  email?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsOptional()
  siteUrl?: string;
}

@ArgsType()
export class PatchUserWithIdDto {
  @Field(() => Int)
  userId: number;

  @Field(() => PatchUserDto)
  data: PatchUserDto;
}
