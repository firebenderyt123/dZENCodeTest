import {
  Args,
  Context,
  GqlContextType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { NAMESPACE } from 'src/queue/queue.enums';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { getDataOrThrowError } from 'src/lib/utils/app-error.utils';
import { RABBIT_CLIENT_NAME } from 'src/rabbitmq.enum';
import { User } from '../models/user.model';
import { USERS_MESSAGES } from '../enums/users-messages.enum';
import { GqlAuthGuard } from 'src/lib/guards/jwt-gql.guard';
import { Jwt, JwtPayload } from 'src/lib/decorators/jwt.decorator';

@Resolver(NAMESPACE.USERS)
export class UsersResolver {
  constructor(@Inject(RABBIT_CLIENT_NAME.USER) private client: ClientProxy) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getUser(@Jwt() jwtPayload: JwtPayload) {
    console.log(jwtPayload);
    const userData = this.client.send(
      { cmd: USERS_MESSAGES.GET_PROFILE },
      jwtPayload.id,
    );
    const result = await firstValueFrom(userData);
    return getDataOrThrowError<User>(result);
  }

  //   @Mutation(() => AuthResponse)
  //   async loginUser(@Args() data: LoginUserArgs) {
  //     const authData = this.client.send({ cmd: AUTH_MESSAGES.LOGIN_USER }, data);
  //     const result = await firstValueFrom(authData);
  //     return getDataOrThrowError<User>(result);
  //   }
}
