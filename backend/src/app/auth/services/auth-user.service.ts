import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { RegisterUserArgs } from '../dto/register-user.dto';
import { AuthResponse } from '../models/auth-response.model';
import { LoginUserArgs } from '../dto/login-user.dto';
import { User } from 'src/app/users/models/user.model';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(userData: RegisterUserArgs): Promise<AuthResponse> {
    const user = await this.usersService.create(userData);
    return await this.getAuth(user);
  }

  async signIn(userData: LoginUserArgs): Promise<AuthResponse> {
    const { email, password } = userData;
    const user = await this.usersService.searchByEmailAndPassword(
      email,
      password,
    );
    return await this.getAuth(user);
  }

  private async getAuth(
    user: User,
    options?: JwtSignOptions,
  ): Promise<AuthResponse> {
    return {
      accessToken: await this.jwtService.signAsync({ id: user.id }, options),
      user,
    };
  }
}
