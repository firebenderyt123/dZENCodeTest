import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(userData: SignUpDto): Promise<Auth> {
    const user = await this.usersService.create(userData);
    return await this.getAuthToken(user);
  }

  async signIn(userData: SignInDto): Promise<Auth> {
    const { email, password } = userData;

    const user = await this.usersService.searchByEmailAndPassword(
      email,
      password,
    );

    if (!user)
      throw new UnauthorizedException(
        'User with the provided email and password not found',
      );

    return await this.getAuthToken(user);
  }

  private async getAuthToken(
    payload: User,
    options?: JwtSignOptions,
  ): Promise<Auth> {
    return {
      accessToken: await this.jwtService.signAsync(payload, options),
    };
  }
}
