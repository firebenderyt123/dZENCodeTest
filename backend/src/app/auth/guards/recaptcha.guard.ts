import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaValidator } from '@nestlab/google-recaptcha';
import { Socket } from 'socket.io';

@Injectable()
export class RecaptchaWebSocketGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly recaptchaValidator: GoogleRecaptchaValidator,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.configService.get('NODE_ENV') !== 'production') return true;

    const client = context.switchToWs().getClient() as Socket;
    const captcha = client.handshake.auth.captcha;

    if (!captcha) {
      return false;
    }

    try {
      const verificationResult = await this.recaptchaValidator.validate({
        response: captcha,
      });
      if (verificationResult.success) {
        return true;
      }
    } catch (error) {}

    return false;
  }
}
