import { wcswidth } from '../index';

describe('Wcswidth', () => {
  it('Japanese', () => {
    expect(wcswidth('おねがいします。')).toBe(16);
    expect(wcswidth('はい。')).toBe(6);
    expect(wcswidth('いいえ。')).not.toBe(4);
  });
  it('Chinese', () => {
    expect(wcswidth('重要')).toBe(4);
    expect(wcswidth('是')).toBe(2);
    expect(wcswidth('请你')).not.toBe(2);
    expect(wcswidth('你好，朋友。你好吗？')).toBe(20);
  });
  it('Korean', () => {
    expect(wcswidth('예')).toBe(2);
    expect(wcswidth('감사')).toBe(4);
    expect(wcswidth('아니')).not.toBe(2);
  });
  it('Vietnamese', () => {
    expect(wcswidth('Không')).toBe(5);
  });
  it('English', () => {
    expect(wcswidth('Yes')).toBe(3);
    expect(wcswidth('Hey Sailer')).toBe(10);
  });
  it('Mixed: English and Chinese', () => {
    expect(wcswidth('Yes 重要')).toBe(8);
  });
  it('Edge Cases', () => {
    expect(wcswidth('')).toBe(0); // Empty string
    expect(wcswidth(' ')).toBe(1); // Space
    expect(wcswidth('\t')).toBe(-1); // Tab character
    expect(wcswidth('\n')).toBe(-1); // Newline
    expect(wcswidth('\r')).toBe(-1); // Carriage return
    expect(wcswidth('\x1b')).toBe(-1); // Escape character
  });
  it('Fullwidth Characters', () => {
    expect(wcswidth('ＡＢＣ')).toBe(6); // Fullwidth Latin
    expect(wcswidth('１２３')).toBe(6); // Fullwidth numbers
    expect(wcswidth('！？')).toBe(4); // Fullwidth punctuation
  });
  it('Combining Characters', () => {
    expect(wcswidth('e\u0301')).toBe(1); // e with acute accent
    expect(wcswidth('a\u0308')).toBe(1); // a with umlaut
  });
});
