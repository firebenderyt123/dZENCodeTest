import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsValidUsername(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isValidUsername',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value) {
          if (!value) return false;
          const usernameRegex = /^[a-z0-9]{1,50}$/;
          return typeof value === 'string' && usernameRegex.test(value);
        },
        defaultMessage(args) {
          return `${args.property} should contain only a-z, 0-9`;
        },
      },
    });
  };
}
