import { AppError, InternalServerError } from '../models/app-error.model';

function isAppError(data: unknown): data is AppError {
  if (
    typeof data === 'object' &&
    'message' in data &&
    'extensions' in data &&
    typeof data.extensions === 'object' &&
    'code' in data.extensions &&
    'statusCode' in data.extensions
  ) {
    return true;
  }
  return false;
}

function isError(data: unknown): data is Error {
  if (typeof data === 'object' && 'message' in data) {
    return true;
  }
  return false;
}

function isEmptyObject(data: unknown): data is object {
  if (typeof data === 'object' && !Object.keys(data).length) return true;
  return false;
}

export function getDataOrThrowError<T>(data: unknown): T {
  if (isAppError(data)) {
    throw new AppError(data.message, data.extensions.statusCode);
  } else if (isError(data)) {
    throw new InternalServerError(data.message);
  } else if (isEmptyObject(data)) {
    throw new InternalServerError('Server error');
  }

  return data as T;
}
