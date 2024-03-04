import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedError } from '../models/app-error.model';

@Injectable()
export class GqlAuthGuard extends AuthGuard('customJwt') {
  handleRequest(err: Error, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedError('Not authenticated');
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
