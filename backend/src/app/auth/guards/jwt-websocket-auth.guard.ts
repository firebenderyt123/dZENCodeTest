import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthTokenService } from '../services/auth-token.service';
// import { AuthEventEmitterService } from 'src/app/auth/services/auth-emitter.service';

@Injectable()
export class JwtWebSocketAuthGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  constructor(
    private readonly authTokenService: AuthTokenService,
    // private readonly authEventEmitterService: AuthEventEmitterService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const { token } = client.handshake.auth;

    if (!token) {
      // this.authEventEmitterService.notAuthenticated();
      return false;
    }

    try {
      const payload = await this.authTokenService.verifyAsync(token);
      context.switchToWs().getData().token = { userId: payload.id };
      return true;
    } catch (error) {
      // this.authEventEmitterService.notAuthenticated();
      return false;
    }
  }
}
