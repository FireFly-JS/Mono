import { JsonSchema } from "../types";
import {
  formatOutputValidate,
  getErrorMessage,
  validateRequired,
} from "../utils";

export default class BaseValidator {
  protected name: string;
  protected schema: JsonSchema = {};

  constructor(name: string) {
    this.name = name;
  }

  setType(type: string, message?: string) {
    this.schema.type = {
      value: type,
      message: message || `${this.name} must be a ${type}`,
    };
    return this;
  }

  required(message?: string) {
    this.schema.required = {
      value: true,
      message: message || `${this.name} is required`,
    };
    return this;
  }

  trigger<T = any>(value: T) {
    const { status, data, error } = this.validate(value);
    if (status === "error") {
      throw new Error(getErrorMessage(error) || "Unknown error");
    }

    return data;
  }

  validate<T = any>(value: T) {
    let error: Record<string, Record<string, string>> = {};
    // Validate required
    if (this.schema?.required?.value && !validateRequired(value)) {
      error.required = {
        name: this.name,
        message: this.schema?.required?.message || `${this.name} is required`,
      }
    }

    return formatOutputValidate(value, error);
  }

  getSchema() {
    return this.schema;
  }
}
