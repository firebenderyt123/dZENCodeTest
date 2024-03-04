import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../../users/models/user.model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthResponse } from '../models/auth-response.model';

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

  async getAuth(user: User, options?: JwtSignOptions): Promise<AuthResponse> {
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
