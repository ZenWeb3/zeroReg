export { ZeroRegPattern, escapeRegex, raw } from "./pattern";
export type { Pattern, PatternOptions, MatchGroups } from "./types";

export {
  // Character classes
  digit,
  nonDigit,
  word,
  nonWord,
  whitespace,
  nonWhitespace,
  letter,
  lowercase,
  uppercase,
  alphanumeric,
  any,
  literal,
  charIn,
  charNotIn,
  range,
  // Quantifiers
  optional,
  oneOrMore,
  zeroOrMore,
  // Groups
  capture,
  group,
  oneOf,
  // Anchors
  startOfLine,
  endOfLine,
  wordBoundary,
  nonWordBoundary,
  // Lookahead/Lookbehind
  lookahead,
  negativeLookahead,
  lookbehind,
  negativeLookbehind,
  // Special
  newline,
  tab,
  carriageReturn,
} from "./builders";
