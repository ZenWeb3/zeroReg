import { ZeroRegPattern, escapeRegex, raw } from "../pattern";
import type { Pattern } from "../types";

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

// QUANTIFIERS (standalone)

/**
 * Make a pattern optional
 */
export function optional(pattern: Pattern | string): Pattern {
  if (typeof pattern === "string") {
    return new ZeroRegPattern(`(?:${escapeRegex(pattern)})?`);
  }
  return pattern.optional();
}

/**
 * Match one or more of a pattern
 */
export function oneOrMore(pattern: Pattern | string): Pattern {
  if (typeof pattern === "string") {
    return new ZeroRegPattern(`(?:${escapeRegex(pattern)})+`);
  }
  return pattern.oneOrMore();
}

/**
 * Match zero or more of a pattern
 */
export function zeroOrMore(pattern: Pattern | string): Pattern {
  if (typeof pattern === "string") {
    return new ZeroRegPattern(`(?:${escapeRegex(pattern)})*`);
  }
  return pattern.zeroOrMore();
}

// GROUPS

/**
 * Create a capturing group
 */
export function capture(pattern: Pattern | string, name?: string): Pattern {
  const src =
    typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
  if (name) {
    return new ZeroRegPattern(`(?<${name}>${src})`);
  }
  return new ZeroRegPattern(`(${src})`);
}

/**
 * Create a non-capturing group
 */
export function group(pattern: Pattern | string): Pattern {
  const src =
    typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
  return new ZeroRegPattern(`(?:${src})`);
}

/**
 * Match any of the provided patterns
 */
export function oneOf(...patterns: (Pattern | string)[]): Pattern {
  const sources = patterns.map((p) =>
    typeof p === "string" ? escapeRegex(p) : p.source,
  );
  return new ZeroRegPattern(`(?:${sources.join("|")})`);
}

// ANCHORS

/**
 * Match start of string/line
 */
export function startOfLine(): Pattern {
  return new ZeroRegPattern("^");
}

/**
 * Match end of string/line
 */
export function endOfLine(): Pattern {
  return new ZeroRegPattern("$");
}

/**
 * Match word boundary
 */
export function wordBoundary(): Pattern {
  return new ZeroRegPattern("\\b");
}

/**
 * Match non-word boundary
 */
export function nonWordBoundary(): Pattern {
  return new ZeroRegPattern("\\B");
}

// LOOKAHEAD / LOOKBEHIND

/**
 * Positive lookahead - match if followed by pattern
 */
export function lookahead(pattern: Pattern | string): Pattern {
  const src =
    typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
  return new ZeroRegPattern(`(?=${src})`);
}

/**
 * Negative lookahead - match if NOT followed by pattern
 */
export function negativeLookahead(pattern: Pattern | string): Pattern {
  const src =
    typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
  return new ZeroRegPattern(`(?!${src})`);
}

/**
 * Positive lookbehind - match if preceded by pattern
 */
export function lookbehind(pattern: Pattern | string): Pattern {
  const src =
    typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
  return new ZeroRegPattern(`(?<=${src})`);
}

/**
 * Negative lookbehind - match if NOT preceded by pattern
 */
export function negativeLookbehind(pattern: Pattern | string): Pattern {
  const src =
    typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
  return new ZeroRegPattern(`(?<!${src})`);
}

// SPECIAL

/**
 * Match a newline
 */
export function newline(): Pattern {
  return new ZeroRegPattern("\\n");
}

/**
 * Match a tab
 */
export function tab(): Pattern {
  return new ZeroRegPattern("\\t");
}

/**
 * Match a carriage return
 */
export function carriageReturn(): Pattern {
  return new ZeroRegPattern("\\r");
}

export { raw };
