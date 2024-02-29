import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE } from '../../../queue/queue.enums';
import { CommentsCreate } from '../interfaces/comment-create.interface';
import { COMMENTS_JOBS } from '../enums/comments-jobs.enum';

@Injectable()
export class CommentsQueueService {
  constructor(
    @InjectQueue(QUEUE.COMMENTS) private readonly commentsQueue: Queue,
  ) {}

  async createCommentJob(data: CommentsCreate) {
    await this.commentsQueue.add(COMMENTS_JOBS.CREATE_COMMENT, data);
  }
}
