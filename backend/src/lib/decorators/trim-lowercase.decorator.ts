import { Transform } from 'class-transformer';

export function TrimLowercase() {
  return function (object: NonNullable<unknown>, propertyName: string) {
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim().toLowerCase() : value,
    )(object, propertyName);
  };
}
