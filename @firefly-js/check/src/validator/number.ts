import { formatOutputValidate } from "../utils";
import BaseValidator from "./base";

export default class NumberValidator extends BaseValidator {
  constructor(name: string, message?: string) {
    super(name);
    this.setType("number", message || `${this.name} must be a number`)
  }

  min(min: number, message?: string) {
    this.schema.minimum = {
      value: min,
      message: message || `${this.name} must be at least ${min}`,
    }
    return this;
  }

  max(max: number, message?: string) {
    this.schema.maximum = {
      value: max,
      message: message || `${this.name} must be at most ${max}`,
    }
    return this;
  }

  oneOf(values: number[], message?: string) {
    this.schema.enum = {
      value: values,
      message: message || `${this.name} must be one of ${values.join(", ")}`,
    }
    return this;
  }

  validate(value: any) {
    const result = super.validate(value);
    let error = { ...(result.error || {}) };
    // Validate type
    if (typeof value !== 'number') {
      if (this?.schema?.required?.value) {
        error.type = {
          name: this.name,
          message: this.schema.type.message || `${this.name} must be a number`,
        }
      } else {
        if (typeof value !== "undefined") {
          error.type = {
            name: this.name,
            message: this.schema.type.message || `${this.name} must be a number`,
          }
        }
      }
    } else {
      // Validate min
      if (typeof this?.schema?.minimum?.value === 'number' && value < this.schema.minimum.value) {
        error.minimum = {
          name: this.name,
          message: this.schema.minimum.message || `${this.name} must be at least ${this.schema.minimum.value}`,
        }
      }

      // Validate max
      if (typeof this?.schema?.maximum?.value === 'number'&& value > this.schema.maximum.value) {
        error.maximum = {
          name: this.name,
          message: this.schema.maximum.message || `${this.name} must be at most ${this.schema.maximum.value}`,
        }
      }

      // Validate enum
      if (Array.isArray(this.schema?.enum?.value) && !this.schema.enum.value.includes(value)) {
        error.enum = {
          name: this.name,
          message: this.schema.enum.message || `${this.name} must be one of ${this.schema.enum.value.join(", ")}`,
        }
      }
    }

    return formatOutputValidate(value, error);
  }
}
