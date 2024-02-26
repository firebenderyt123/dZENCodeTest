import { Process, Processor } from '@nestjs/bull';
import { QUEUE } from '../queue.enums';

@Processor(QUEUE.USERS)
export class QueueUsersProcessor {
  @Process()
  async addProfilePatchJob(userId: string, data: any) {
    await this.usersQueue.add({ userId, data });
  }
}
