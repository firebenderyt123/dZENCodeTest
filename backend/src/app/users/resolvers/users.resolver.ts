import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NAMESPACE } from 'src/lib/enums/resolvers-namespace.enums';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { getDataOrThrowError } from 'src/lib/utils/app-error.utils';
import { RABBIT_CLIENT_NAME } from 'src/lib/enums/rabbitmq.enum';
import { User } from '../models/user.model';
import { USERS_MESSAGES } from '../enums/users-messages.enum';
import { GqlAuthGuard } from 'src/lib/guards/jwt-gql.guard';
import { Jwt, JwtPayload } from 'src/lib/decorators/jwt.decorator';
import { PatchUserDto } from '../dto/patch-user.dto';

@Resolver(NAMESPACE.USERS)
export class UsersResolver {
  constructor(@Inject(RABBIT_CLIENT_NAME.USER) private client: ClientProxy) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getUser(@Jwt() jwtPayload: JwtPayload) {
    const userData = this.client.send(
      { cmd: USERS_MESSAGES.GET_PROFILE },
      jwtPayload.id,
    );
    const result = await firstValueFrom(userData);
    return getDataOrThrowError<User>(result);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async patchUser(@Jwt() jwtPayload: JwtPayload, @Args() data: PatchUserDto) {
    const userData = this.client.send(
      { cmd: USERS_MESSAGES.PATCH_PROFILE },
      { userId: jwtPayload.id, data },
    );
    const result = await firstValueFrom(userData);
    return getDataOrThrowError<User>(result);
  }
}
