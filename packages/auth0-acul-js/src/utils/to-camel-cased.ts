type GenericObject = Record<string, unknown>;

function isKeyedObject(value: unknown): value is GenericObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function toCamelCased(obj: GenericObject): GenericObject {
  const result: GenericObject = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
    result[newKey] = isKeyedObject(value) ? toCamelCased(value) : value;
  }
  return result;
}