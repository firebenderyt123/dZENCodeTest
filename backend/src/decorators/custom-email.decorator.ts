import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsCustomEmail(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isCustomEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value) {
          if (!value) return false;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return typeof value === 'string' && emailRegex.test(value);
        },
        defaultMessage(args) {
          return `${args.property} must be a valid email address`;
        },
      },
    });
  };
}
