import { formatOutputValidate } from "../utils";
import BaseValidator from "./base";

export default class BooleanValidator extends BaseValidator {
  constructor(name: string, message?: string) {
    super(name);
    this.setType("boolean", message || `${this.name} must be a boolean`)
  }

  validate(value: any) {
    const result = super.validate(value);
    let error = { ...(result.error || {}) };
    // Validate type
    if (typeof value !== 'boolean') {
      if (this.schema.required && typeof value !== "undefined") {
          error.type = {
            name: this.name,
            message: this.schema.type.message || `${this.name} must be a boolean`,
          }
      } else {
          error.type = {
            name: this.name,
            message: this.schema.type.message || `${this.name} must be a boolean`,
          }
      }
    } else {
      // Other validate
    }

    return formatOutputValidate(value, error)
  }
}