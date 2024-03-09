import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NAMESPACE } from 'src/lib/enums/resolvers-namespace.enums';
import { UseGuards } from '@nestjs/common';
import { User } from '../models/user.model';
import { GqlAuthGuard } from 'src/lib/guards/jwt-gql.guard';
import { Jwt, JwtPayload } from 'src/lib/decorators/jwt.decorator';
import { PatchUserDto } from '../dto/patch-user.dto';
import { UsersService } from '../services/users.service';

@Resolver(NAMESPACE.USERS)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getUser(@Jwt() jwtPayload: JwtPayload) {
    return await this.usersService.findOneById(jwtPayload.id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async patchUser(@Jwt() jwtPayload: JwtPayload, @Args() data: PatchUserDto) {
    return await this.usersService.patchUser(jwtPayload.id, data);
  }
}
