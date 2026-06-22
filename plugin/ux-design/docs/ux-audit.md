# UX Audit — `ux-audit`

> Run a structured usability review and produce a scored, severity-ranked report.

## What it does
This skill inspects an interface against Nielsen's 10 usability heuristics plus information architecture, task/flow analysis, error prevention and recovery, content hierarchy, and consistency. It records each problem as a finding — heuristic tag, location, observation, user impact, and a concrete recommendation — and rates every finding on Nielsen's 0–4 severity scale. It then produces a scored report (a heuristic scorecard, an overall verdict, and top issues ranked) by filling in the bundled template. It is the qualitative-heuristics counterpart to `ux-metrics` (quantitative behavioral data) and `accessibility-audit` (WCAG conformance), and it judges whether a design is usable for a sighted user completing tasks — it does not measure traffic or certify accessibility.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "audit this UX"
- "run a usability review"
- "do a heuristic evaluation"
- "review this flow" / "review this screen"
- "what's wrong with this UI"
- "is this usable"
- "evaluate this onboarding"

## How to use it
- **Just ask:** "Audit the UX of this checkout flow." / "Run a heuristic evaluation on this screen." / "What's wrong with this onboarding?"
- **Via command:** `/ux-audit` drives this skill together with `accessibility-audit` for a combined engagement.
- **Typical flow:**
  1. Take whatever input is available — screenshots/mockups, a live URL (the richest), a description, or source code — and state what could and couldn't be evaluated.
  2. Read `references/nielsen-heuristics.md`, then inspect each of the 10 heuristics plus IA, task/flow, error prevention, hierarchy, and consistency.
  3. Record each problem as a finding with heuristic tag, location, observation, impact, and recommendation.
  4. Rate every finding 0–4, weighing frequency, impact, and persistence.
  5. Summarize: a heuristic scorecard, an overall usability verdict, and top issues ranked by roughly severity × frequency × impact.
  6. Fill in `assets/audit-report-template.md` and route out-of-scope findings to the right sibling skill.

## What you get
A scored, severity-ranked usability report built from the bundled template: a heuristic scorecard (issues found and worst severity per heuristic), a plain-language overall verdict, ranked top issues, detailed findings, and a quick-wins vs larger-investments prioritization.

## Reference files
- `references/nielsen-heuristics.md` — each of Nielsen's 10 heuristics with what to look for and a common violation, plus the 0–4 severity scale and the three factors (frequency, impact, persistence) behind a rating.
- `assets/audit-report-template.md` — the report template: scope/inputs/method header, summary with heuristic scorecard and ranked top issues, a repeatable findings block (with a hand-off field), and a prioritization section.

## Works well with
- **accessibility-audit** — receives accessibility findings (contrast, focus order, alt text, keyboard traps, ARIA); paired with this skill under `/ux-audit`.
- **ux-copy** — receives copy and microcopy issues (unclear labels, blaming errors, weak CTAs, empty states).
- **interaction-feedback** — receives missing or unhandled states (no loading, empty, error, or success feedback).
- **ux-metrics** — receives quantitative validation (does the data confirm the suspected friction, and where do users actually drop off).
