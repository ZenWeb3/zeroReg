import type { Pattern } from "./types";

/**
 * Core Pattern class - the heart of zeroReg
 */
export class ZeroRegPattern implements Pattern {
  readonly source: string;

  constructor(source: string) {
    this.source = source;
  }

  /**
   * Chain another pattern or string
   */
  then(pattern: Pattern | string): Pattern {
    const next =
      typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
    return new ZeroRegPattern(this.source + next);
  }

  /**
   * Match one or more times (+)
   */
  oneOrMore(): Pattern {
    return new ZeroRegPattern(this.wrap() + "+");
  }

  /**
   * Match zero or more times (*)
   */
  zeroOrMore(): Pattern {
    return new ZeroRegPattern(this.wrap() + "*");
  }

  /**
   * Make pattern optional (?)
   */
  optional(): Pattern {
    return new ZeroRegPattern(this.wrap() + "?");
  }

  /**
   * Match exactly n times
   */
  times(n: number): Pattern {
    return new ZeroRegPattern(this.wrap() + `{${n}}`);
  }

  /**
   * Match between min and max times
   */
  between(min: number, max: number): Pattern {
    return new ZeroRegPattern(this.wrap() + `{${min},${max}}`);
  }

  /**
   * Match at least n times
   */
  atLeast(n: number): Pattern {
    return new ZeroRegPattern(this.wrap() + `{${n},}`);
  }

  /**
   * Match at most n times
   */
  atMost(n: number): Pattern {
    return new ZeroRegPattern(this.wrap() + `{0,${n}}`);
  }

  /**
   * Add OR logic with another pattern
   */
  or(pattern: Pattern | string): Pattern {
    const alt =
      typeof pattern === "string" ? escapeRegex(pattern) : pattern.source;
    return new ZeroRegPattern(`(?:${this.source}|${alt})`);
  }

  /**
   * Convert to native RegExp
   */
  toRegex(flags: string = ""): RegExp {
    return new RegExp(this.source, flags);
  }

  /**
   * Test a string against the pattern
   */
  test(input: string): boolean {
    return this.toRegex().test(input);
  }

  /**
   * Match a string and return results
   */
  match(input: string): RegExpMatchArray | null {
    return input.match(this.toRegex());
  }

  /**
   * Match all occurrences
   */
  matchAll(input: string): RegExpMatchArray[] {
    return [...input.matchAll(this.toRegex("g"))];
  }

  /**
   * Replace matches in a string
   */
  replace(input: string, replacement: string): string {
    return input.replace(this.toRegex("g"), replacement);
  }

  /**
   * Get pattern as string
   */
  toString(): string {
    return this.source;
  }

  /**
   * Wrap pattern in non-capturing group if needed
   */
  private wrap(): string {
    // Simple patterns don't need wrapping
    if (this.source.length === 1 || this.isWrapped()) {
      return this.source;
    }
    return `(?:${this.source})`;
  }

  /**
   * Check if pattern is already wrapped or is a character class
   */
  private isWrapped(): boolean {
    return (
      (this.source.startsWith("(?:") && this.source.endsWith(")")) ||
      (this.source.startsWith("(") && this.source.endsWith(")")) ||
      (this.source.startsWith("[") && this.source.endsWith("]")) ||
      this.source.startsWith("\\")
    );
  }
}

/**
 * Escape special regex characters in a string
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Create a pattern from a raw regex string (no escaping)
 */
export function raw(source: string): Pattern {
  return new ZeroRegPattern(source);
}
