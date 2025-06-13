import { wcwidth } from '../index';

describe('Wcwidth', () => {
  it('Hangul Syllables', () => {
    expect(wcwidth('갶'.charCodeAt(0))).toBe(2);
  });
  it('English', () => {
    expect(wcwidth('Y'.charCodeAt(0))).toBe(1);
    expect(wcwidth('H'.charCodeAt(0))).toBe(1);
  });
  it('Emoji', () => {
    expect(wcwidth('😊'.charCodeAt(0))).toBe(1);
  });
  it('Non Spacing Chars', () => {
    expect(wcwidth(0x05c4)).toBe(0);
    expect(wcwidth(0x06e7)).toBe(0);
    expect(wcwidth(0x093c)).toBe(0);
  });
  it('8 bit Control Chars', () => {
    expect(wcwidth(0x7f)).toBe(-1);
    expect(wcwidth(0)).toBe(0);
  });
  it('CJK Characters', () => {
    expect(wcwidth(0x4e00)).toBe(2); // CJK Unified Ideograph
    expect(wcwidth(0x9fa5)).toBe(2); // CJK Unified Ideograph
    expect(wcwidth(0x3000)).toBe(2); // Fullwidth Space
  });
  it('Fullwidth Forms', () => {
    expect(wcwidth(0xff01)).toBe(2); // Fullwidth Exclamation Mark
    expect(wcwidth(0xff5e)).toBe(2); // Fullwidth Tilde
    expect(wcwidth(0xffe0)).toBe(2); // Fullwidth Cent Sign
  });
  it('Control Characters', () => {
    expect(wcwidth(0x1b)).toBe(-1); // Escape
    expect(wcwidth(0x0a)).toBe(-1); // Line Feed
    expect(wcwidth(0x0d)).toBe(-1); // Carriage Return
    expect(wcwidth(0x09)).toBe(-1); // Tab
  });
  it('Combining Characters', () => {
    expect(wcwidth(0x0300)).toBe(0); // Combining Grave Accent
    expect(wcwidth(0x0301)).toBe(0); // Combining Acute Accent
    expect(wcwidth(0x0302)).toBe(0); // Combining Circumflex Accent
  });
  it('Special Cases', () => {
    expect(wcwidth(0x303f)).toBe(1); // IDEOGRAPHIC HALF FILL SPACE
    expect(wcwidth(0x2328)).toBe(1); // KEYBOARD
    expect(wcwidth(0x2327)).toBe(1); // X IN A RECTANGLE BOX
  });
});
