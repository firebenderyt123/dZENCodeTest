import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from '../services/comments.service';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { CommentList } from '../models/comment-list.model';
import { CommentsCacheService } from '../services/comments-cache.service';

@Resolver('Comments')
export class CommentsResolver {
  constructor(
    private readonly cacheService: CommentsCacheService,
    private readonly commentsService: CommentsService,
  ) {}

  @Query(() => CommentList)
  async getComments(@Args() params: GetCommentListArgs) {
    const { page, limit, order, orderBy } = params;

    const commentList = await this.cacheService.getCommentsList(params);
    if (commentList) return commentList;

    const obj = {
      [orderBy]: order.toUpperCase(),
    };
    const orderObj =
      orderBy === 'username' || orderBy === 'email'
        ? {
            user: obj,
          }
        : obj;
    const newCommentList = await this.commentsService.find(
      page,
      limit,
      orderObj,
    );
    await this.cacheService.setCommentsList(params, newCommentList);
    return newCommentList;
  }
}
