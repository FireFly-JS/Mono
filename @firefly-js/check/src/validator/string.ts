import { inspect } from 'util';
const { custom } =  inspect
import BaseValidator from "./base";
import { formatOutputValidate } from '../utils';

export default class StringValidator extends BaseValidator {
  constructor(name: string, message?: string) {
    super(name);
    this.setType("string", message || `${this.name} must be a string`);
  }

  minLength(min: number, message?: string) {
    this.schema.minLength = {
      value: min,
      message: message || `${this.name} must be at least ${min} characters`,
    };
    return this;
  }

  maxLength(max: number, message?: string) {
    this.schema.maxLength = {
      value: max,
      message: message || `${this.name} must be at most ${max} characters`,
    };
    return this;
  }

  pattern(pattern: RegExp, message?: string) {
    this.schema.pattern = {
      value: pattern,
      message: message || `${this.name} is invalid`,
    };
    return this;
  }

  email(message?: string) {
    return this.pattern(/\S+@\S+\.\S+/, message || `${this.name} must be a valid email`);
  }

  url(message?: string) {
    return this.pattern(/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/, message || `${this.name} must be a valid url`);
  }

  ethAddress(message?: string) {
    return this.pattern(/^0x[a-fA-F0-9]{40}$/, message || `${this.name} must be a valid ethereum address`);
  }

  ethTxHash(message?: string) {
    return this.pattern(/^0x[a-fA-F0-9]{64}$/, message || `${this.name} must be a valid ethereum transaction hash`);
  }

  stringNumber(message?: string) {
    return this.pattern(/^[0-9]+$/, message || `${this.name} must be a valid string number`);
  }

  oneOf(values: string[], message?: string) {
    this.schema.enum = {
      value: values,
      message: message || `${this.name} must be one of ${values.join(", ")}`,
    };
    return this;
  }

  validate(value: any) {
    let result  = super.validate(value);
    let error: Record<string, Record<string, string>> = { ...(result.error || {}) }
    // Validate type
    if (typeof value !== "string") {
      if (this.schema?.required?.value && typeof value !== "undefined") {
        error.type = {
          name: this.name,
          message: this.schema.type.message || `${this.name} must be a string`,
        }
      } else {
        error.type = {
          name: this.name,
          message: this.schema.type.message || `${this.name} must be a string`,
        }
      }
    } else {
      // Validate length
      if (typeof this?.schema?.minLength?.value === 'number' && value.length < this.schema.minLength.value) {
        error.minLength = {
          name: this.name,
          message: this.schema.minLength.message || `${this.name} must be at least ${this.schema.minLength.value} characters`,
        }
      }
      if (typeof this?.schema?.maxLength?.value === 'number' && value.length > this.schema.maxLength.value) {
        error.maxLength = {
          name: this.name,
          message: this.schema.maxLength.message || `${this.name} must be at most ${this.schema.maxLength.value} characters`,
        }
      }

      // Validate pattern
      if (typeof this?.schema?.pattern?.value !== 'undefined' && !this?.schema?.pattern?.value?.test?.(value)) {
        error.pattern = {
          name: this.name,
          message: this.schema.pattern.message || `${this.name} is invalid`,
        }
      }

      // Validate enum
      if (Array.isArray(this?.schema?.enum?.value) && !this.schema.enum.value.includes(value)) {
        error.enum = {
          name: this.name,
          message: this.schema.enum.message || `${this.name} must be one of ${this.schema.enum.value.join(", ")}`,
        }
      }
    }
    return formatOutputValidate(value, error);

  }
}