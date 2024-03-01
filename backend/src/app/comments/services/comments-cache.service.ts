import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { COMMENTS_CACHE } from '../enums/comments-cache.enum';
import { getSpecialKey } from 'src/utils/cache.utils';
import { RedisCacheService } from 'src/interfaces/redis-cache-service.interface';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { CommentList } from '../models/comment-list.model';

@Injectable()
export class CommentsCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: RedisCacheService) {}

  async getCommentsList(props: GetCommentListArgs): Promise<CommentList> {
    const key = getSpecialKey(COMMENTS_CACHE.COMMENTS_LIST, props);
    const data = await this.cacheService.get<CommentList>(key);
    return data;
  }

  async setCommentsList(
    props: GetCommentListArgs,
    value: CommentList,
    ttl?: number,
  ): Promise<void> {
    const key = getSpecialKey(COMMENTS_CACHE.COMMENTS_LIST, props);
    await this.cacheService.set(key, value, ttl);
  }

  async delCommentsList(): Promise<void> {
    const keys = await this.cacheService.store.keys();
    const keysToDel = keys.filter((key) =>
      key.includes(COMMENTS_CACHE.COMMENTS_LIST),
    );
    await this.cacheService.store.mdel(...keysToDel);
  }
}
