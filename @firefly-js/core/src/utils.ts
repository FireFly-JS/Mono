export function getValue<T = any>(value?: T, newValue?: T): T {
  if (Array.isArray(newValue)) {
    return newValue.filter(i => i).length > 0 ? newValue : value as T;
  }
  return newValue || (value as T);
}
