import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE } from '../../../queue/queue.enums';
import { CommentsCreate } from '../interfaces/comment-create.interface';

@Injectable()
export class CommentsQueueService {
  constructor(
    @InjectQueue(QUEUE.COMMENTS) private readonly commentsQueue: Queue,
  ) {}

  async createCommentJob(event: string, data: CommentsCreate) {
    console.log(event, data);
    await this.commentsQueue.add(event, data);
  }
}
