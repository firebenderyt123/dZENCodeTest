import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { NAMESPACE } from '../../../queue/queue.enums';
import { AUTH_JOBS } from '../enums/auth-jobs.enum';
import { RegisterUserArgs } from '../dto/register-user.dto';

@Injectable()
export class AuthQueueService {
  constructor(
    @InjectQueue(NAMESPACE.AUTH) private readonly authQueueService: Queue,
  ) {}

  async registerUserJob(data: RegisterUserArgs) {
    await this.authQueueService.add(AUTH_JOBS.REGISTER_USER, data);
  }
}
