import { formatOutputValidate } from "../utils";
import BaseValidator from "./base";

export default class ObjectValidator extends BaseValidator {
  constructor(
    name: string,
    properties: Record<string, BaseValidator> = {},
    message?: string
  ) {
    super(name);
    this.schema.type = {
      value: "object",
      message: message || `${this.name} must be an object`,
    };
    this.schema.properties = {
      value: properties,
      message: `Properties of ${this.name} is not a valid object`,
    };
  }

  setProperty(name: string, validator: BaseValidator) {
    this.schema.properties.value[name] = validator;
    return this;
  }

  getProperty<T extends BaseValidator>(key: string): T {
    return this.schema.properties.value[key];
  }

  validate(value: any) {
    const result = super.validate(value);
    let error = { ...(result.error || {}) };
    // Validate type
    if (typeof value !== "object") {
      if (this.schema?.required?.value) {
        error.type = {
          name: this.name,
          message: this.schema.type.message || `${this.name} must be an object`,
        };
      } else {
        if (typeof value !== "undefined") {
          error.type = {
            name: this.name,
            message:
              this.schema.type.message || `${this.name} must be an object`,
          };
        }
      }
    } else {
      // Validate properties
      if (typeof this?.schema?.properties?.value === "object") {
        Object.keys(this?.schema?.properties?.value).forEach((key) => {
          const result = this?.schema.properties.value[key].validate(
            value[key]
          );
          if (result.status === "error") {
            error[key] = result.error;
          }
        });
      } else {
        error.properties = {
          name: this.name,
          message:
            this.schema.properties.message ||
            `Properties of ${this.name} is not a valid object`,
        };
      }
    }
    return formatOutputValidate(value, error);
  }
}
