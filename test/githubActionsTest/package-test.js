const { wcswidth, wcwidth } = require('simple-wcswidth');
const assert = require('assert');

function runAllTests() {
  // Test 1: Basic ASCII Characters
  console.log('Running basic ASCII character tests...');
  assert.strictEqual(wcswidth('Hello'), 5, 'ASCII string should have correct width');
  assert.strictEqual(wcswidth('123'), 3, 'Numbers should have correct width');
  assert.strictEqual(wcswidth('!@#'), 3, 'Special characters should have correct width');

  // Test 2: CJK Characters (Chinese, Japanese, Korean)
  console.log('Running CJK character tests...');
  assert.strictEqual(wcswidth('你好'), 4, 'Chinese characters should have width 2 each');
  assert.strictEqual(wcswidth('こんにちは'), 10, 'Japanese characters should have width 2 each');
  assert.strictEqual(wcswidth('안녕하세요'), 10, 'Korean characters should have width 2 each');

  // Test 3: Mixed Content
  console.log('Running mixed content tests...');
  assert.strictEqual(wcswidth('Hello 世界'), 9, 'Mixed ASCII and CJK should have correct width');
  assert.strictEqual(wcswidth('123 你好'), 7, 'Mixed numbers and CJK should have correct width');
  assert.strictEqual(wcswidth('!@# こんにちは'), 13, 'Mixed special chars and CJK should have correct width');

  // Test 4: Control Characters
  console.log('Running control character tests...');
  assert.strictEqual(wcswidth('\t'), -1, 'Tab should return -1');
  assert.strictEqual(wcswidth('\n'), -1, 'Newline should return -1');
  assert.strictEqual(wcswidth('\r'), -1, 'Carriage return should return -1');
  assert.strictEqual(wcswidth('\x1b'), -1, 'Escape character should return -1');

  // Test 5: Fullwidth Characters
  console.log('Running fullwidth character tests...');
  assert.strictEqual(wcswidth('ＡＢＣ'), 6, 'Fullwidth Latin should have width 2 each');
  assert.strictEqual(wcswidth('１２３'), 6, 'Fullwidth numbers should have width 2 each');
  assert.strictEqual(wcswidth('！？'), 4, 'Fullwidth punctuation should have width 2 each');

  // Test 6: Combining Characters
  console.log('Running combining character tests...');
  assert.strictEqual(wcswidth('e\u0301'), 1, 'Combining character should have width 1');
  assert.strictEqual(wcswidth('a\u0308'), 1, 'Combining character should have width 1');

  // Test 7: Individual Character Widths
  console.log('Running individual character width tests...');
  assert.strictEqual(wcwidth('A'.charCodeAt(0)), 1, 'ASCII character should have width 1');
  assert.strictEqual(wcwidth('你'.charCodeAt(0)), 2, 'CJK character should have width 2');
  assert.strictEqual(wcwidth('\t'.charCodeAt(0)), -1, 'Control character should return -1');
  assert.strictEqual(wcwidth('Ａ'.charCodeAt(0)), 2, 'Fullwidth character should have width 2');

  // Test 8: Edge Cases
  console.log('Running edge case tests...');
  assert.strictEqual(wcswidth(''), 0, 'Empty string should have width 0');
  assert.strictEqual(wcswidth(' '), 1, 'Space should have width 1');
  assert.strictEqual(wcswidth('　'), 2, 'Fullwidth space should have width 2');

  console.log('✅ All tests passed successfully!');

  // Print a sample of test results for visual verification
  console.log('\nVisual verification of width calculations:');
  console.log('ASCII: "Hello" ->', wcswidth('Hello'));
  console.log('Chinese: "你好" ->', wcswidth('你好'));
  console.log('Mixed: "Hello 世界" ->', wcswidth('Hello 世界'));
  console.log('Fullwidth: "ＡＢＣ" ->', wcswidth('ＡＢＣ'));
}

try {
  runAllTests();
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}
