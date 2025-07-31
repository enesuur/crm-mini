/**
 * Checks if the trimmed length of a string is within optional minimum and maximum limits.
 *
 * @param {string} value - The string to check.
 * @param {number} [minLength] - Optional minimum length (inclusive).
 * @param {number} [maxLength] - Optional maximum length (inclusive).
 * @returns {boolean} Returns `true` if the trimmed string length is within the range; otherwise, `false`.
 *
 * @example
 * isValidLength("hello", 3, 10); // true
 * isValidLength("hi", 3, 10); // false
 * isValidLength("  spaced  ", 3, 8); // true
 * isValidLength("  ", 1); // false
 * isValidLength("example", undefined, 5); // false
 */
export const isValidLength = (
  value: string,
  minLength?: number,
  maxLength?: number
): boolean => {
  const length = value.length;
  if (minLength !== undefined && length < minLength) return false;
  if (maxLength !== undefined && length > maxLength) return false;
  return true;
};
