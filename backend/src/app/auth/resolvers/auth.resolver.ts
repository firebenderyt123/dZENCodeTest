import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { NAMESPACE } from 'src/queue/queue.enums';
import { AuthQueueService } from '../services/auth-queue.service';
import { AuthResponse } from '../models/auth-response.model';
import { AUTH_EVENTS } from '../enums/auth.enum';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(NAMESPACE.AUTH)
export class AuthResolver {
  constructor(private readonly authQueue: AuthQueueService) {}

  @Mutation(() => Boolean)
  async registerUser(@Args() data: RegisterUserArgs) {
    await this.authQueue.registerUserJob(data);
    return true;
  }

  @Subscription(() => AuthResponse)
  async userRegisterSuccess() {
    return pubSub.asyncIterator(AUTH_EVENTS.AUTH_REGISTER_SUCCESS);
  }
}
