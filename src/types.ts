export interface Pattern {
  /** The raw regex pattern string */
  readonly source: string;

  /** Chain another pattern or string */
  then(pattern: Pattern | string): Pattern;

  /** Match one or more times */
  oneOrMore(): Pattern;

  /** Match zero or more times */
  zeroOrMore(): Pattern;

  /** Make pattern optional (0 or 1) */
  optional(): Pattern;

  /** Match exactly n times */
  times(n: number): Pattern;

  /** Match between min and max times */
  between(min: number, max: number): Pattern;

  /** Match at least n times */
  atLeast(n: number): Pattern;

  /** Match at most n times */
  atMost(n: number): Pattern;

  /** Add OR logic with another pattern */
  or(pattern: Pattern | string): Pattern;

  /** Convert to native RegExp */
  toRegex(flags?: string): RegExp;

  /** Test a string against the pattern */
  test(input: string): boolean;

  /** Match a string and return results */
  match(input: string): RegExpMatchArray | null;

  /** Match all occurrences */
  matchAll(input: string): RegExpMatchArray[];

  /** Replace matches in a string */
  replace(input: string, replacement: string): string;

  /** Get pattern as string */
  toString(): string;
}

export interface PatternOptions {
  /** Wrap in non-capturing group */
  grouped?: boolean;
}

/**
 * Named capture group result
 */
export type MatchGroups<T extends string> = {
  [K in T]: string;
};
