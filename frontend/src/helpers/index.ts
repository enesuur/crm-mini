/**
 * Default styles for icons, including width, height, opacity, and color.
 *
 * @type {IconStyles}
 */
const ICON_STYLES = {
  width: 20,
  height: 20,
  opacity: 0.8,
  color: "var(--primary-color)",
};

/**
 * Truncate a string to a specified maximum length and append a trailing character if it exceeds the limit.
 *
 * @param {string} text - The string to be truncated.
 * @param {number} [maxLength=25] - The maximum length before truncating the string.
 * @param {string} [trailChar='...'] - The character(s) to append if the string is truncated.
 * @returns {string} The truncated string with the trailing character if necessary.
 */
const truncateWithTrail = (
  text: string | null | undefined,
  maxLength: number = 25,
  trailChar = "..."
): string => {
  if (!text) return "Girdi yok";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + trailChar;
};

Object.freeze([ICON_STYLES, truncateWithTrail]);

export { ICON_STYLES, truncateWithTrail };
