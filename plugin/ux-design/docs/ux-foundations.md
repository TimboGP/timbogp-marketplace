# UX Foundations — `ux-foundations`

> Bootstrap a coherent UX baseline in a project, adapted to whatever stack is already present.

## What it does
This skill is the orchestrator that establishes a UX baseline in a new or existing repo. It detects the project's stack, then lays down five layers: design tokens, accessible base primitives, a11y linting, lightweight Core Web Vitals metrics, and interaction-feedback defaults. It owns the shared **stack-detection** convention that every other implement skill reuses, and it writes a durable `UX-CHECKLIST.md` the team applies on every PR.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "bootstrap UX best practices"
- "set up our UX foundations"
- "scaffold a design system starting point"
- "establish UX standards for this repo"

## How to use it
- **Just ask:** "Bootstrap UX best practices for this project", "Set up our UX foundations", or "Establish UX standards for this repo."
- **Via command:** `/ux-bootstrap` drives this skill (and the implement skills it delegates to).
- **Typical flow:**
  1. Detect the stack (framework, styling approach, token output format, TypeScript yes/no); fall back to framework-agnostic HTML + CSS custom properties if nothing is found.
  2. Confirm scope — state a short plan, let the user opt out of any layer, never overwrite without a diff.
  3. Lay the baseline: design tokens, accessible primitives (Button, Field, Dialog), a11y linting, lightweight metrics, interaction-feedback defaults.
  4. Write `UX-CHECKLIST.md` at the project root, trimmed to what applies.
  5. Summarize what changed and suggest the next step (usually `/ux-audit`).

## What you get
A stack-appropriate UX baseline: a design token source of truth, accessible base primitives wired to tokens, a11y lint config plus a script entry, a minimal Core Web Vitals reporter, interaction-feedback patterns, and a project-root `UX-CHECKLIST.md`.

## Reference files
- `references/stack-detection.md` — the canonical, shared stack-detection procedure that all implement skills (`design-tokens`, `accessible-components`, `interaction-feedback`, `ux-copy`) run before generating code, so output looks native to the project.
- `assets/UX-CHECKLIST.md` — the per-project / per-PR checklist template, covering foundations, accessibility (WCAG 2.2 AA), and interaction feedback.

## Works well with
After bootstrapping, hand off to the specialized implement skills for narrower work: `design-tokens` → `accessible-components` → `interaction-feedback`, plus `ux-copy`. For evaluation rather than setup, run audits via `/ux-audit` (ux-audit + accessibility-audit) or `ux-metrics`.
