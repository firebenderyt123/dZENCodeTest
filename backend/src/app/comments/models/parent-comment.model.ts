import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ParentComment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field()
  createdAt: Date;
}
