import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { CommentList } from '../models/comment-list.model';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { NAMESPACE } from 'src/lib/enums/resolvers-namespace.enums';
import { Inject } from '@nestjs/common';
import { RABBIT_CLIENT_NAME } from 'src/lib/enums/rabbitmq.enum';
import { ClientProxy } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { firstValueFrom } from 'rxjs';
import { getDataOrThrowError } from 'src/lib/utils/app-error.utils';

@Resolver(NAMESPACE.COMMENTS)
export class CommentsResolver {
  constructor(
    @Inject(RABBIT_CLIENT_NAME.COMMENTS) private readonly client: ClientProxy,
  ) {}

  @Mutation(() => Number)
  async addComment(@Args() data: CreateCommentArgs) {
    console.log(data);
    // const newComment = this.commentsService.addComment({ id: postId, comment });
    // pubSub.publish('commentAdded', { commentAdded: newComment });
    // return newComment;r
    return 1;
  }

  @Query(() => CommentList)
  async getComments(@Args() params: GetCommentListArgs) {
    const comments = this.client.send(
      { cmd: COMMENTS_MESSAGES.GET_COMMENTS },
      params,
    );
    const result = await firstValueFrom(comments);
    return getDataOrThrowError<CommentList>(result);
  }
}
