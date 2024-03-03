import { Injectable } from '@nestjs/common';
import { JobId, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { NAMESPACE } from '../../queue/queue.enums';
import { JOBS } from './jobs.enum';

@Injectable()
export class CommentsQueueService {
  constructor(
    @InjectQueue(NAMESPACE.COMMENTS) private readonly commentsQueue: Queue,
  ) {}

  async createJob(job: JOBS, data: number) {
    return await this.commentsQueue.add(job, data);
  }

  async getJobStatus(jobId: JobId) {
    return (await this.commentsQueue.getJob(jobId)).progress();
  }
}
