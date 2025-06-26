const { wcwidth, wcswidth } = require('simple-wcswidth');

// Basic usage
console.log('Width of "Hello": ' + wcswidth('Hello')); // 5
console.log('Width of "你好": ' + wcswidth('你好')); // 4
console.log('Width of "A": ' + wcwidth('A'.charCodeAt(0))); // 1
console.log('Width of "世": ' + wcwidth('世'.charCodeAt(0))); // 2

// Practical example: Align text in console
function alignText(text, width) {
  const actualWidth = wcswidth(text);
  const padding = Math.max(0, width - actualWidth);
  return text + ' '.repeat(padding);
}

console.log(alignText('Hello', 10) + '|');
console.log(alignText('你好', 10) + '|');
console.log(alignText('Hello 世界', 10) + '|');

// Practical example: Create a fixed-width table
function createTable(rows) {
  const columnWidths = [10, 15];
  
  // Create header
  console.log('+' + '-'.repeat(columnWidths[0]) + '+' + '-'.repeat(columnWidths[1]) + '+');
  
  // Print rows
  for (const row of rows) {
    console.log(
      '|' + 
      alignText(row[0], columnWidths[0]) + 
      '|' + 
      alignText(row[1], columnWidths[1]) +
      '|'
    );
  }
  
  // Create footer
  console.log('+' + '-'.repeat(columnWidths[0]) + '+' + '-'.repeat(columnWidths[1]) + '+');
}

// Example usage
createTable([
  ['Name', 'Country'],
  ['John', 'USA'],
  ['李明', 'China'],
  ['Юрий', 'Russia'],
  ['Ñandú', 'Argentina'],
]); 