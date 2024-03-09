import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GoogleRecaptchaValidator } from '@nestlab/google-recaptcha';

@Injectable()
export class GqlRecaptchaGuard implements CanActivate {
  constructor(private readonly recaptchaValidator: GoogleRecaptchaValidator) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const token = ctx.req.headers['g-recaptcha'];
    if (!token) throw new BadRequestException('Captcha required');

    try {
      const verificationResult = await this.recaptchaValidator.validate({
        response: token,
      });
      return verificationResult.success;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
