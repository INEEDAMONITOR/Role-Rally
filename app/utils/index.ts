export const isVoid = (value: unknown) =>
  value === "" || value === null || value === undefined ? true : false;
/**
 * Delete the property with null value in an object
 * @param object
 * @returns cleaned object
 */
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach(key => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
