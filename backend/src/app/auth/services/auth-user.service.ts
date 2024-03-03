import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersProfileService } from '../../users/services/users.service';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { AuthTokenService } from './auth-token.service';
import { AuthResponse } from '../models/auth-response.model';
import { LoginUserArgs } from '../dto/login-user.dto';

@Injectable()
export class AuthUserService {
  constructor(
    private authTokenService: AuthTokenService,
    private usersProfileService: UsersProfileService,
  ) {}

  async signUp(userData: RegisterUserArgs): Promise<AuthResponse> {
    const user = await this.usersProfileService.create(userData);
    return await this.authTokenService.getAuth(user);
  }

  async signIn(userData: LoginUserArgs): Promise<AuthResponse> {
    const { email, password } = userData;
    const user = await this.usersProfileService.searchByEmailAndPassword(
      email,
      password,
    );
    return await this.authTokenService.getAuth(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    return await this.usersProfileService.searchByEmailAndPassword(
      email,
      password,
    );
  }
}
