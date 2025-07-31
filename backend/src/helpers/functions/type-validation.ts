/**
 * Checks if a value is a number.
 * @param value - The value to check.
 * @returns True if value is a number.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

/**
 * Checks if a value is a string.
 * @param value - The value to check.
 * @returns True if value is a string.
 */
export const isString = (value: unknown): value is string =>
  typeof value === "string";

/**
 * Checks if a value is a boolean.
 * @param value - The value to check.
 * @returns True if value is a boolean.
 */
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

/**
 * Checks if a value is an array.
 * @param value - The value to check.
 * @returns True if value is an array.
 */
export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

/**
 * Checks if a value is a function.
 * @param value - The value to check.
 * @returns True if value is a function.
 */
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

/**
 * Checks if a value is an object (but not null or array).
 * @param value - The value to check.
 * @returns True if value is a plain object.
 */
export const isObject = (value: unknown): value is object =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Checks if a value is null.
 * @param value - The value to check.
 * @returns True if value is exactly null.
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Checks if a value is undefined.
 * @param value - The value to check.
 * @returns True if value is exactly undefined.
 */
export const isUndefined = (value: unknown): value is undefined =>
  typeof value === "undefined";

/**
 * Checks if a value is either null or undefined.
 * @param value - The value to check.
 * @returns True if value is null or undefined.
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  isNull(value) || isUndefined(value);

/**
 * Checks if a value is a valid Date or a valid date string parsable to Date.
 *
 * @param value - The value to check.
 * @returns True if the value is a valid Date object or a string representing a valid date.
 *
 * @example
 * isValidDate(new Date()); // true
 * isValidDate("2024-07-18"); // true
 * isValidDate("invalid-date"); // false
 * isValidDate(123); // false
 */
export const isValidDate = (value: unknown): boolean => {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === "string") {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  return false;
};
