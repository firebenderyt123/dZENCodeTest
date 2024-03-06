import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { CommentList } from '../models/comment-list.model';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { NAMESPACE } from 'src/lib/enums/resolvers-namespace.enums';
import { Inject, UseGuards } from '@nestjs/common';
import { RABBIT_CLIENT_NAME } from 'src/lib/enums/rabbitmq.enum';
import { ClientProxy } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { firstValueFrom } from 'rxjs';
import { getDataOrThrowError } from 'src/lib/utils/app-error.utils';
import { JwtPayload } from 'src/lib/interfaces/jwt-payload.interface';
import { Jwt } from 'src/lib/decorators/jwt.decorator';
import { Comment } from '../models/comment.model';
import { GqlAuthGuard } from 'src/lib/guards/jwt-gql.guard';

@Resolver(NAMESPACE.COMMENTS)
export class CommentsResolver {
  constructor(
    @Inject(RABBIT_CLIENT_NAME.COMMENTS) private readonly client: ClientProxy,
  ) {}

  @Mutation(() => Int)
  @UseGuards(GqlAuthGuard)
  async addComment(
    @Jwt() jwtPayload: JwtPayload,
    @Args() data: CreateCommentArgs,
  ) {
    const commentId = this.client.send<void>(
      { cmd: COMMENTS_MESSAGES.CREATE_COMMENT },
      { userId: jwtPayload.id, data },
    );
    const result = await firstValueFrom(commentId);
    return getDataOrThrowError<Comment>(result);
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
