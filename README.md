<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/crying-face_1f622.png" width="80" />
</p>

<h1 align="center">zeroReg</h1>

<p align="center">
  <strong>Regex was a mistake. Just like your ex.</strong>
</p>

<p align="center">
  Write regex without the tears or confusion.<br/>
  A human-readable regex builder for JavaScript & TypeScript.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zeroreg"><img src="https://img.shields.io/npm/v/zeroreg?style=flat-square&color=000&labelColor=000" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/zeroreg"><img src="https://img.shields.io/npm/dm/zeroreg?style=flat-square&color=000&labelColor=000" alt="npm downloads" /></a>
  <a href="https://github.com/yourusername/zeroreg/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square&labelColor=000" alt="license" /></a>
  <a href="https://bundlephobia.com/package/zeroreg"><img src="https://img.shields.io/bundlephobia/minzip/zeroreg?style=flat-square&color=000&labelColor=000&label=size" alt="bundle size" /></a>
</p>

---

## The Problem

```js
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```

Your coworker asks what it does. You mass tears. You mass confusion. You mass quit.

## The Solution

```js
import { email } from 'zeroreg/patterns'

email.test('hello@world.com') // true
```

Or build your own:

```js
import { digit, optional } from 'zeroreg'

const phone = optional('+')
  .then(digit(3))
  .then('-')
  .then(digit(3))
  .then('-')
  .then(digit(4))

phone.test('123-456-7890')  // true
phone.toRegex()             // /\+?\d{3}-\d{3}-\d{4}/
```

## Installation

```bash
npm install zeroreg
```

## API

### Character Classes

| Function | Description | Regex |
|----------|-------------|-------|
| `digit(n?)` | Match digits | `\d` or `\d{n}` |
| `word()` | Word characters | `\w` |
| `letter()` | Letters only | `[a-zA-Z]` |
| `whitespace()` | Whitespace | `\s` |
| `any()` | Any character | `.` |
| `literal(str)` | Exact match | (escaped) |
| `charIn(chars)` | Match any in set | `[...]` |
| `charNotIn(chars)` | Match any NOT in set | `[^...]` |

### Quantifiers

| Method | Description |
|--------|-------------|
| `.oneOrMore()` | 1+ times |
| `.zeroOrMore()` | 0+ times |
| `.optional()` | 0 or 1 |
| `.times(n)` | Exactly n |
| `.between(min, max)` | Range |
| `.atLeast(n)` | n or more |

### Groups

| Function | Description |
|----------|-------------|
| `capture(pattern, name?)` | Capturing group |
| `group(pattern)` | Non-capturing group |
| `oneOf(...patterns)` | Match any of |

### Anchors

| Function | Description |
|----------|-------------|
| `startOfLine()` | `^` |
| `endOfLine()` | `$` |
| `wordBoundary()` | `\b` |

### Output

| Method | Description |
|--------|-------------|
| `.toRegex(flags?)` | Get native `RegExp` |
| `.test(str)` | Test string |
| `.match(str)` | Get matches |
| `.matchAll(str)` | Get all matches |
| `.replace(str, replacement)` | Replace matches |

## Pre-built Patterns

```js
import { email, url, phone, date, ipv4, uuid } from 'zeroreg/patterns'
```

Available: `email`, `url`, `phone`, `date`, `time`, `ipv4`, `ipv6`, `hexColor`, `hex`, `uuid`, `slug`, `hashtag`, `mention`, `creditCard`, `ssn`, `zipCode`, `username`, `strongPassword`, `semver`, `macAddress`

## License

MIT