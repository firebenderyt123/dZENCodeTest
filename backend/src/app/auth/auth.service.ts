import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Auth } from './interfaces/auth.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(userData: CreateUserDto): Promise<Auth> {
    const user = await this.usersService.create(userData);
    return await this.getAuthToken(user);
  }

  async signIn(user: User): Promise<Auth> {
    return await this.getAuthToken(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    return await this.usersService.searchByEmailAndPassword(email, password);
  }

  getTokenPayload(req: FastifyRequest): JwtPayload {
    const token = this.extractTokenFromHeader(req);
    const payload = this.jwtService.decode<JwtPayload>(token);
    return payload;
  }

  private async getAuthToken(
    user: User,
    options?: JwtSignOptions,
  ): Promise<Auth> {
    return {
      accessToken: await this.jwtService.signAsync({ id: user.id }, options),
      user,
    };
  }

  private extractTokenFromHeader(req: FastifyRequest): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
