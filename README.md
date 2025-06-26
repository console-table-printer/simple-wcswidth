<h1 align="center">simple-wcswidth</h1>
<h3 align="center"> 🖥️ 💬 Simplified JS/TS implementation of wcwidth/wcswidth written by Markus Kuhn in C</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/simple-wcswidth"><img src="https://img.shields.io/npm/v/simple-wcswidth.svg" alt="npm version"></a>
  <a href="https://github.com/console-table-printer/simple-wcswidth/actions/workflows/ci.yml"><img src="https://github.com/console-table-printer/simple-wcswidth/actions/workflows/ci.yml/badge.svg" alt="CI Status"></a>
  <a href="https://codecov.io/gh/console-table-printer/simple-wcswidth"><img src="https://codecov.io/gh/console-table-printer/simple-wcswidth/graph/badge.svg?token=X4QPKTCB6A" alt="codecov"></a>
  <a href="https://github.com/console-table-printer/simple-wcswidth/actions/workflows/performance.yml"><img src="https://github.com/console-table-printer/simple-wcswidth/actions/workflows/performance.yml/badge.svg" alt="Performance"></a>
  <a href="https://packagephobia.now.sh/result?p=simple-wcswidth"><img src="https://packagephobia.now.sh/badge?p=simple-wcswidth@latest" alt="install size"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release"></a>
  <a href="https://github.com/console-table-printer/simple-wcswidth/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/simple-wcswidth.svg" alt="license"></a>
</p>

## Installation

```bash
# npm
npm install simple-wcswidth

# yarn
yarn add simple-wcswidth

# pnpm
pnpm add simple-wcswidth
```

## Why another wcswidth?

1. 💙 **Types included** - Full TypeScript support out of the box
2. 🤏 **Minimal size** - Installation size kept as small as possible
3. 🐒 **Zero dependencies** - No unnecessary dependencies
4. 🤖 **Well tested** - Automated testing on multiple Node.js versions
5. 📦 **Dual package** - Supports both ES modules and CommonJS
6. 🎯 **Simple API** - Easy to use with clear documentation

## Example Usage

### ES Modules (Recommended)
```javascript
import { wcwidth, wcswidth } from 'simple-wcswidth';

// Basic usage
console.log(wcswidth('Hello')); // 5
console.log(wcswidth('你好')); // 4
console.log(wcswidth('Hello 世界')); // 9

// Character width
console.log(wcwidth('A'.charCodeAt(0))); // 1
console.log(wcwidth('世'.charCodeAt(0))); // 2
```

### CommonJS
```javascript
const { wcwidth, wcswidth } = require('simple-wcswidth');

console.log(wcswidth('Yes 重要')); // 8
console.log(wcswidth('请你')); // 4
console.log(wcswidth('Hi')); // 2
```

### Practical Example: Creating aligned text in terminal

```javascript
function alignText(text, width) {
  const actualWidth = wcswidth(text);
  const padding = Math.max(0, width - actualWidth);
  return text + ' '.repeat(padding);
}

// Create a simple table
console.log('+----------+---------------+');
console.log('| ' + alignText('Name', 8) + ' | ' + alignText('Country', 13) + ' |');
console.log('+----------+---------------+');
console.log('| ' + alignText('John', 8) + ' | ' + alignText('USA', 13) + ' |');
console.log('| ' + alignText('李明', 8) + ' | ' + alignText('China', 13) + ' |');
console.log('| ' + alignText('Юрий', 8) + ' | ' + alignText('Russia', 13) + ' |');
console.log('+----------+---------------+');
```

Output:
```
+----------+---------------+
| Name     | Country       |
+----------+---------------+
| John     | USA           |
| 李明      | China         |
| Юрий     | Russia        |
+----------+---------------+
```

## API Reference

### `wcswidth(str: string): number`

Returns the width of a string in terminal columns.

**Parameters:**
- `str` - The string to measure

**Returns:**
- The width in terminal columns, or `-1` if the string contains control characters

### `wcwidth(ucs: number): number`

Returns the width of a single character in terminal columns.

**Parameters:**
- `ucs` - The Unicode code point of the character

**Returns:**
- `0` for null character
- `-1` for control characters
- `0` for non-spacing characters
- `1` for normal characters
- `2` for wide characters (East Asian)

## What is simplified here?

In the original [C code](https://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c) there were 2 versions of `wcswidth()` I have included here only for first one, which is applicable for general use.

About the second one(WHICH I DIDNT INCLUDE HERE), useful for users of CJK legacy encodings who want to migrate to UCS without changing the traditional terminal character-width behaviour. It is not otherwise recommended for general use.

## Info Taken from Markus Kuhn's [C code](https://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c)

This is an implementation of [wcwidth()](http://www.opengroup.org/onlinepubs/007904975/functions/wcwidth.html) and [wcswidth()](http://www.opengroup.org/onlinepubs/007904975/functions/wcswidth.html) (defined in
IEEE Std 1002.1-2001) for Unicode.

In fixed-width output devices, Latin characters all occupy a single
"cell" position of equal width, whereas ideographic CJK characters
occupy two such cells. Interoperability between terminal-line
applications and (teletype-style) character terminals using the
UTF-8 encoding requires agreement on which character should advance
the cursor by how many cell positions. No established formal
standards exist at present on which Unicode character shall occupy
how many cell positions on character terminals. These routines are
a first attempt of defining such behavior based on simple rules
applied to data provided by the Unicode Consortium.

For some graphical characters, the Unicode standard explicitly
defines a character-cell width via the definition of the East Asian
FullWidth (F), Wide (W), Half-width (H), and Narrow (Na) classes.
In all these cases, there is no ambiguity about which width a
terminal shall use. For characters in the East Asian Ambiguous (A)
class, the width choice depends purely on a preference of backward
compatibility with either historic CJK or Western practice.
Choosing single-width for these characters is easy to justify as
the appropriate long-term solution, as the CJK practice of
displaying these characters as double-width comes from historic
implementation simplicity (8-bit encoded characters were displayed
single-width and 16-bit ones double-width, even for Greek,
Cyrillic, etc.) and not any typographic considerations.

Much less clear is the choice of width for the Not East Asian
(Neutral) class. Existing practice does not dictate a width for any
of these characters. It would nevertheless make sense
typographically to allocate two character cells to characters such
as for instance EM SPACE or VOLUME INTEGRAL, which cannot be
represented adequately with a single-width glyph. The following
routines at present merely assign a single-cell width to all
neutral characters, in the interest of simplicity. This is not
entirely satisfactory and should be reconsidered before
establishing a formal standard in this area. At the moment, the
decision which Not East Asian (Neutral) characters should be
represented by double-width glyphs cannot yet be answered by
applying a simple rule from the Unicode database content. Setting
up a proper standard for the behavior of UTF-8 character terminals
will require a careful analysis not only of each Unicode character,
but also of each presentation form, something the author of these
routines has avoided to do so far.

http://www.unicode.org/unicode/reports/tr11/

## License

MIT

The original Code written in C was very permissive. You can find it here [Code](http://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c)
