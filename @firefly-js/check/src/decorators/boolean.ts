import BooleanValidator from "../validator/boolean";
import ObjectValidator from "../validator/object";

export const IsBoolean = (config?: { message?: string }): PropertyDecorator => {
  return (target, propertyKey) => {
    const validator: ObjectValidator =
      Reflect.getMetadata("validator", target.constructor) ||
      new ObjectValidator(target.constructor.name);
    let subValidator: BooleanValidator = validator.getProperty(propertyKey.toString());
    if (subValidator) {
      subValidator.setType("boolean", config?.message);
    } else {
      subValidator = new BooleanValidator(propertyKey.toString(), config?.message);
    }
    validator.setProperty(propertyKey.toString(), subValidator);
    Reflect.defineMetadata("validator", validator, target.constructor);
  };
}