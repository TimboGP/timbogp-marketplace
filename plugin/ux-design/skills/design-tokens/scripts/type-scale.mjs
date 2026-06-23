#!/usr/bin/env node
/*
 * type-scale.mjs — generate a modular type scale.
 *
 * Usage:
 *   node type-scale.mjs [basePx=16] [ratio=1.25] [stepsUp=6] [stepsDown=2]
 *
 * For each step from -stepsDown..+stepsUp computes size = base * ratio^step.
 * Prints a table (step name, px, rem) and paste-ready CSS custom properties.
 *
 * Examples:
 *   node type-scale.mjs                 # 16px base, 1.25 ratio
 *   node type-scale.mjs 16 1.25
 *   node type-scale.mjs 18 1.333 7 3
 *
 * Zero dependencies — Node built-ins only.
 */

const USAGE =
  'Usage: node type-scale.mjs [basePx=16] [ratio=1.25] [stepsUp=6] [stepsDown=2]';

function fail(msg) {
  console.error('Error: ' + msg);
  console.error(USAGE);
  process.exit(1);
}

function parsePositiveNumber(raw, label) {
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) {
    fail(`${label} must be a positive number (got "${raw}").`);
  }
  return n;
}

function parsePositiveInt(raw, label) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) {
    fail(`${label} must be a non-negative integer (got "${raw}").`);
  }
  return n;
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  console.log(USAGE);
  process.exit(0);
}

const basePx = args[0] !== undefined ? parsePositiveNumber(args[0], 'basePx') : 16;
const ratio = args[1] !== undefined ? parsePositiveNumber(args[1], 'ratio') : 1.25;
const stepsUp = args[2] !== undefined ? parsePositiveInt(args[2], 'stepsUp') : 6;
const stepsDown = args[3] !== undefined ? parsePositiveInt(args[3], 'stepsDown') : 2;

// Step index 0 == "base". Negatives shrink, positives grow.
const NAMES_UP = ['base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
const NAMES_DOWN = ['sm', 'xs', '2xs', '3xs', '4xs'];

function nameForStep(step) {
  if (step >= 0) {
    return NAMES_UP[step] ?? `up${step}`;
  }
  return NAMES_DOWN[-step - 1] ?? `down${-step}`;
}

// Round px to 2 decimals, then snap to the nearest 0.5 for cleaner values.
function roundPx(px) {
  return Math.round(px * 2) / 2;
}

function fmtPx(px) {
  return Number.isInteger(px) ? String(px) : px.toFixed(2).replace(/\.?0+$/, '');
}

function fmtRem(rem) {
  // Up to 4 decimals, trailing zeros trimmed.
  return rem.toFixed(4).replace(/\.?0+$/, '');
}

const rows = [];
for (let step = stepsUp; step >= -stepsDown; step--) {
  const raw = basePx * Math.pow(ratio, step);
  const px = roundPx(raw);
  const rem = px / 16;
  rows.push({
    name: nameForStep(step),
    step,
    px,
    pxStr: fmtPx(px),
    remStr: fmtRem(rem),
  });
}

// ---- Table ----
const nameW = Math.max(4, ...rows.map((r) => r.name.length));
const pxW = Math.max(2, ...rows.map((r) => r.pxStr.length));
const remW = Math.max(3, ...rows.map((r) => r.remStr.length));

const pad = (s, w) => String(s).padEnd(w);
const padL = (s, w) => String(s).padStart(w);

console.log(
  `Type scale — base ${fmtPx(basePx)}px, ratio ${ratio}, ` +
    `${stepsUp} up / ${stepsDown} down`
);
console.log('');
console.log(`${pad('name', nameW)}  ${padL('px', pxW)}  ${padL('rem', remW)}`);
console.log(`${'-'.repeat(nameW)}  ${'-'.repeat(pxW)}  ${'-'.repeat(remW)}`);
for (const r of rows) {
  console.log(`${pad(r.name, nameW)}  ${padL(r.pxStr, pxW)}  ${padL(r.remStr, remW)}`);
}

// ---- CSS custom properties ----
console.log('');
console.log('/* Paste into :root */');
for (const r of rows) {
  console.log(`--font-size-${r.name}: ${r.remStr}rem;`);
}
