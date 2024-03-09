import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UnauthenticatedError } from '../models/app-error.model';

@Injectable()
export class GqlAuthGuard extends AuthGuard('customJwt') {
  handleRequest(err: Error, user: any) {
    if (err || !user) {
      throw new UnauthenticatedError();
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
