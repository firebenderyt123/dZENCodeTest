import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value) {
          if (!value) return false;
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
          return typeof value === 'string' && passwordRegex.test(value);
        },
        defaultMessage(args) {
          return `${args.property} should contain at least one uppercase letter, one lowercase letter, one digit, and one special character`;
        },
      },
    });
  };
}
