#!/usr/bin/env node
// sus-score.mjs — System Usability Scale (SUS) calculator (zero-dependency, Node ESM)
//
// Usage:
//   node sus-score.mjs r1 r2 r3 r4 r5 r6 r7 r8 r9 r10
//
// Provide exactly ten integer responses (1-5), in item order (item 1 first).
//   1 = strongly disagree ... 5 = strongly agree
//
// Example:
//   node sus-score.mjs 4 2 5 1 5 1 4 2 5 1
//
// Scoring:
//   odd items  (1,3,5,7,9)  contribute (response - 1)
//   even items (2,4,6,8,10) contribute (5 - response)
//   sum all ten contributions, multiply by 2.5 -> 0..100
//
// The result is NOT a percentage. The cross-product average is ~68.

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error('Usage: node sus-score.mjs r1 r2 r3 r4 r5 r6 r7 r8 r9 r10');
  console.error('  Exactly 10 responses, each an integer 1-5, in item order.');
  console.error('  Example: node sus-score.mjs 4 2 5 1 5 1 4 2 5 1');
  process.exit(1);
}

const args = process.argv.slice(2);

if (args.length !== 10) {
  usage(`expected exactly 10 responses, got ${args.length}.`);
}

const responses = args.map((a) => Number(a));
responses.forEach((n, i) => {
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    usage(`response ${i + 1} ("${args[i]}") must be an integer between 1 and 5.`);
  }
});

let sum = 0;
for (let i = 0; i < 10; i++) {
  const itemNumber = i + 1; // 1-based item number
  const r = responses[i];
  // Odd item numbers are positively worded; even are negatively worded.
  sum += itemNumber % 2 === 1 ? r - 1 : 5 - r;
}

const score = sum * 2.5;

// Sauro-Lewis curved grade bands.
function gradeBand(s) {
  if (s >= 84.1) return { grade: 'A+', label: 'best imaginable' };
  if (s >= 80.8) return { grade: 'A', label: 'excellent' };
  if (s >= 78.9) return { grade: 'A-', label: 'excellent' };
  if (s >= 77.2) return { grade: 'B+', label: 'good' };
  if (s >= 74.1) return { grade: 'B', label: 'good' };
  if (s >= 72.6) return { grade: 'B-', label: 'good' };
  if (s >= 71.1) return { grade: 'C+', label: 'good' };
  if (s >= 65.0) return { grade: 'C', label: 'OK / average' };
  if (s >= 62.7) return { grade: 'C-', label: 'OK' };
  if (s >= 51.7) return { grade: 'D', label: 'poor' };
  return { grade: 'F', label: 'poor / awful' };
}

// Adjective rating (Bangor et al.).
function adjective(s) {
  if (s >= 85.5) return 'Best Imaginable';
  if (s >= 72.75) return 'Excellent';
  if (s >= 52.01) return 'Good';
  if (s >= 39.17) return 'OK';
  if (s >= 25.0) return 'Poor';
  return 'Worst Imaginable';
}

const { grade, label } = gradeBand(score);

console.log(`SUS score: ${score.toFixed(1)} / 100`);
console.log(`Grade: ${grade} (${label})`);
console.log(`Adjective rating: ${adjective(score)}`);
console.log('');
console.log('Reference: cross-product average is ~68 (grade C).');
console.log('Note: the SUS score is a 0-100 scale, not a percentage.');
