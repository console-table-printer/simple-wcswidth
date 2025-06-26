const { Suite } = require('benchmark');
const { wcwidth, wcswidth } = require('../dist/index.js');

const suite = new Suite();

// Benchmark wcwidth
suite.add('wcwidth - ASCII', () => {
  wcwidth('A'.charCodeAt(0));
});

suite.add('wcwidth - CJK', () => {
  wcwidth('世'.charCodeAt(0));
});

// Benchmark wcswidth
suite.add('wcswidth - ASCII only', () => {
  wcswidth('Hello World');
});

suite.add('wcswidth - Mixed', () => {
  wcswidth('Hello 世界');
});

suite.add('wcswidth - CJK only', () => {
  wcswidth('你好世界');
});

// Long string test
suite.add('wcswidth - Long ASCII (100 chars)', () => {
  wcswidth('A'.repeat(100));
});

suite.add('wcswidth - Long CJK (100 chars)', () => {
  wcswidth('世'.repeat(100));
});

// Run benchmarks
suite
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
