import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from './comment.model';

@ObjectType()
export class CommentList {
  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => [Int])
  commentsLength: number[];

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalComments: number;
}
