import { describe, it, expect } from "vitest";
import {
  digit,
  nonDigit,
  word,
  nonWord,
  letter,
  lowercase,
  uppercase,
  alphanumeric,
  literal,
  optional,
  oneOrMore,
  zeroOrMore,
  capture,
  group,
  oneOf,
  startOfLine,
  endOfLine,
  wordBoundary,
  charIn,
  charNotIn,
  range,
  whitespace,
  nonWhitespace,
  any,
  lookahead,
  negativeLookahead,
  lookbehind,
  negativeLookbehind,
  newline,
  tab,
  raw,
} from "../src";
import {
  email,
  url,
  phone,
  date,
  time,
  ipv4,
  ipv6,
  uuid,
  hexColor,
  hex,
  slug,
  hashtag,
  mention,
  creditCard,
  ssn,
  zipCode,
  username,
  strongPassword,
  semver,
  macAddress,
} from "../src/patterns";

// =============================================================================
// CHARACTER CLASSES
// =============================================================================

describe("digit", () => {
  it("matches single digit", () => {
    expect(digit().test("5")).toBe(true);
    expect(digit().test("a")).toBe(false);
  });

  it("matches exact count of digits", () => {
    const pattern = startOfLine().then(digit(3)).then(endOfLine());
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("12")).toBe(false);
    expect(pattern.test("1234")).toBe(false);
  });

  it("chains with oneOrMore", () => {
    expect(digit().oneOrMore().test("123")).toBe(true);
    expect(digit().oneOrMore().test("")).toBe(false);
  });
});

describe("nonDigit", () => {
  it("matches non-digit characters", () => {
    expect(nonDigit().test("a")).toBe(true);
    expect(nonDigit().test("5")).toBe(false);
  });
});

describe("word", () => {
  it("matches word characters", () => {
    expect(word().test("a")).toBe(true);
    expect(word().test("Z")).toBe(true);
    expect(word().test("5")).toBe(true);
    expect(word().test("_")).toBe(true);
    expect(word().test("@")).toBe(false);
  });
});

describe("nonWord", () => {
  it("matches non-word characters", () => {
    expect(nonWord().test("@")).toBe(true);
    expect(nonWord().test("a")).toBe(false);
  });
});

describe("letter", () => {
  it("matches letters only", () => {
    expect(letter().test("a")).toBe(true);
    expect(letter().test("Z")).toBe(true);
    expect(letter().test("5")).toBe(false);
  });
});

describe("lowercase", () => {
  it("matches lowercase letters only", () => {
    expect(lowercase().test("a")).toBe(true);
    expect(lowercase().test("A")).toBe(false);
  });
});

describe("uppercase", () => {
  it("matches uppercase letters only", () => {
    expect(uppercase().test("A")).toBe(true);
    expect(uppercase().test("a")).toBe(false);
  });
});

describe("alphanumeric", () => {
  it("matches letters and numbers", () => {
    expect(alphanumeric().test("a")).toBe(true);
    expect(alphanumeric().test("5")).toBe(true);
    expect(alphanumeric().test("_")).toBe(false);
  });
});

describe("whitespace", () => {
  it("matches whitespace", () => {
    expect(whitespace().test(" ")).toBe(true);
    expect(whitespace().test("\t")).toBe(true);
    expect(whitespace().test("a")).toBe(false);
  });
});

describe("nonWhitespace", () => {
  it("matches non-whitespace", () => {
    expect(nonWhitespace().test("a")).toBe(true);
    expect(nonWhitespace().test(" ")).toBe(false);
  });
});

describe("any", () => {
  it("matches any character", () => {
    expect(any().test("a")).toBe(true);
    expect(any().test("5")).toBe(true);
    expect(any().test("@")).toBe(true);
  });
});

describe("literal", () => {
  it("matches exact string", () => {
    expect(literal("hello").test("hello")).toBe(true);
    expect(literal("hello").test("world")).toBe(false);
  });

  it("escapes special characters", () => {
    expect(literal(".").test(".")).toBe(true);
    expect(literal(".").test("a")).toBe(false);
    expect(literal("$100").test("$100")).toBe(true);
    expect(literal("[test]").test("[test]")).toBe(true);
    expect(literal("a+b").test("a+b")).toBe(true);
  });
});

describe("charIn", () => {
  it("matches characters in set", () => {
    const vowels = charIn("aeiou");
    expect(vowels.test("a")).toBe(true);
    expect(vowels.test("e")).toBe(true);
    expect(vowels.test("b")).toBe(false);
  });

  it("escapes special characters", () => {
    const special = charIn("[]^-");
    expect(special.test("[")).toBe(true);
    expect(special.test("-")).toBe(true);
  });
});

describe("charNotIn", () => {
  it("matches characters not in set", () => {
    const notVowels = charNotIn("aeiou");
    expect(notVowels.test("b")).toBe(true);
    expect(notVowels.test("a")).toBe(false);
  });
});

describe("range", () => {
  it("matches character ranges", () => {
    const digitRange = range("0", "9");
    expect(digitRange.test("5")).toBe(true);
    expect(digitRange.test("a")).toBe(false);
  });
});

// =============================================================================
// CHAINING
// =============================================================================

describe("chaining", () => {
  it("chains patterns with then()", () => {
    const pattern = digit(3).then("-").then(digit(4));
    expect(pattern.test("123-4567")).toBe(true);
    expect(pattern.test("12-4567")).toBe(false);
  });

  it("supports oneOrMore()", () => {
    const pattern = digit().oneOrMore();
    expect(pattern.test("1")).toBe(true);
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("")).toBe(false);
  });

  it("supports zeroOrMore()", () => {
    const pattern = digit().zeroOrMore();
    expect(pattern.test("")).toBe(true);
    expect(pattern.test("123")).toBe(true);
  });

  it("supports optional()", () => {
    const pattern = literal("+").optional().then(digit(3));
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("+123")).toBe(true);
  });

  it("supports times()", () => {
    const pattern = letter().times(3);
    expect(pattern.test("abc")).toBe(true);
    expect(pattern.test("ab")).toBe(false);
  });

  it("supports between()", () => {
    const pattern = startOfLine().then(digit().between(2, 4)).then(endOfLine());
    expect(pattern.test("12")).toBe(true);
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("1234")).toBe(true);
    expect(pattern.test("1")).toBe(false);
    expect(pattern.test("12345")).toBe(false);
  });

  it("supports atLeast()", () => {
    const pattern = digit().atLeast(3);
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("12345")).toBe(true);
    expect(pattern.test("12")).toBe(false);
  });

  it("supports atMost()", () => {
    const pattern = startOfLine().then(digit().atMost(3)).then(endOfLine());
    expect(pattern.test("")).toBe(true);
    expect(pattern.test("12")).toBe(true);
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("1234")).toBe(false);
  });

  it("supports or()", () => {
    const pattern = literal("cat").or("dog");
    expect(pattern.test("cat")).toBe(true);
    expect(pattern.test("dog")).toBe(true);
    expect(pattern.test("bird")).toBe(false);
  });
});

// =============================================================================
// QUANTIFIERS (STANDALONE)
// =============================================================================

describe("standalone quantifiers", () => {
  it("optional() works with patterns", () => {
    const pattern = optional(digit()).then(letter());
    expect(pattern.test("a")).toBe(true);
    expect(pattern.test("5a")).toBe(true);
  });

  it("optional() works with strings", () => {
    const pattern = optional("+").then(digit(3));
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("+123")).toBe(true);
  });

  it("oneOrMore() works with patterns", () => {
    const pattern = oneOrMore(digit());
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("")).toBe(false);
  });

  it("zeroOrMore() works with patterns", () => {
    const pattern = zeroOrMore(digit());
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("")).toBe(true);
  });
});

// =============================================================================
// GROUPS
// =============================================================================

describe("capture", () => {
  it("creates capturing groups", () => {
    const pattern = capture(digit(3)).then("-").then(capture(digit(4)));
    const match = pattern.match("123-4567");
    expect(match?.[1]).toBe("123");
    expect(match?.[2]).toBe("4567");
  });

  it("creates named capturing groups", () => {
    const pattern = capture(digit(4), "year")
      .then("-")
      .then(capture(digit(2), "month"));
    const match = "2024-03".match(pattern.toRegex());
    expect(match?.groups?.year).toBe("2024");
    expect(match?.groups?.month).toBe("03");
  });
});

describe("group", () => {
  it("creates non-capturing groups", () => {
    const pattern = group(literal("ab").or("cd")).oneOrMore();
    expect(pattern.test("ab")).toBe(true);
    expect(pattern.test("abcd")).toBe(true);
    expect(pattern.test("abcdab")).toBe(true);
  });
});

describe("oneOf", () => {
  it("matches any of the patterns", () => {
    const pattern = oneOf("cat", "dog", "bird");
    expect(pattern.test("cat")).toBe(true);
    expect(pattern.test("dog")).toBe(true);
    expect(pattern.test("bird")).toBe(true);
    expect(pattern.test("fish")).toBe(false);
  });

  it("works with Pattern objects", () => {
    const pattern = oneOf(digit(3), letter().times(3));
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("abc")).toBe(true);
    expect(pattern.test("12")).toBe(false);
  });
});

// =============================================================================
// ANCHORS
// =============================================================================

describe("anchors", () => {
  it("startOfLine matches beginning", () => {
    const pattern = startOfLine().then(literal("hello"));
    expect(pattern.test("hello world")).toBe(true);
    expect(pattern.test("say hello")).toBe(false);
  });

  it("endOfLine matches end", () => {
    const pattern = literal("world").then(endOfLine());
    expect(pattern.test("hello world")).toBe(true);
    expect(pattern.test("world hello")).toBe(false);
  });

  it("wordBoundary matches word boundaries", () => {
    const pattern = wordBoundary().then(literal("cat")).then(wordBoundary());
    const regex = pattern.toRegex();
    expect(regex.test("the cat sat")).toBe(true);
    expect(regex.test("category")).toBe(false);
  });
});

// =============================================================================
// LOOKAHEAD / LOOKBEHIND
// =============================================================================

describe("lookahead", () => {
  it("positive lookahead", () => {
    const pattern = digit().oneOrMore().then(lookahead(literal("px")));
    expect(pattern.test("100px")).toBe(true);
    expect(pattern.test("100em")).toBe(false);
  });

  it("negative lookahead", () => {
    const pattern = digit().oneOrMore().then(negativeLookahead(literal("px")));
    // "100em" - digits not followed by "px" ✓
    expect(pattern.test("100em")).toBe(true);
    // "100" - digits not followed by "px" ✓
    expect(pattern.test("100")).toBe(true);
    // "100px" - still matches "10" (not followed by px), so we need anchors for exact
    // This is correct regex behavior - it finds "10" which isn't followed by "px"
  });
});

describe("lookbehind", () => {
  it("positive lookbehind", () => {
    const pattern = lookbehind(literal("$")).then(digit().oneOrMore());
    const match = "$100".match(pattern.toRegex());
    expect(match?.[0]).toBe("100");
  });

  it("negative lookbehind", () => {
    const pattern = negativeLookbehind(literal("$")).then(digit().oneOrMore());
    const regex = pattern.toRegex();
    expect(regex.test("€100")).toBe(true);
  });
});

// =============================================================================
// SPECIAL CHARACTERS
// =============================================================================

describe("special characters", () => {
  it("newline matches \\n", () => {
    expect(newline().test("\n")).toBe(true);
    expect(newline().test("n")).toBe(false);
  });

  it("tab matches \\t", () => {
    expect(tab().test("\t")).toBe(true);
    expect(tab().test("t")).toBe(false);
  });
});

// =============================================================================
// RAW
// =============================================================================

describe("raw", () => {
  it("creates pattern from raw regex string", () => {
    const pattern = raw("[A-Z]{2,3}");
    expect(pattern.test("AB")).toBe(true);
    expect(pattern.test("ABC")).toBe(true);
    expect(pattern.test("ab")).toBe(false);
  });
});

// =============================================================================
// OUTPUT METHODS
// =============================================================================

describe("toRegex", () => {
  it("returns native RegExp", () => {
    const pattern = digit(3);
    const regex = pattern.toRegex();
    expect(regex).toBeInstanceOf(RegExp);
    expect(regex.source).toBe("\\d{3}");
  });

  it("supports flags", () => {
    const pattern = letter().oneOrMore();
    const regex = pattern.toRegex("gi");
    expect(regex.flags).toBe("gi");
  });
});

describe("test", () => {
  it("returns boolean", () => {
    const pattern = digit(3);
    expect(pattern.test("123")).toBe(true);
    expect(pattern.test("abc")).toBe(false);
  });
});

describe("match", () => {
  it("returns match array", () => {
    const pattern = digit().oneOrMore();
    const match = pattern.match("abc123def");
    expect(match?.[0]).toBe("123");
  });

  it("returns null for no match", () => {
    const pattern = digit().oneOrMore();
    expect(pattern.match("abc")).toBe(null);
  });
});

describe("matchAll", () => {
  it("returns all matches", () => {
    const pattern = digit().oneOrMore();
    const matches = pattern.matchAll("abc 123 def 456");
    expect(matches.length).toBe(2);
    expect(matches[0][0]).toBe("123");
    expect(matches[1][0]).toBe("456");
  });
});

describe("replace", () => {
  it("replaces matches", () => {
    const pattern = digit().oneOrMore();
    const result = pattern.replace("abc 123 def 456", "X");
    expect(result).toBe("abc X def X");
  });
});

describe("toString", () => {
  it("returns pattern string", () => {
    const pattern = digit(3).then("-").then(digit(4));
    expect(pattern.toString()).toBe("\\d{3}-\\d{4}");
  });
});

// =============================================================================
// PRE-BUILT PATTERNS
// =============================================================================

describe("patterns/email", () => {
  it("matches valid emails", () => {
    expect(email.test("test@example.com")).toBe(true);
    expect(email.test("user.name+tag@domain.co.uk")).toBe(true);
    expect(email.test("user@sub.domain.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(email.test("invalid")).toBe(false);
    expect(email.test("@domain.com")).toBe(false);
    expect(email.test("user@")).toBe(false);
  });
});

describe("patterns/url", () => {
  it("matches valid URLs", () => {
    expect(url.test("https://example.com")).toBe(true);
    expect(url.test("http://sub.domain.com/path?query=1")).toBe(true);
    expect(url.test("https://example.com/path/to/page")).toBe(true);
  });

  it("rejects invalid URLs", () => {
    expect(url.test("not a url")).toBe(false);
    expect(url.test("ftp://example.com")).toBe(false);
  });
});

describe("patterns/phone", () => {
  it("matches phone numbers", () => {
    expect(phone.test("123-456-7890")).toBe(true);
    expect(phone.test("+1-234-567-8900")).toBe(true);
    // Note: parentheses format requires different pattern
    expect(phone.test("234-567-8900")).toBe(true);
  });
});

describe("patterns/date", () => {
  it("matches ISO dates", () => {
    expect(date.test("2024-03-15")).toBe(true);
    expect(date.test("2024-12-01")).toBe(true);
  });

  it("rejects invalid dates", () => {
    expect(date.test("2024-13-01")).toBe(false);
    expect(date.test("2024/03/15")).toBe(false);
  });
});

describe("patterns/time", () => {
  it("matches valid times", () => {
    expect(time.test("14:30")).toBe(true);
    expect(time.test("23:59:59")).toBe(true);
    expect(time.test("00:00")).toBe(true);
  });

  it("rejects invalid times", () => {
    expect(time.test("25:00")).toBe(false);
    expect(time.test("14:60")).toBe(false);
  });
});

describe("patterns/ipv4", () => {
  it("matches valid IPv4", () => {
    expect(ipv4.test("192.168.1.1")).toBe(true);
    expect(ipv4.test("10.0.0.255")).toBe(true);
    expect(ipv4.test("0.0.0.0")).toBe(true);
  });

  it("rejects invalid IPv4", () => {
    expect(ipv4.test("256.168.1.1")).toBe(false);
    expect(ipv4.test("192.168.1")).toBe(false);
  });
});

describe("patterns/ipv6", () => {
  it("matches valid IPv6", () => {
    expect(ipv6.test("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
  });
});

describe("patterns/uuid", () => {
  it("matches valid UUIDs", () => {
    expect(uuid.test("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(uuid.test("550E8400-E29B-41D4-A716-446655440000")).toBe(true);
  });

  it("rejects invalid UUIDs", () => {
    expect(uuid.test("not-a-uuid")).toBe(false);
    expect(uuid.test("550e8400-e29b-61d4-a716-446655440000")).toBe(false);
  });
});

describe("patterns/hexColor", () => {
  it("matches hex colors", () => {
    expect(hexColor.test("#fff")).toBe(true);
    expect(hexColor.test("#ffffff")).toBe(true);
    expect(hexColor.test("#ABCDEF")).toBe(true);
  });

  it("rejects invalid hex colors", () => {
    expect(hexColor.test("fff")).toBe(false);
    expect(hexColor.test("#gggggg")).toBe(false);
    expect(hexColor.test("#ffff")).toBe(false);
  });
});

describe("patterns/hex", () => {
  it("matches hex strings", () => {
    expect(hex.test("a1b2c3")).toBe(true);
    expect(hex.test("DEADBEEF")).toBe(true);
  });

  it("rejects non-hex", () => {
    expect(hex.test("xyz")).toBe(false);
  });
});

describe("patterns/slug", () => {
  it("matches valid slugs", () => {
    expect(slug.test("my-awesome-post")).toBe(true);
    expect(slug.test("hello-world-123")).toBe(true);
    expect(slug.test("simple")).toBe(true);
  });

  it("rejects invalid slugs", () => {
    expect(slug.test("Has Spaces")).toBe(false);
    expect(slug.test("-starts-with-dash")).toBe(false);
    expect(slug.test("ends-with-dash-")).toBe(false);
    expect(slug.test("UPPERCASE")).toBe(false);
  });
});

describe("patterns/hashtag", () => {
  it("matches hashtags", () => {
    expect(hashtag.test("#hello")).toBe(true);
    expect(hashtag.test("#hello_world")).toBe(true);
  });

  it("finds multiple hashtags", () => {
    const matches = "#hello #world".match(hashtag.toRegex("g"));
    expect(matches).toEqual(["#hello", "#world"]);
  });
});

describe("patterns/mention", () => {
  it("matches mentions", () => {
    expect(mention.test("@username")).toBe(true);
    expect(mention.test("@user_123")).toBe(true);
  });

  it("finds multiple mentions", () => {
    const matches = "@user1 @user2".match(mention.toRegex("g"));
    expect(matches).toEqual(["@user1", "@user2"]);
  });
});

describe("patterns/creditCard", () => {
  it("matches credit card numbers", () => {
    expect(creditCard.test("4111111111111111")).toBe(true);
    expect(creditCard.test("5500000000000004")).toBe(true);
  });
});

describe("patterns/ssn", () => {
  it("matches SSN format", () => {
    expect(ssn.test("123-45-6789")).toBe(true);
  });

  it("rejects invalid SSN", () => {
    expect(ssn.test("123456789")).toBe(false);
    expect(ssn.test("123-456-789")).toBe(false);
  });
});

describe("patterns/zipCode", () => {
  it("matches US zip codes", () => {
    expect(zipCode.test("12345")).toBe(true);
    expect(zipCode.test("12345-6789")).toBe(true);
  });

  it("rejects invalid zip codes", () => {
    expect(zipCode.test("1234")).toBe(false);
    expect(zipCode.test("123456")).toBe(false);
  });
});

describe("patterns/username", () => {
  it("matches valid usernames", () => {
    expect(username.test("user_name")).toBe(true);
    expect(username.test("User123")).toBe(true);
    expect(username.test("abc")).toBe(true);
  });

  it("rejects invalid usernames", () => {
    expect(username.test("ab")).toBe(false);
    expect(username.test("this_username_is_way_too_long")).toBe(false);
    expect(username.test("user@name")).toBe(false);
  });
});

describe("patterns/strongPassword", () => {
  it("matches strong passwords", () => {
    expect(strongPassword.test("MyP@ssw0rd")).toBe(true);
    expect(strongPassword.test("Str0ng!Pass")).toBe(true);
  });

  it("rejects weak passwords", () => {
    expect(strongPassword.test("password")).toBe(false);
    expect(strongPassword.test("Password1")).toBe(false);
    expect(strongPassword.test("short")).toBe(false);
  });
});

describe("patterns/semver", () => {
  it("matches semantic versions", () => {
    expect(semver.test("1.0.0")).toBe(true);
    expect(semver.test("2.1.3")).toBe(true);
    expect(semver.test("0.0.1-alpha")).toBe(true);
  });

  it("rejects invalid semver", () => {
    expect(semver.test("1.0")).toBe(false);
    expect(semver.test("v1.0.0")).toBe(false);
  });
});

describe("patterns/macAddress", () => {
  it("matches MAC addresses", () => {
    expect(macAddress.test("00:1A:2B:3C:4D:5E")).toBe(true);
    expect(macAddress.test("00-1A-2B-3C-4D-5E")).toBe(true);
  });

  it("rejects invalid MAC addresses", () => {
    expect(macAddress.test("00:1A:2B:3C:4D")).toBe(false);
    expect(macAddress.test("GG:1A:2B:3C:4D:5E")).toBe(false);
  });
});

// =============================================================================
// REAL WORLD EXAMPLES
// =============================================================================

describe("real world: phone number", () => {
  it("builds a phone pattern", () => {
    const phonePattern = optional("+")
      .then(digit(3))
      .then("-")
      .then(digit(3))
      .then("-")
      .then(digit(4));

    expect(phonePattern.test("123-456-7890")).toBe(true);
    expect(phonePattern.test("+123-456-7890")).toBe(true);
    expect(phonePattern.test("12-456-7890")).toBe(false);
  });
});

describe("real world: date extraction", () => {
  it("extracts date parts", () => {
    const datePattern = capture(digit(4), "year")
      .then("-")
      .then(capture(digit(2), "month"))
      .then("-")
      .then(capture(digit(2), "day"));

    const match = "2024-03-15".match(datePattern.toRegex());
    expect(match?.groups?.year).toBe("2024");
    expect(match?.groups?.month).toBe("03");
    expect(match?.groups?.day).toBe("15");
  });
});

describe("real world: email extraction", () => {
  it("extracts email parts", () => {
    const emailPattern = capture(word().oneOrMore(), "user")
      .then("@")
      .then(capture(word().oneOrMore(), "domain"));

    const match = "test@example".match(emailPattern.toRegex());
    expect(match?.groups?.user).toBe("test");
    expect(match?.groups?.domain).toBe("example");
  });
});