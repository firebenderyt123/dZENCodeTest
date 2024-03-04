import { IncomingHttpHeaders } from 'http';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../../users/models/user.model';
import { JwtPayload } from '../../../lib/interfaces/jwt-payload.interface';
import { AuthResponse } from '../models/auth-response.model';

@Injectable()
export class AuthTokenService {
  constructor(private jwtService: JwtService) {}

  async isAuthenticated(headers: IncomingHttpHeaders): Promise<JwtPayload> {
    const token = this.extractTokenFromHeaders(headers);
    return await this.jwtService.verifyAsync<JwtPayload>(token);
  }

  async getAuth(user: User, options?: JwtSignOptions): Promise<AuthResponse> {
    return {
      accessToken: await this.jwtService.signAsync({ id: user.id }, options),
      user,
    };
  }

  private extractTokenFromHeaders(
    headers: IncomingHttpHeaders,
  ): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
