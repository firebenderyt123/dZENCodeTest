import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UserIdArgs {
  @Field(() => Int)
  userId: number;
}
