import BaseValidator from "../validator/base";
import NumberValidator from "../validator/number";
import ObjectValidator from "../validator/object";
import StringValidator from "../validator/string";

export default function Validator(config?: {
  required?: boolean | string;
}): ClassDecorator {
  return (target) => {
    const validator =
      Reflect.getMetadata("validator", target) ||
      new ObjectValidator(target.name);
    if (config?.required === true) {
      validator.required();
    } else if (typeof config?.required === "string")
      validator.required(config?.required);
    Reflect.defineMetadata("validator", validator, target);
  };
}

export function Required(config?: { message?: string }): PropertyDecorator {
  return (target, key) => {
    const validator: ObjectValidator = Reflect.getMetadata(
      "validator",
      target.constructor
    ) || new ObjectValidator(target.constructor.name);
    validator.getProperty(key.toString())
    let keyValidator = validator.getProperty(key.toString());
    if (!keyValidator) {
      keyValidator =  new BaseValidator(key.toString()).required(config?.message);
    }
    keyValidator.required(config?.message);
    validator.setProperty(key.toString(), keyValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}

export const OneOf = (values: any[], config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    const subValidator: StringValidator | NumberValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.oneOf(values, config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}
