import { inspect } from "util";
const { custom } = inspect;
import StringValidator from "./string";
import NumberValidator from "./number";
import BooleanValidator from "./boolean";
import ObjectValidator from "./object";
import BaseValidator from "./base";

export type FCheckType = ReturnType<typeof FCheck>;

export default function FCheck(name: string) {
  return {
    string: (message?: string) => {
      return new StringValidator(name, message);
    },
    number: (message?: string) => {
      return new NumberValidator(name, message);
    },
    boolean: (message?: string) => {
      return new BooleanValidator(name, message);
    },
    object: (properties: Record<string, BaseValidator> = {}, message?: string) => {
      return new ObjectValidator(name, properties, message);
    },
    [custom]() {
      return {};
    },
  };
}
