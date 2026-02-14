import { ZeroRegPattern } from "../pattern";
import type { Pattern } from "../types";

/**
 * Email address pattern
 * Matches: user@domain.com, user.name+tag@domain.co.uk
 */
export const email: Pattern = new ZeroRegPattern(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
);

/**
 * URL pattern (http/https)
 * Matches: https://example.com, http://sub.domain.com/path?query=1
 */
export const url: Pattern = new ZeroRegPattern(
  "^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$"
);

/**
 * Phone number pattern (international)
 * Matches: +1-234-567-8900, 234-567-8900, (234) 567-8900
 */
export const phone: Pattern = new ZeroRegPattern(
  "^\\+?[1-9]?[0-9]{0,3}?[-. (]?[0-9]{1,4}[-. )]?[0-9]{1,4}[-. ]?[0-9]{1,9}$"
);

/**
 * ISO date pattern (YYYY-MM-DD)
 * Matches: 2024-03-15, 2024-12-01
 */
export const date: Pattern = new ZeroRegPattern(
  "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$"
);

/**
 * Time pattern (HH:MM or HH:MM:SS)
 * Matches: 14:30, 23:59:59, 00:00
 */
export const time: Pattern = new ZeroRegPattern(
  "^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$"
);

/**
 * IPv4 address pattern
 * Matches: 192.168.1.1, 10.0.0.255
 */
export const ipv4: Pattern = new ZeroRegPattern(
  "^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$"
);

/**
 * IPv6 address pattern
 * Matches: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
 */
export const ipv6: Pattern = new ZeroRegPattern(
  "^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$"
);

/**
 * Hexadecimal color pattern
 * Matches: #fff, #ffffff, #ABCDEF
 */
export const hexColor: Pattern = new ZeroRegPattern(
  "^#(?:[0-9a-fA-F]{3}){1,2}$"
);

/**
 * Hexadecimal string pattern
 * Matches: a1b2c3, DEADBEEF
 */
export const hex: Pattern = new ZeroRegPattern(
  "^[0-9a-fA-F]+$"
);

/**
 * UUID pattern (v1-v5)
 * Matches: 550e8400-e29b-41d4-a716-446655440000
 */
export const uuid: Pattern = new ZeroRegPattern(
  "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
);

/**
 * URL slug pattern
 * Matches: my-awesome-post, hello-world-123
 */
export const slug: Pattern = new ZeroRegPattern(
  "^[a-z0-9]+(?:-[a-z0-9]+)*$"
);

/**
 * Hashtag pattern
 * Matches: #hello, #hello_world, #123abc
 */
export const hashtag: Pattern = new ZeroRegPattern(
  "#[a-zA-Z0-9_]+"
);

/**
 * @mention pattern
 * Matches: @username, @user_name, @user123
 */
export const mention: Pattern = new ZeroRegPattern(
  "@[a-zA-Z0-9_]+"
);

/**
 * Credit card number pattern (basic)
 * Matches: 4111111111111111, 4111-1111-1111-1111
 */
export const creditCard: Pattern = new ZeroRegPattern(
  "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$"
);

/**
 * US Social Security Number pattern
 * Matches: 123-45-6789
 */
export const ssn: Pattern = new ZeroRegPattern(
  "^\\d{3}-\\d{2}-\\d{4}$"
);

/**
 * US ZIP code pattern
 * Matches: 12345, 12345-6789
 */
export const zipCode: Pattern = new ZeroRegPattern(
  "^\\d{5}(?:-\\d{4})?$"
);

/**
 * Username pattern (alphanumeric + underscore, 3-16 chars)
 * Matches: user_name, User123
 */
export const username: Pattern = new ZeroRegPattern(
  "^[a-zA-Z0-9_]{3,16}$"
);

/**
 * Strong password pattern
 * Requires: 8+ chars, uppercase, lowercase, digit, special char
 */
export const strongPassword: Pattern = new ZeroRegPattern(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
);

/**
 * Semantic version pattern
 * Matches: 1.0.0, 2.1.3, 0.0.1-alpha
 */
export const semver: Pattern = new ZeroRegPattern(
  "^(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[a-zA-Z0-9]+)?$"
);

/**
 * MAC address pattern
 * Matches: 00:1A:2B:3C:4D:5E, 00-1A-2B-3C-4D-5E
 */
export const macAddress: Pattern = new ZeroRegPattern(
  "^(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$"
);