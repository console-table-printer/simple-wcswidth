// ESM import example
import { wcwidth, wcswidth } from 'simple-wcswidth';

console.log('Width of "Hello 世界":', wcswidth('Hello 世界'));

// Example: Terminal width visualization
const visualize = (text) => {
  const width = wcswidth(text);
  console.log(`"${text}" takes ${width} columns in the terminal:`);
  console.log('|' + '-'.repeat(width) + '|');
  console.log('|' + text + ' '.repeat(Math.max(0, width - wcswidth(text))) + '|');
  console.log('|' + '-'.repeat(width) + '|');
  console.log();
};

// Visualize different strings
visualize('Hello');
visualize('你好');
visualize('Hello 世界');
visualize('こんにちは');

// Example: Truncate string to fit terminal width
const truncate = (text, maxWidth) => {
  if (wcswidth(text) <= maxWidth) return text;
  
  let result = '';
  let currentWidth = 0;
  
  for (const char of text) {
    const charWidth = wcwidth(char.charCodeAt(0));
    if (currentWidth + charWidth > maxWidth) break;
    
    result += char;
    currentWidth += charWidth;
  }
  
  return result + '…';
};

console.log(truncate('Hello 世界 This is a long text', 15)); // "Hello 世界 This…" 