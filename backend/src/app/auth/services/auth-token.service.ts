import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { Auth } from '../interfaces/auth.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthTokenService {
  constructor(private jwtService: JwtService) {}

  async verifyAsync(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token);
  }

  getTokenPayload(req: FastifyRequest): JwtPayload {
    const token = this.extractTokenFromHeader(req);
    const payload = this.jwtService.decode<JwtPayload>(token);
    return payload;
  }

  async getAuth(user: User, options?: JwtSignOptions): Promise<Auth> {
    return {
      accessToken: await this.jwtService.signAsync({ id: user.id }, options),
      user,
    };
  }

  extractTokenFromHeader(req: FastifyRequest): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
