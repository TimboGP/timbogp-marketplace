# UX Onboarding — `ux-onboarding`

> Get familiar with an existing project's UX/design choices and patterns by being walked through the real code.

## What it does
This skill builds a working mental model of **how a project does UX** — its design tokens, component patterns, accessibility conventions, interaction-feedback states, and copy voice. It surveys the design layer, then teaches it **part by part**: explaining each piece, sending you to read the named files yourself, and checking your understanding with questions. It closes by picking a few smaller recent UX/design changes from the project's history and — your interactive pick — having you **reimplement one** in a scratch copy, reviewed against what the project actually shipped. Familiarization, not scaffolding (`ux-foundations`) or scoring (`ux-audit`).

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "walk me through how this app does UX"
- "onboard me onto the design system"
- "explain this project's UI patterns"
- "I'm new to this codebase, show me the design layer"

## How to use it
- **Just ask:** "Walk me through this project's UX patterns" or "Onboard me onto the design system."
- **Via command (Claude Code):** `/ux-onboarding [path|area]` drives this skill.
- **On Codex:** invoke it as `/ux-design:ux-onboarding` or by natural language.
- **Typical flow:**
  1. Detect the stack and survey the design layer (tokens, components, a11y, interaction feedback, copy); skim recent history for candidate changes.
  2. Confirm the path — usually tokens → primitives → composed components → app screens.
  3. Walk it part by part: explain, send you to read the real code, ask comprehension questions, push deeper.
  4. Reimplement a recent change of your choosing in a scratch copy; review against what shipped.
  5. Wrap up with what was covered and suggest `/ux-audit` or `/ux-review` next.

## What you get
A guided tour of the project's design layer, comprehension checks along the way, and a hands-on reimplementation exercise — read-only against the real codebase, with your work kept in a scratch copy.

## Works well with
Run it when joining a codebase, then use `ux-audit` / `accessibility-audit` to score what you now understand, or the specialized implement skills (`design-tokens`, `accessible-components`, `interaction-feedback`, `ux-copy`) when you start making changes for real.
