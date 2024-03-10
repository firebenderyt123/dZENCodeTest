/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { NAMESPACE } from 'src/lib/enums/resolvers-namespace.enums';
import { Inject, UseGuards } from '@nestjs/common';
import { RABBIT_CLIENT_NAME } from 'src/lib/enums/rabbitmq.enum';
import { ClientProxy } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { JwtPayload } from 'src/lib/interfaces/jwt-payload.interface';
import { Jwt } from 'src/lib/decorators/jwt.decorator';
import { GqlAuthGuard } from 'src/lib/guards/jwt-gql.guard';
import { GqlRecaptchaGuard } from 'src/lib/guards/recaptcha-gql.guard';
import { RedisPubSub } from 'graphql-redis-subscriptions/dist';
import { PUB_SUB } from 'src/lib/modules/pubsub.module';
import { UUIDArgs } from 'src/lib/dto/uuid.dto';
import { CommentList } from '../models/comment-list.model';
import { CommentsListPayload } from '../interfaces/comments-list-payload.interface';
import { UloadsValidationGuard } from 'src/lib/guards/uploads-gql.guard';
import { UploadedFiles } from 'src/lib/decorators/uploaded-files.decorator';
import { FileInput } from 'src/app/files/interfaces/file-input.interface';
import { Comment } from '../models/comment.model';
import { UserIdArgs } from 'src/lib/dto/userId.dto';
import { CommentPayload } from '../interfaces/comment-payload';

@Resolver(NAMESPACE.COMMENTS)
export class CommentsResolver {
  constructor(
    @Inject(RABBIT_CLIENT_NAME.COMMENTS) private readonly client: ClientProxy,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @UseGuards(GqlRecaptchaGuard)
  @UseGuards(UloadsValidationGuard)
  async addComment(
    @Jwt() jwtPayload: JwtPayload,
    @Args() data: CreateCommentArgs,
    @UploadedFiles() files: FileInput[],
  ) {
    this.client.emit(COMMENTS_MESSAGES.CREATE_COMMENT, {
      userId: jwtPayload.id,
      data: { ...data, files },
    });
    return true;
  }

  @Query(() => Boolean)
  async getComments(@Args() params: GetCommentListArgs) {
    this.client.emit(COMMENTS_MESSAGES.GET_COMMENTS, params);
    return true;
  }

  @Subscription(() => CommentList, {
    filter: (payload: CommentsListPayload, variables: UUIDArgs) =>
      payload.uuid === variables.uuid,
    resolve: (payload: CommentsListPayload): CommentList =>
      payload.commentsList,
  })
  async commentsList(@Args() _args: UUIDArgs) {
    return this.pubSub.asyncIterator(COMMENTS_MESSAGES.RESPONSE_COMMENT_LIST);
  }

  @Subscription(() => Comment, {
    filter: (payload: CommentPayload, variables: UserIdArgs) =>
      payload.userId === variables.userId,
    resolve: (payload: CommentPayload): Comment => payload.comment,
  })
  async createdComment(@Args() _args: UserIdArgs) {
    return this.pubSub.asyncIterator(COMMENTS_MESSAGES.RESPONSE_COMMENT);
  }
}
