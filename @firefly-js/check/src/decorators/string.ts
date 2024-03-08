import ObjectValidator from "../validator/object";
import StringValidator from "../validator/string";

export const IsString = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    let subValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.setType("string", config?.message);
    } else {
      subValidator = new StringValidator(propertyKey.toString(), config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
};

export const MinLength = (min: number, config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.minLength(min, config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const MaxLength = (max: number, config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.maxLength(max, config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const Pattern = (pattern: RegExp, config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.pattern(pattern, config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const IsEmail = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.email(config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const IsUrl = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.url(config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const IsEthAddress = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.ethAddress(config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const IsEthTxHash = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.ethTxHash(config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const IsStringNumber = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.stringNumber(config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}
