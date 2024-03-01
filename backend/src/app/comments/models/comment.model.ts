import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentAuthor } from 'src/app/comments/models/comment-author.model';
import { CommentAttachment } from './comment-attachment.model';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => CommentAuthor)
  user: CommentAuthor;

  @Field()
  createdAt: string;

  @Field(() => [Comment], { defaultValue: [] })
  replies: Comment[];

  @Field(() => [CommentAttachment], { defaultValue: [] })
  attachments: CommentAttachment[];
}
