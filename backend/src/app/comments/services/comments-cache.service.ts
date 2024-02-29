import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CommentList } from '../interfaces/comment-list';
import { COMMENTS_CACHE } from '../enums/comments-cache.enum';
import { GetCommentsListDto } from '../dto/get-comments-list.dto';
import { getSpecialKey } from 'src/utils/cache.utils';
import { RedisCacheService } from 'src/interfaces/redis-cache-service.interface';

@Injectable()
export class CommentsCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: RedisCacheService) {}

  async getCommentsList(props: GetCommentsListDto): Promise<CommentList> {
    const key = getSpecialKey(COMMENTS_CACHE.COMMENTS_LIST, props);
    const data = await this.cacheService.get<CommentList>(key);
    return data;
  }

  async setCommentsList(
    props: GetCommentsListDto,
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
