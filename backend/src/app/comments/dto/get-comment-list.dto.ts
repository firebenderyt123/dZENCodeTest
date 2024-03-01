import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class GetCommentListArgs {
  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  readonly page: number = 1;

  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(100)
  readonly limit: number = 25;

  @Field(() => String, { defaultValue: 'createdAt' })
  readonly orderBy: 'username' | 'email' | 'createdAt' = 'createdAt';

  @Field(() => String, { defaultValue: 'DESC' })
  readonly order: 'ASC' | 'DESC' | 'asc' | 'desc' = 'DESC';
}
