import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { COMMENTS_CACHE } from '../enums/comments-cache.enum';
import { getSimpleKey, getSpecialKey } from 'src/lib/utils/cache.utils';
import { RedisCacheService } from 'src/lib/interfaces/redis-cache-service.interface';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { CommentList } from '../models/comment-list.model';

@Injectable()
export class CommentsCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: RedisCacheService) {}

  async setCommentWaitingForUploads(
    commentId: number,
    userId: number,
    ttl: number = 5 * 60, // 5 min
  ): Promise<void> {
    const key = getSimpleKey(COMMENTS_CACHE.COMMENT_WAIT_FOR_UPLOAD, commentId);
    await this.cacheService.set(key, userId, ttl);
  }
  async getCommentWaitingForUploads(commentId: number): Promise<number> {
    const key = getSimpleKey(COMMENTS_CACHE.COMMENT_WAIT_FOR_UPLOAD, commentId);
    const data = await this.cacheService.get<number>(key);
    return data;
  }
  async delCommentWaitingForUploads(commentId: number): Promise<void> {
    const key = getSimpleKey(COMMENTS_CACHE.COMMENT_WAIT_FOR_UPLOAD, commentId);
    await this.cacheService.del(key);
  }

  async getCommentsList(props: GetCommentListArgs): Promise<CommentList> {
    const { page, limit, orderBy, order } = props;
    const key = getSpecialKey(COMMENTS_CACHE.COMMENTS_LIST, {
      page,
      limit,
      orderBy,
      order,
    });
    const data = await this.cacheService.get<CommentList>(key);
    return data;
  }
  async setCommentsList(
    props: GetCommentListArgs,
    value: CommentList,
    ttl?: number,
  ): Promise<void> {
    const { page, limit, orderBy, order } = props;
    const key = getSpecialKey(COMMENTS_CACHE.COMMENTS_LIST, {
      page,
      limit,
      orderBy,
      order,
    });
    await this.cacheService.set(key, value, ttl);
  }
  async delCommentsList(): Promise<void> {
    const keys = await this.cacheService.store.keys(
      `${COMMENTS_CACHE.COMMENTS_LIST}*`,
    );
    if (keys.length) await this.cacheService.store.mdel(...keys);
  }
}
