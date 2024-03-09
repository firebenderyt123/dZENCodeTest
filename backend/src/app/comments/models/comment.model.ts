import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentAuthor } from 'src/app/comments/models/comment-author.model';
import { CommentAttachment } from './comment-attachment.model';
import { ParentComment } from './parent-comment.model';

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

  @Field(() => ParentComment, { nullable: true })
  parent: ParentComment;

  @Field(() => [CommentAttachment], { defaultValue: [] })
  attachments: CommentAttachment[];
}
