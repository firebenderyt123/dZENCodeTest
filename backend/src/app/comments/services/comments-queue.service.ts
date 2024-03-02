import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { NAMESPACE } from '../../../queue/queue.enums';
import { COMMENTS_JOBS } from '../enums/comments-jobs.enum';

@Injectable()
export class CommentsQueueService {
  constructor(
    @InjectQueue(NAMESPACE.COMMENTS) private readonly commentsQueue: Queue,
  ) {}

  async createCommentJob(data: number) {
    await this.commentsQueue.add(COMMENTS_JOBS.CREATE_COMMENT, data);
  }
}
