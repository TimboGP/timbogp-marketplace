#!/usr/bin/env node
// axe-scan.mjs — run axe-core against a URL or local HTML file (Node ESM)
//
// Usage:
//   node axe-scan.mjs <url-or-file>
//
// Examples:
//   node axe-scan.mjs https://example.com
//   node axe-scan.mjs ./dist/index.html
//
// Requires (peer/optional, NOT bundled):
//   npm i -D puppeteer @axe-core/puppeteer
//
// If those dependencies are not installed, this script prints install
// instructions and exits 0 WITHOUT throwing, so it never breaks an audit.

import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error('Usage: node axe-scan.mjs <url-or-file>');
  console.error('  <url-or-file> is an http(s) URL or a path to a local HTML file.');
  console.error('  Example: node axe-scan.mjs https://example.com');
  console.error('  Example: node axe-scan.mjs ./index.html');
  process.exit(1);
}

// Resolve the argument into a navigable URL.
function toTargetUrl(arg) {
  if (/^https?:\/\//i.test(arg)) return arg;
  if (/^file:\/\//i.test(arg)) return arg;
  const abs = resolve(process.cwd(), arg);
  if (!existsSync(abs)) {
    usage(`local file not found: "${arg}" (resolved to ${abs}).`);
  }
  return pathToFileURL(abs).href;
}

const arg = process.argv[2];
if (!arg) usage('a URL or local HTML file is required.');
if (process.argv.length > 3) usage('too many arguments — expected exactly one target.');

const target = toTargetUrl(arg);

// Dynamically import the optional deps; degrade gracefully if missing.
let puppeteer;
let AxePuppeteer;
try {
  ({ default: puppeteer } = await import('puppeteer'));
  ({ AxePuppeteer } = await import('@axe-core/puppeteer'));
} catch {
  console.log('axe-scan: optional dependencies are not installed.');
  console.log('');
  console.log('To enable live page scanning, install them:');
  console.log('  npm i -D puppeteer @axe-core/puppeteer');
  console.log('');
  console.log('Then re-run:');
  console.log(`  node axe-scan.mjs ${arg}`);
  console.log('');
  console.log('Skipping automated scan. Use the manual POUR checklist and');
  console.log('contrast.mjs in the meantime.');
  process.exit(0);
}

const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];

let browser;
try {
  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(target, { waitUntil: 'networkidle2', timeout: 60000 });

  const results = await new AxePuppeteer(page).analyze();
  const violations = results.violations || [];

  console.log(`# axe-core scan — ${target}`);
  console.log('');

  if (violations.length === 0) {
    console.log('No automated violations detected.');
    console.log('(Automated tools catch ~30-40% of issues — run the manual checklist.)');
    await browser.close();
    process.exit(0);
  }

  // Group by impact.
  const byImpact = new Map();
  for (const v of violations) {
    const impact = v.impact || 'minor';
    if (!byImpact.has(impact)) byImpact.set(impact, []);
    byImpact.get(impact).push(v);
  }

  const counts = {};
  let totalNodes = 0;
  for (const impact of IMPACT_ORDER) {
    const list = byImpact.get(impact);
    if (!list || list.length === 0) continue;
    counts[impact] = list.length;
    console.log(`## ${impact.toUpperCase()} (${list.length})`);
    for (const v of list) {
      const nodeCount = (v.nodes && v.nodes.length) || 0;
      totalNodes += nodeCount;
      console.log(`- [${v.id}] ${v.help}`);
      console.log(`    affected nodes: ${nodeCount}`);
      if (v.helpUrl) console.log(`    more: ${v.helpUrl}`);
    }
    console.log('');
  }

  // Anything with an unexpected impact value.
  for (const [impact, list] of byImpact) {
    if (IMPACT_ORDER.includes(impact)) continue;
    counts[impact] = list.length;
    console.log(`## ${String(impact).toUpperCase()} (${list.length})`);
    for (const v of list) {
      const nodeCount = (v.nodes && v.nodes.length) || 0;
      totalNodes += nodeCount;
      console.log(`- [${v.id}] ${v.help} (affected nodes: ${nodeCount})`);
    }
    console.log('');
  }

  console.log('## Summary');
  for (const impact of IMPACT_ORDER) {
    if (counts[impact]) console.log(`  ${impact}: ${counts[impact]} rule(s)`);
  }
  console.log(`  total violated rules: ${violations.length}`);
  console.log(`  total affected nodes: ${totalNodes}`);
  console.log('');
  console.log('Note: automated scans miss keyboard, focus order, names, and');
  console.log('meaningful sequence — complete the manual POUR checklist too.');

  await browser.close();
  process.exit(0);
} catch (err) {
  if (browser) {
    try {
      await browser.close();
    } catch {
      /* ignore */
    }
  }
  console.error(`axe-scan failed: ${err && err.message ? err.message : err}`);
  process.exit(1);
}
