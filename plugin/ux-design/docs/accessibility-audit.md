# Accessibility Audit — `accessibility-audit`

> Evaluate a design, page, or component against WCAG 2.2 Level AA and produce a severity-scored report with a fix for every finding.

## What it does
This skill assesses WCAG 2.2 Level AA conformance from whatever you can give it — source code, a screenshot, a description, or a live URL/local HTML file — and grades each finding by severity. It walks the four POUR principles (Perceivable, Operable, Understandable, Robust), combines automated checks with manual walkthroughs, and emits a structured report with a remediation per issue. It diagnoses and grades; when a fix means writing code, it hands off to the `accessible-components` skill.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "audit accessibility"
- "check a11y"
- "is this accessible"
- "WCAG audit"
- "check color contrast"
- "accessibility review before handoff"

## How to use it
- **Just ask:** "Audit the accessibility of this checkout component," "Check the color contrast of #777 on white," or "Run a WCAG audit on https://example.com before we ship."
- **Via command:** `/ux-audit` drives accessibility-audit (the ux-audit pass consolidates it into one report). You can also trigger it directly by asking.
- **Typical flow:**
  1. Pick a mode from your input (code, screenshot, description, or live URL/file) and state which you used.
  2. Work through the POUR checklist in `references/wcag-2.2-aa-checklist.md`, criterion by criterion.
  3. Run automated assists — `contrast.mjs` for color pairs, `axe-scan.mjs` for live pages.
  4. Do the manual checks tools cannot catch (keyboard-only walkthrough, focus order, visible focus, screen-reader names, meaningful sequence, error identification).
  5. Score each finding: Severity (Critical/Serious/Moderate/Minor), mapped WCAG criterion, and a concrete fix.
  6. Compute the summary verdict for AA — Fail, Conditional, or Pass.

## What you get
A structured, severity-scored WCAG 2.2 AA report: a summary table counting Critical/Serious/Moderate/Minor findings, an overall verdict (Fail if any Critical/Serious is open; Conditional if only Moderate/Minor or manual-confirm items; Pass otherwise), findings grouped by severity with criterion number, location, impact, and fix — plus a list of outstanding manual checks.

## Bundled tools
- `node plugin/ux-design/skills/accessibility-audit/scripts/contrast.mjs "#777" "#ffffff"` — prints the contrast ratio (~4.48) and PASS/FAIL across AA/AAA normal & large and UI/non-text thresholds.
- `node plugin/ux-design/skills/accessibility-audit/scripts/axe-scan.mjs <url-or-file>` — runs axe-core via puppeteer if `puppeteer` and `@axe-core/puppeteer` are installed (groups violations by impact); degrades gracefully with install instructions if not.

## Reference files
- `references/wcag-2.2-aa-checklist.md` — the full POUR checklist with criterion numbers and per-criterion test methods, including WCAG 2.2 additions like focus not obscured (2.4.11), dragging movements (2.5.7), target size 24px minimum (2.5.8), consistent help (3.2.6), redundant entry (3.3.7), and accessible authentication (3.3.8).

## Works well with
- Hands code fixes to `accessible-components` for stack-aware remediation.
- Feeds the consolidated `/ux-audit` report alongside other UX checks.
- Pairs with `ux-metrics` — note that a Lighthouse Accessibility (axe) score of 100 covers only ~a third of WCAG and is not a passed audit; run this skill for real conformance.
