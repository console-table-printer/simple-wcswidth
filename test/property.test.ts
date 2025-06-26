import * as fc from 'fast-check';
import { wcwidth, wcswidth } from '../index';

describe('Property-based tests', () => {
  test('wcswidth returns sum of wcwidth for each character', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        // Skip strings with control chars which return -1
        if (s.split('').some(c => wcwidth(c.charCodeAt(0)) < 0)) return true;
        
        const expected = s.split('').reduce((sum, c) => sum + wcwidth(c.charCodeAt(0)), 0);
        return wcswidth(s) === expected;
      })
    );
  });

  test('wcswidth of empty string is 0', () => {
    expect(wcswidth('')).toBe(0);
  });

  test('wcswidth is always non-negative except for control chars', () => {
    fc.assert(
      fc.property(fc.string().filter(s => !s.includes('\u0000')), (s) => {
        return wcswidth(s) >= 0;
      })
    );
  });

  test('wcwidth returns consistent results for same input', () => {
    fc.assert(
      fc.property(fc.integer(0, 0x10FFFF), (codePoint) => {
        const result1 = wcwidth(codePoint);
        const result2 = wcwidth(codePoint);
        return result1 === result2;
      })
    );
  });

  test('wcswidth returns -1 if any character has wcwidth of -1', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s.length > 0),
        fc.integer(0, 31),
        (s, controlChar) => {
          const index = Math.floor(Math.random() * s.length);
          const withControlChar = s.substring(0, index) + String.fromCharCode(controlChar) + s.substring(index + 1);
          return wcswidth(withControlChar) === -1;
        }
      )
    );
  });
}); 