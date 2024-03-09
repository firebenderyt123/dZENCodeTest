import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { NAMESPACE } from 'src/lib/enums/resolvers-namespace.enums';
import { AuthResponse } from '../models/auth-response.model';
import { LoginUserArgs } from '../dto/login-user.dto';
import { AuthUserService } from '../services/auth-user.service';

@Resolver(NAMESPACE.AUTH)
export class AuthResolver {
  constructor(private readonly authUserService: AuthUserService) {}

  @Mutation(() => AuthResponse)
  async registerUser(@Args() data: RegisterUserArgs) {
    return await this.authUserService.signUp(data);
  }

  @Mutation(() => AuthResponse)
  async loginUser(@Args() data: LoginUserArgs) {
    return await this.authUserService.signIn(data);
  }
}
