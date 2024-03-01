import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentAuthor } from 'src/app/comments/models/comment-author.model';
import { ParentComment } from './parent-comment.model';
import { Comment } from './comment.model';
import { CommentAttachment } from './comment-attachment.model';

@ObjectType()
export class NewComment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => CommentAuthor)
  user: CommentAuthor;

  @Field()
  createdAt: Date;

  @Field(() => ParentComment, { nullable: true })
  parent: ParentComment;

  @Field(() => [Comment], { defaultValue: [] })
  replies: Comment[];

  @Field(() => [CommentAttachment], { defaultValue: [] })
  attachments: CommentAttachment[];
}
