// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { JwtPayload } from 'src/interfaces/jwt/jwt-payload.interface';
// import { RequestWithJwtPayload } from 'src/interfaces/jwt/jwt-request.interface';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private configService: ConfigService,
//     private jwtService: JwtService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request: RequestWithJwtPayload = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request as unknown as Request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
//         secret: this.configService.get('jwt.secret'),
//       });
//       request.jwtPayload = payload;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
