import { SchemeType, ValidationSchema } from "./type";

export class Schema<T extends SchemeType> {
  #schema: ValidationSchema<T>
  constructor(schema: ValidationSchema<T>) {
    this.#schema = schema;
  }

  getSchema() {
    return this.#schema;
  }
}

export class StringSchema extends Schema<"string"> {
  constructor(schema: ValidationSchema<"string">) {
    super(schema)
  }

  public minLength(minLength: number) {
    return this;
  }
}

const ValidatorSchema = {
  string: (
    schema: Omit<ValidationSchema<"string">, "type">,
    message?: string
  ) => {
    return new StringSchema({
      ...schema,
      type: message
        ? {
            message,
            value: "string",
          }
        : "string",
    });
  },
  number: (
    schema: Omit<ValidationSchema<"number">, "type">,
    message?: string
  ) => {
    return new Schema({
      ...schema,
      type: message
        ? {
            message,
            value: "number",
          }
        : "number",
    });
  },
  boolean: (
    schema: Omit<ValidationSchema<"boolean">, "type">,
    message?: string
  ) => {
    return new Schema({
      ...schema,
      type: message
        ? {
            message,
            value: "boolean",
          }
        : "boolean",
    });
  },
  object: (
    schema: Omit<ValidationSchema<"object">, "type">,
    message?: string
  ) => {
    return new Schema({
      ...schema,
      type: message
        ? {
            message,
            value: "object",
          }
        : "object",
    });
  },
  oneOf: (
    schema: Omit<ValidationSchema<"oneOf">, "type">,
    message?: string
  ) => {
    return new Schema({
      ...schema,
      type: message
        ? {
            message,
            value: "oneOf",
          }
        : "oneOf",
    });
  },
  any: (schema: Omit<ValidationSchema<"any">, "type">, message?: string) => {
    return new Schema({
      ...schema,
      type: message
        ? {
            message,
            value: "any",
          }
        : "any",
    });
  },
};

ValidatorSchema.string({
  name: "123",
  nullable: true,
});

// function createSchema<T extends SchemeType>(
//   schema: ValidationSchema<T>
// ): ValidationSchema<T> {
//   return schema;
// }

// console.log(
//   createSchema({
//     name: "test",
//     type: "any",
//   })
// );
