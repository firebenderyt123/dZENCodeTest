import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CommentAuthor {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  siteUrl: string | null;
}
