#!/usr/bin/env node
/*
 * contrast-check.mjs — WCAG 2.x contrast ratios for color pairs.
 *
 * Usage:
 *   node contrast-check.mjs "#111:#fff" "#777:#fff" ...   # check fg:bg pairs
 *   node contrast-check.mjs                                # check default token pairs
 *
 * Each pair is "<fg>:<bg>" where colors are 3- or 6-digit hex,
 * with or without a leading "#" (e.g. "111:fff", "#1d4ed8:#ffffff").
 *
 * For each pair prints: pair, ratio (2 dp), and PASS/FAIL for
 *   AA normal (>= 4.5), AA large (>= 3.0), AAA normal (>= 7.0).
 * Pairs flagged as non-text UI (e.g. the built-in border pair) are judged
 * only against the >= 3.0 bar (WCAG 1.4.11) and never gate CI, since
 * decorative borders/dividers are exempt from contrast requirements.
 *
 * Exits non-zero if any *text* pair fails AA normal, so it can gate CI.
 *
 * Zero dependencies — Node built-ins only.
 */

const USAGE =
  'Usage: node contrast-check.mjs ["#fg:#bg" ...]\n' +
  '       (no args -> check the built-in default token pairs)';

// Default pairs mirror the semantic roles in assets/tokens.css (light theme).
// kind: 'text' (default) is gated at AA normal 4.5; 'ui' is a non-text element
// (WCAG 1.4.11, >= 3.0) and is reported but never gates CI.
const DEFAULT_PAIRS = [
  { label: 'fg on bg', fg: '#0e1116', bg: '#ffffff', kind: 'text' },
  { label: 'muted-fg on bg', fg: '#5f6877', bg: '#ffffff', kind: 'text' },
  { label: 'primary-fg on primary', fg: '#ffffff', bg: '#1d4ed8', kind: 'text' },
  { label: 'danger-fg on danger', fg: '#ffffff', bg: '#dc2626', kind: 'text' },
  { label: 'border on bg (non-text)', fg: '#d9dde3', bg: '#ffffff', kind: 'ui' },
];

/** Parse a hex string (3 or 6 digits, optional '#') to {r,g,b} in 0..255. */
function parseHex(input) {
  if (typeof input !== 'string') throw new Error('color must be a string');
  let h = input.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (!/^[0-9a-fA-F]+$/.test(h)) {
    throw new Error(`invalid hex color "${input}" (non-hex characters)`);
  }
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6) {
    throw new Error(`invalid hex color "${input}" (need 3 or 6 digits)`);
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** sRGB channel (0..255) -> linear value. */
function linearize(channel8) {
  const c = channel8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Relative luminance per WCAG. */
function relativeLuminance({ r, g, b }) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** Contrast ratio between two colors (order-independent). */
function contrastRatio(c1, c2) {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parsePairArg(arg) {
  const idx = arg.lastIndexOf(':');
  if (idx === -1) {
    throw new Error(`pair "${arg}" must be in the form "fg:bg"`);
  }
  const fg = arg.slice(0, idx);
  const bg = arg.slice(idx + 1);
  if (!fg || !bg) {
    throw new Error(`pair "${arg}" must be in the form "fg:bg"`);
  }
  return { label: `${fg} on ${bg}`, fg, bg, kind: 'text' };
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  console.log(USAGE);
  process.exit(0);
}

let pairs;
if (args.length === 0) {
  pairs = DEFAULT_PAIRS;
  console.log('No pairs given — checking built-in default token pairs.\n');
} else {
  try {
    pairs = args.map(parsePairArg);
  } catch (err) {
    console.error('Error: ' + err.message);
    console.error(USAGE);
    process.exit(1);
  }
}

const verdict = (ok) => (ok ? 'PASS' : 'FAIL');

const rows = [];
let anyAaFail = false;
let hadError = false;

for (const pair of pairs) {
  const kind = pair.kind === 'ui' ? 'ui' : 'text';
  let fgRgb, bgRgb;
  try {
    fgRgb = parseHex(pair.fg);
    bgRgb = parseHex(pair.bg);
  } catch (err) {
    rows.push({ label: pair.label, error: err.message });
    hadError = true;
    continue;
  }
  const ratio = contrastRatio(fgRgb, bgRgb);
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;
  // Only text pairs gate CI. Non-text UI is SC 1.4.11 (>= 3.0), and
  // decorative borders/dividers are exempt — so 'ui' rows never fail the build.
  if (kind === 'text' && !aaNormal) anyAaFail = true;
  rows.push({ label: pair.label, kind, ratio, aaNormal, aaLarge, aaaNormal });
}

const labelW = Math.max(4, ...rows.map((r) => r.label.length));
const pad = (s, w) => String(s).padEnd(w);

console.log(
  `${pad('pair', labelW)}  ${'ratio'.padStart(6)}  AA-norm  AA-large  AAA-norm`
);
console.log(
  `${'-'.repeat(labelW)}  ${'-'.repeat(6)}  -------  --------  --------`
);

let anyUi = false;
for (const r of rows) {
  if (r.error) {
    console.log(`${pad(r.label, labelW)}  ERROR: ${r.error}`);
    continue;
  }
  if (r.kind === 'ui') {
    // Non-text UI: only the >= 3.0 bar applies; other columns are n/a.
    anyUi = true;
    console.log(
      `${pad(r.label, labelW)}  ${r.ratio.toFixed(2).padStart(6)}  ` +
        `${pad('n/a', 7)}  ` +
        `${pad(verdict(r.aaLarge), 8)}  ` +
        `n/a`
    );
    continue;
  }
  console.log(
    `${pad(r.label, labelW)}  ${r.ratio.toFixed(2).padStart(6)}  ` +
      `${pad(verdict(r.aaNormal), 7)}  ` +
      `${pad(verdict(r.aaLarge), 8)}  ` +
      `${verdict(r.aaaNormal)}`
  );
}

console.log('');
console.log(
  'Legend: AA-norm >= 4.5 (body text)  |  AA-large >= 3.0 ' +
    '(>=18.66px bold or >=24px)  |  AAA-norm >= 7.0'
);
if (anyUi) {
  console.log(
    'Non-text rows: only the >= 3.0 bar applies (WCAG 1.4.11). Decorative ' +
      'borders/dividers are exempt; a control’s visible boundary is not.'
  );
}

if (hadError) {
  console.error('\nOne or more pairs could not be parsed.');
  process.exit(1);
}
if (anyAaFail) {
  console.error('\nAt least one pair fails AA normal (>= 4.5).');
  process.exit(1);
}
