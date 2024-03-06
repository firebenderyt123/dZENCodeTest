import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();
export const Jwt = createParamDecorator(
  (_: unknown, context: ExecutionContext): JwtPayload => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      return null;
    }

    const tokenPayload = jwtService.decode(token.replace('Bearer ', ''));

    if (!tokenPayload) {
      throw new UnauthorizedException();
    }

    return { id: tokenPayload.id };
  },
);
export type { JwtPayload };
