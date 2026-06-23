// Black-box tests for the plugin's bundled CLI scripts.
//
// These assert the *contract* CI relies on: key computed values and exit
// codes. They run each script as a real subprocess (no refactor of the
// scripts needed) so a regression in the math or the exit-code gating fails
// the build. Run with: npm test  (or: node --test)

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readdirSync } from 'node:fs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const abs = (p) => resolve(repoRoot, p);

function run(scriptRelPath, args = []) {
  const res = spawnSync(process.execPath, [abs(scriptRelPath), ...args], {
    encoding: 'utf8',
  });
  return { status: res.status, stdout: res.stdout || '', stderr: res.stderr || '' };
}

const CONTRAST = 'plugin/ux-design/skills/accessibility-audit/scripts/contrast.mjs';
const TYPESCALE = 'plugin/ux-design/skills/design-tokens/scripts/type-scale.mjs';
const TOKENCHECK = 'plugin/ux-design/skills/design-tokens/scripts/contrast-check.mjs';
const SUS = 'plugin/ux-design/skills/ux-metrics/scripts/sus-score.mjs';

test('contrast.mjs: #777 on #fff is 4.48 (AA normal FAIL, AA large PASS)', () => {
  const { status, stdout } = run(CONTRAST, ['#777', '#ffffff']);
  assert.equal(status, 0);
  assert.match(stdout, /4\.48/);
  assert.match(stdout, /AA\s+normal[^\n]*FAIL/i);
  assert.match(stdout, /AA\s+large[^\n]*PASS/i);
});

test('contrast.mjs: exits non-zero with missing args', () => {
  assert.notEqual(run(CONTRAST, []).status, 0);
});

test('sus-score.mjs: reference responses score 90.0', () => {
  const { status, stdout } = run(SUS, ['4', '2', '5', '1', '5', '1', '4', '2', '5', '1']);
  assert.equal(status, 0);
  assert.match(stdout, /SUS score:\s*90(\.0)?/);
});

test('sus-score.mjs: rejects the wrong number of responses', () => {
  assert.notEqual(run(SUS, ['4', '2', '5']).status, 0);
});

test('sus-score.mjs: rejects out-of-range responses', () => {
  assert.notEqual(run(SUS, ['9', '2', '5', '1', '5', '1', '4', '2', '5', '1']).status, 0);
});

test('type-scale.mjs: emits a base step at 1rem', () => {
  const { status, stdout } = run(TYPESCALE, ['16', '1.25']);
  assert.equal(status, 0);
  assert.match(stdout, /--font-size-base:\s*1rem;/);
});

test('type-scale.mjs: rejects a non-numeric ratio', () => {
  assert.notEqual(run(TYPESCALE, ['16', 'abc']).status, 0);
});

test('contrast-check.mjs: default token pairs pass (border = non-text, no gate)', () => {
  const { status, stdout } = run(TOKENCHECK, []);
  assert.equal(status, 0);
  assert.match(stdout, /non-text/i);
});

test('contrast-check.mjs: gate fails when a text pair is below AA', () => {
  assert.notEqual(run(TOKENCHECK, ['#999:#fff']).status, 0);
});

test('contrast-check.mjs: a strong text pair passes', () => {
  assert.equal(run(TOKENCHECK, ['#111:#fff']).status, 0);
});

test('all bundled scripts parse (node --check)', () => {
  const scriptDirs = [
    'plugin/ux-design/skills/accessibility-audit/scripts',
    'plugin/ux-design/skills/design-tokens/scripts',
    'plugin/ux-design/skills/ux-metrics/scripts',
  ];
  for (const dir of scriptDirs) {
    for (const f of readdirSync(abs(dir))) {
      if (!/\.(mjs|js)$/.test(f)) continue;
      const res = spawnSync(process.execPath, ['--check', resolve(abs(dir), f)], {
        encoding: 'utf8',
      });
      assert.equal(res.status, 0, `${dir}/${f} failed node --check:\n${res.stderr}`);
    }
  }
});
