export type SchemeType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "oneOf"
  | "any";

export type BaseValidationSchema<T extends SchemeType> = {
  /**
   * Schema name.
   */
  name: string;

  /**
   * Schema description.
   */
  description?: string;

  /**
   * Schema type.
   */
  type:
    | T
    | {
        value: T;
        message: string;
      };

  /**
   * Schema required.
   */
  required?:
    | boolean
    | {
        value: boolean;
        message: string;
      };

  /**
   * Schema nullable.
   */
  nullable?:
    | boolean
    | {
        value: boolean;
        message: string;
      };

  /**
   * Schema custom validation.
   */
  validates?: ((value: any, message?: string) => boolean | Promise<boolean>)[];
};

export type StringValidationSchema = {
  /**
   * Minimum string length.
   */
  minLength?:
    | number
    | {
        value: number;
        message: string;
      };

  /**
   * Maximum string length.
   */
  maxLength?:
    | number
    | {
        value: number;
        message: string;
      };

  /**
   * Regular expression to match.
   */
  pattern?:
    | RegExp
    | {
        value: RegExp;
        message: string;
      };

  enum?:
    | string[]
    | {
        value: string[];
        message: string;
      };

  defaultValue?: string;
};

export type NumberValidationSchema = {
  /**
   * Minimum value.
   */
  min?:
    | number
    | {
        value: number;
        message: string;
      };

  /**
   * Maximum value.
   */
  max?:
    | number
    | {
        value: number;
        message: string;
      };

  /**
   * Multiple of value.
   */
  multipleOf?:
    | number
    | {
        value: number;
        message: string;
      };

  enum?:
    | number[]
    | {
        value: number[];
        message: string;
      };

  defaultValue?: number;
};

export type BooleanValidationSchema = {
  oneOf?:
    | boolean[]
    | {
        value: boolean[];
        message: string;
      };

  defaultValue?: boolean;
};

export type ObjectValidationSchema = {
  /**
   * Object properties.
   */
  properties?: {
    [key: string]: ValidationSchema<any>;
  };

  /**
   * Object additional properties.
   */
  additionalProperties?:
    | boolean
    | ValidationSchema<any>
    | {
        value: boolean | ValidationSchema<any>;
        message: string;
      };
  defaultValue?: object;
};

export type AnyValidationSchema = {
  defaultValue?: any;
};

export type OneOfValidationSchema = {
  /**
   * One of schemas.
   */
  schemas: ValidationSchema<SchemeType>[];

  defaultValue?: any;
};

export type ValidationSchema<T extends SchemeType> = BaseValidationSchema<T> &
  (T extends "string"
    ? StringValidationSchema
    : T extends "number"
    ? NumberValidationSchema
    : T extends "boolean"
    ? BooleanValidationSchema
    : T extends "object"
    ? ObjectValidationSchema
    : T extends "oneOf"
    ? OneOfValidationSchema
    : T extends "any"
    ? AnyValidationSchema
    : never);
