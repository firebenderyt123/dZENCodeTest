import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE } from '../queue.enums';
import { PatchUserDto } from 'src/app/users/dto/patch-user.dto';

@Injectable()
export class QueueUsersService {
  constructor(@InjectQueue(QUEUE.USERS) private readonly usersQueue: Queue) {}

  async addProfilePatch(userId: string, data: PatchUserDto) {
    await this.usersQueue.add({ userId, data });
  }
}
