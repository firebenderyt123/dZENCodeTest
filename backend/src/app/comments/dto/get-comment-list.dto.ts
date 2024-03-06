import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsIn, Max, Min } from 'class-validator';

@ArgsType()
export class GetCommentListArgs {
  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  page: number = 1;

  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(100)
  limit: number = 25;

  @Field(() => String, { defaultValue: 'createdAt' })
  @IsIn(['username', 'email', 'createdAt'])
  orderBy: 'username' | 'email' | 'createdAt' = 'createdAt';

  @Field(() => String, { defaultValue: 'DESC' })
  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC' = 'DESC';
}
