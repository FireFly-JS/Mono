export const validateType = (
  value: any,
  type: "string" | "number" | "boolean" | "object" | "array"
) => {
  if (type === "string") return typeof value === "string";
  if (type === "number") return typeof value === "number";
  if (type === "boolean") return typeof value === "boolean";
  if (type === "array") return Array.isArray(value);
  if (type === "object") return typeof value === "object" && Array.isArray(value) === false;
};

export const assertType = (
  value: any,
  type: "string" | "number" | "boolean" | "object" | "array"
) => {
  if (!validateType(value, type)) {
    throw new Error(`Expected ${type} but got ${typeof value}`);
  }
};

export const validateCompoundType = (
  value: any,
  types: ("string" | "number" | "boolean" | "object" | "array")[]
) => {
  return types.some((t) => validateType(value, t));
};

export const assertCompoundType = (
  value: any,
  types: ("string" | "number" | "boolean" | "object" | "array")[]
) => {
  if (!validateCompoundType(value, types)) {
    throw new Error(
      `Expected one of ${types.join(", ")} but got ${typeof value}`
    );
  }
};
