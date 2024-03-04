import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { AuthTokenService } from './auth-token.service';
import { AuthResponse } from '../models/auth-response.model';
import { LoginUserArgs } from '../dto/login-user.dto';

@Injectable()
export class AuthUserService {
  constructor(
    private authTokenService: AuthTokenService,
    private usersService: UsersService,
  ) {}

  async signUp(userData: RegisterUserArgs): Promise<AuthResponse> {
    const user = await this.usersService.create(userData);
    return await this.authTokenService.getAuth(user);
  }

  async signIn(userData: LoginUserArgs): Promise<AuthResponse> {
    const { email, password } = userData;
    const user = await this.usersService.searchByEmailAndPassword(
      email,
      password,
    );
    return await this.authTokenService.getAuth(user);
  }
}
