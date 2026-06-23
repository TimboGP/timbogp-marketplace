---
description: Scaffold a UX baseline (design tokens, accessible primitives, a11y linting, metrics, and a UX checklist) into the current project, adapted to its stack.
argument-hint: [layers to include/skip, e.g. "tokens only" or "skip metrics"]
allowed-tools: [Read, Glob, Grep, Bash, Edit, Write]
---

# /ux-bootstrap

Lay a coherent UX foundation into the current project. Drive this with the `ux-foundations` skill.

Optional scope from `$ARGUMENTS` (e.g. "tokens only", "skip metrics"). If empty, propose the full baseline.

## Procedure

1. **Detect the stack** using `${CLAUDE_PLUGIN_ROOT}/skills/ux-foundations/references/stack-detection.md`. Report framework, styling approach, and language in one line before writing anything. If no project is detected, fall back to framework-agnostic HTML + CSS custom properties.
2. **Confirm the plan.** List the layers to be added and ask before overwriting any existing files. Honor any scope in `$ARGUMENTS`.
3. **Lay the baseline** (skip any the user opted out of):
   - **Design tokens** → `design-tokens` skill, in the stack's format.
   - **Accessible primitives** → `accessible-components` skill (at minimum Button, Field, Dialog), wired to tokens.
   - **A11y linting** → stack-appropriate linter + script entry, without silencing existing warnings.
   - **Metrics** → `ux-metrics` skill: a minimal Core Web Vitals reporter.
   - **Interaction-feedback defaults** → `interaction-feedback` skill: the empty/loading/error/success pattern + an accessible `aria-live` toast region.
4. **Write `UX-CHECKLIST.md`** at the project root from the `ux-foundations` template, trimmed to what applies.
5. **Summarize** what changed, flag decisions left to the user (e.g. replacing placeholder brand colors), and suggest running `/ux-audit` to baseline the result.

Make small, reversible changes. Show diffs for edits to existing files.
