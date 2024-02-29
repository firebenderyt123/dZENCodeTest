import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CommentList } from '../interfaces/comment-list';
import { COMMENTS_CACHE } from '../enums/comments-cache.enum';
import { GetCommentsListDto } from '../dto/get-comments-list.dto';
import { getSpecialKey } from 'src/utils/cache.utils';

@Injectable()
export class CommentsCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

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
}
