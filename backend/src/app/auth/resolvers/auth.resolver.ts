import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { NAMESPACE } from 'src/queue/queue.enums';
import { AuthResponse } from '../models/auth-response.model';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { getDataOrThrowError } from 'src/lib/utils/app-error.utils';
import { LoginUserArgs } from '../dto/login-user.dto';
import { RABBIT_CLIENT_NAME } from 'src/rabbitmq.enum';
import { AUTH_MESSAGES } from '../enums/auth-messages.enum';

@Resolver(NAMESPACE.AUTH)
export class AuthResolver {
  constructor(@Inject(RABBIT_CLIENT_NAME.AUTH) private client: ClientProxy) {}

  @Mutation(() => AuthResponse)
  async registerUser(@Args() data: RegisterUserArgs) {
    const authData = this.client.send(
      { cmd: AUTH_MESSAGES.REGISTER_USER },
      data,
    );
    const result = await firstValueFrom(authData);
    return getDataOrThrowError<AuthResponse>(result);
  }

  @Mutation(() => AuthResponse)
  async loginUser(@Args() data: LoginUserArgs) {
    const authData = this.client.send({ cmd: AUTH_MESSAGES.LOGIN_USER }, data);
    const result = await firstValueFrom(authData);
    return getDataOrThrowError<AuthResponse>(result);
  }
}
