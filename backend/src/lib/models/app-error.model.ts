import { GraphQLError, GraphQLErrorOptions } from 'graphql';
import { APP_ERRORS } from '../enums/app-error.enums';

type Extensions = {
  code: APP_ERRORS | null;
  statusCode: number;
};
interface AppErrorInterface {
  message: string;
  extensions: Extensions;
}
export class AppError extends GraphQLError implements AppErrorInterface {
  override readonly extensions: Extensions;

  constructor(
    message: string,
    statusCode: APP_ERRORS,
    options: GraphQLErrorOptions = {},
  ) {
    const { extensions, ...restOpts } = options;
    super(message, {
      ...restOpts,
      extensions: {
        code: AppError.getErrorName(statusCode),
        statusCode,
        ...extensions,
      },
    });
  }

  private static getErrorName(statusCode: number): string {
    switch (statusCode) {
      case 401:
        return 'UNAUTHENTICATED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 408:
        return 'REQUEST_TIMEOUT';
      case 409:
        return 'CONFLICT';
      case 410:
        return 'GONE';
      case 413:
        return 'PAYLOAD_TOO_LARGE';
      case 415:
        return 'UNSUPPORTED_MEDIA_TYPE';
      case 422:
        return 'UNPROCESSABLE_ENTITY';
      case 429:
        return 'TOO_MANY_REQUESTS';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      case 501:
        return 'NOT_IMPLEMENTED';
      case 502:
        return 'BAD_GATEWAY';
      case 503:
        return 'SERVICE_UNAVAILABLE';
      case 504:
        return 'GATEWAY_TIMEOUT';
      default:
        return 'UNKNOWN_ERROR';
    }
  }
}

export class UnauthenticatedError extends AppError {
  constructor(
    message: string = 'Not authenticated',
    options?: GraphQLErrorOptions,
  ) {
    super(message, APP_ERRORS.UNAUTHENTICATED, options);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.FORBIDDEN, options);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.NOT_FOUND, options);
  }
}

export class RequestTimeoutError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.REQUEST_TIMEOUT, options);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.CONFLICT, options);
  }
}

export class GoneError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.GONE, options);
  }
}

export class PayloadTooLargeError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.PAYLOAD_TOO_LARGE, options);
  }
}

export class UnsupportedMediaTypeError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.UNSUPPORTED_MEDIA_TYPE, options);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.UNPROCESSABLE_ENTITY, options);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.TOO_MANY_REQUESTS, options);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.INTERNAL_SERVER_ERROR, options);
  }
}

export class NotImplementedError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.NOT_IMPLEMENTED, options);
  }
}

export class BadGatewayError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.BAD_GATEWAY, options);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.SERVICE_UNAVAILABLE, options);
  }
}

export class GatewayTimeoutError extends AppError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    super(message, APP_ERRORS.GATEWAY_TIMEOUT, options);
  }
}
