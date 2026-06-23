# ux-design

Guide, measure, and implement UX best practices in Claude Code and Codex.

This plugin works across three modes:

1. **Guide** — explain the right pattern while you work (`ux-audit`, `ux-copy`, `interaction-feedback`).
2. **Measure** — score what exists, qualitatively and quantitatively (`ux-audit`, `accessibility-audit`, `ux-metrics`).
3. **Implement** — scaffold best practices into your actual codebase, adapted to your stack (`ux-foundations`, `design-tokens`, `accessible-components`, `interaction-feedback`).

## Install

For **Claude Code**, install from the [`timbogp`](https://github.com/TimboGP/timbogp-marketplace) marketplace:

```sh
/plugin marketplace add TimboGP/timbogp-marketplace
/plugin install ux-design@timbogp
```

For **Codex**, install from a clone of the repo via the Codex catalog at [`.agents/plugins/marketplace.json`](../../.agents/plugins/marketplace.json):

```sh
codex plugin marketplace add .
```

**Per-agent surface.** The plugin's **skills** are the shared, cross-agent surface — on Codex they appear as slash commands (`/ux-design:ux-audit`, `/ux-design:ux-onboarding`, …) and trigger from natural language on both agents. The Claude Code `/ux-*` commands and the `ux-reviewer` agent are Claude-Code conveniences that orchestrate those same skills; Codex has no command/agent concept, so there you invoke the skills directly.

Per-skill usage guides live in [`docs/`](docs/README.md).

## Quick start

```sh
/ux-bootstrap          # lay a UX baseline into the current project
/ux-onboarding         # get walked through this project's UX/design patterns
/ux-audit ./index.html # score an existing page
/ux-review ./Button.tsx
```

Or just ask in natural language — skills trigger automatically:
- "audit this page for accessibility"
- "walk me through how this app does UX"
- "set up design tokens for this project"
- "make this modal accessible"
- "add proper loading and error states to this form"
- "rewrite this error message"

## Skills

- **`ux-foundations`** — orchestrates a full baseline (tokens + accessible primitives + a11y lint + metrics + `UX-CHECKLIST.md`). Owns `references/stack-detection.md`, the shared stack-detection convention.
- **`ux-onboarding`** — guided, part-by-part walkthrough of an existing project's UX/design patterns, ending in a reimplement-a-recent-change exercise. Familiarization, not scaffolding or scoring.
- **`ux-audit`** — Nielsen's 10 heuristics + IA + task-flow review → scored report.
- **`accessibility-audit`** — WCAG 2.2 AA, per-criterion severity scoring. Bundled zero-dep contrast checker.
- **`ux-metrics`** — Core Web Vitals, Lighthouse/axe scores, analytics event taxonomy, SUS survey scoring.
- **`design-tokens`** — scaffold/refactor tokens (color, type, space, radius, shadow, motion); migrate hardcoded values.
- **`accessible-components`** — accessible patterns (dialog, tabs, menu, combobox, disclosure, fields, tooltip) + a11y linting.
- **`interaction-feedback`** — empty/loading/error/success states, `aria-live` toasts, inline validation, optimistic UI, reduced-motion.
- **`ux-copy`** — microcopy, error messages, empty states, CTAs, voice & tone.

## Bundled tools (run standalone)

```sh
node skills/accessibility-audit/scripts/contrast.mjs "#777" "#ffffff"
node skills/design-tokens/scripts/type-scale.mjs 16 1.25
node skills/ux-metrics/scripts/sus-score.mjs 4 2 5 1 5 1 4 2 5 1
```

## Conventions

- Skill bodies are imperative and concise; deep detail lives in each skill's `references/`.
- Implement skills read the shared `references/stack-detection.md` in the `ux-foundations` skill before generating code (referenced by a relative path so it resolves on both Claude Code and Codex).
- Generated code prefers the project's existing idioms over introducing new dependencies.
