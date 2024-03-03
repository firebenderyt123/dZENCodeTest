import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from '../services/comments.service';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { CommentList } from '../models/comment-list.model';
import { CommentsCacheService } from '../services/comments-cache.service';
import { CreateCommentArgs } from '../dto/create-comment.dto';

// const pubSub = new PubSub();

@Resolver('Comments')
export class CommentsResolver {
  constructor(
    // private readonly cacheService: CommentsCacheService,
    private readonly commentsService: CommentsService,
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
    const { page, limit, order, orderBy } = params;

    // const commentList = await this.cacheService.getCommentsList(params);
    // if (commentList) return commentList;

    // const obj = {
    //   [orderBy]: order,
    // };
    // const orderObj =
    //   orderBy === 'username' || orderBy === 'email' ? { user: obj } : obj;
    // const newCommentList = await this.commentsService.find(
    //   page,
    //   limit,
    //   orderObj,
    // );
    // await this.cacheService.setCommentsList(params, newCommentList);
    // return newCommentList;
  }
}
