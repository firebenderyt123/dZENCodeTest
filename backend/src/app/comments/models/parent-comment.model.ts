import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParentComment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;
}
