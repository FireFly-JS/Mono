import NumberValidator from "../validator/number";
import ObjectValidator from "../validator/object";

export const IsNumber = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    let subValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.setType("number", config?.message);
    } else {
      subValidator = new NumberValidator(propertyKey.toString(), config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
};

export const Min = (min: number, config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: NumberValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.min(min, config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const Max = (max: number, config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: NumberValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.max(max, config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}