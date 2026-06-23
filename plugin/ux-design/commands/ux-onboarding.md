---
description: Get familiar with a project's UX/design choices and patterns — a guided, part-by-part walkthrough that sends you to read the real code, checks your understanding with questions, and has you reimplement a small recent change.
argument-hint: [path or area to focus on, e.g. "the design system" or "components/"]
allowed-tools: [Read, Glob, Grep, Bash]
---

# /ux-onboarding

Build a working mental model of **how this project does UX** — design tokens, component patterns, accessibility conventions, interaction-feedback states, and copy voice — by being walked through the real code. Familiarization, not scaffolding (`/ux-bootstrap`) or scoring (`/ux-audit`).

Drive this with the **`ux-onboarding`** skill. Pass any focus from `$ARGUMENTS` (a path, or an area like "tokens" or "the dialog component"); if empty, cover the design layer end to end.

The skill: surveys the design layer (detecting the stack), walks it **part by part** — explaining each piece, sending you to read the named files, and checking comprehension with questions — then picks a few **smaller recent UX changes** from history and, on your interactive pick, has you **reimplement one** in a scratch copy and reviews it against what the project actually shipped. Read-only by default; your reimplementation stays in the scratch copy.

When done, suggest `/ux-audit` (to score what you now understand) or `/ux-review` (to dig into one component) as next steps.
