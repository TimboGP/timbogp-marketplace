#!/usr/bin/env node
// contrast.mjs — WCAG color contrast ratio calculator (zero-dependency, Node ESM)
//
// Usage:
//   node contrast.mjs <foreground> <background>
//
// Colors are hex: 3 or 6 digits, with or without a leading "#".
//   node contrast.mjs "#777" "#ffffff"
//   node contrast.mjs 777 fff
//
// Output: the two colors, the contrast ratio (2 decimals), and PASS/FAIL for:
//   - AA normal text      (>= 4.5)
//   - AA large text       (>= 3.0)
//   - AAA normal text     (>= 7.0)
//   - AAA large text      (>= 4.5)
//   - UI components/graphics / non-text (>= 3.0)
//
// Ratio = (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter relative luminance.

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error('Usage: node contrast.mjs <foreground> <background>');
  console.error('  Colors are hex (3 or 6 digits, with or without "#").');
  console.error('  Example: node contrast.mjs "#777" "#ffffff"');
  process.exit(1);
}

// Parse a hex color string into [r, g, b] (0-255). Returns null if invalid.
function parseHex(input) {
  if (typeof input !== 'string') return null;
  let h = input.trim().replace(/^#/, '').toLowerCase();
  if (!/^[0-9a-f]+$/.test(h)) return null;
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

// sRGB channel linearization per WCAG.
function linearize(channel8bit) {
  const c = channel8bit / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

// Relative luminance per WCAG 2.x.
function relativeLuminance([r, g, b]) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(rgb1, rgb2) {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function verdict(ratio, threshold) {
  return ratio >= threshold ? 'PASS' : 'FAIL';
}

const [fgArg, bgArg, ...extra] = process.argv.slice(2);

if (!fgArg || !bgArg) usage('two color arguments are required.');
if (extra.length > 0) usage('too many arguments — expected exactly two colors.');

const fg = parseHex(fgArg);
const bg = parseHex(bgArg);
if (!fg) usage(`invalid foreground color: "${fgArg}".`);
if (!bg) usage(`invalid background color: "${bgArg}".`);

const ratio = contrastRatio(fg, bg);
const r = ratio.toFixed(2);

const toHex = (rgb) =>
  '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');

console.log(`Foreground: ${toHex(fg)}`);
console.log(`Background: ${toHex(bg)}`);
console.log(`Contrast ratio: ${r}:1`);
console.log('');
console.log(`AA  normal text   (>= 4.5): ${verdict(ratio, 4.5)}`);
console.log(`AA  large text    (>= 3.0): ${verdict(ratio, 3.0)}`);
console.log(`AAA normal text   (>= 7.0): ${verdict(ratio, 7.0)}`);
console.log(`AAA large text    (>= 4.5): ${verdict(ratio, 4.5)}`);
console.log(`UI / non-text     (>= 3.0): ${verdict(ratio, 3.0)}`);
