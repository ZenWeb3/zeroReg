import { ZeroRegPattern, escapeRegex, raw } from "./pattern";
import type { Pattern } from "./types";

// CHARACTER CLASSES

/**
 * Match any digit (0-9)
 * @param count - Optional exact count of digits
 */
export function digit(count?: number): Pattern {
  if (count !== undefined) {
    return new ZeroRegPattern(`\\d{${count}}`);
  }
  return new ZeroRegPattern("\\d");
}

/**
 * Match any non-digit
 */
export function nonDigit(): Pattern {
  return new ZeroRegPattern("\\D");
}

/**
 * Match any word character (a-z, A-Z, 0-9, _)
 */
export function word(): Pattern {
  return new ZeroRegPattern("\\w");
}

/**
 * Match any non-word character
 */
export function nonWord(): Pattern {
  return new ZeroRegPattern("\\W");
}

/**
 * Match any whitespace character
 */
export function whitespace(): Pattern {
  return new ZeroRegPattern("\\s");
}

/**
 * Match any non-whitespace character
 */
export function nonWhitespace(): Pattern {
  return new ZeroRegPattern("\\S");
}

/**
 * Match any letter (a-z, A-Z)
 */
export function letter(): Pattern {
  return new ZeroRegPattern("[a-zA-Z]");
}

/**
 * Match lowercase letters only
 */
export function lowercase(): Pattern {
  return new ZeroRegPattern("[a-z]");
}

/**
 * Match uppercase letters only
 */
export function uppercase(): Pattern {
  return new ZeroRegPattern("[A-Z]");
}

/**
 * Match alphanumeric characters (a-z, A-Z, 0-9)
 */
export function alphanumeric(): Pattern {
  return new ZeroRegPattern("[a-zA-Z0-9]");
}

/**
 * Match any character (except newline by default)
 */
export function any(): Pattern {
  return new ZeroRegPattern(".");
}

/**
 * Match a specific character or string (escaped)
 */
export function literal(str: string): Pattern {
  return new ZeroRegPattern(escapeRegex(str));
}

/**
 * Match any character in the set
 */
export function charIn(chars: string): Pattern {
  // Escape special chars inside character class
  const escaped = chars.replace(/[\]\\^-]/g, "\\$&");
  return new ZeroRegPattern(`[${escaped}]`);
}

/**
 * Match any character NOT in the set
 */
export function charNotIn(chars: string): Pattern {
  const escaped = chars.replace(/[\]\\^-]/g, "\\$&");
  return new ZeroRegPattern(`[^${escaped}]`);
}

/**
 * Match a range of characters
 */
export function range(from: string, to: string): Pattern {
  return new ZeroRegPattern(`[${from}-${to}]`);
}
