import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { NAMESPACE } from '../../../queue/queue.enums';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { AuthEventEmitterService } from '../services/auth-emitter.service';
import { AuthUserService } from '../services/auth-user.service';
import { AUTH_JOBS } from '../enums/auth-jobs.enum';

@Processor(NAMESPACE.AUTH)
export class AuthQueueProcessor {
  constructor(
    private readonly authEventEmitterService: AuthEventEmitterService,
    private readonly authUserService: AuthUserService,
  ) {}

  @Process(AUTH_JOBS.REGISTER_USER)
  async processRegisterUserJob(job: Job<RegisterUserArgs>) {
    try {
      const auth = await this.authUserService.signUp(job.data);
      this.authEventEmitterService.userRegistered(auth);
    } catch (error) {
      console.log(error);
      this.authEventEmitterService.notAuthenticated();
    }
  }
}
