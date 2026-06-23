# ux-design — Skill Documentation

How to use each skill in the **ux-design** plugin. Skills activate automatically based on what you ask for — you rarely need to name them. This directory documents what each one does, the phrases that trigger it, and the artifacts it produces.

> New here? Start with the [plugin overview](../README.md). Install with `/plugin install ux-design@timbogp`.

## The three modes

The plugin works across three overlapping modes:

- **Guide** — explain the right pattern while you work.
- **Measure** — score what exists, qualitatively and quantitatively.
- **Implement** — scaffold best practices into your actual codebase, adapted to your stack.

## Skills

| Skill | Mode | Use it to… |
|---|---|---|
| [ux-foundations](ux-foundations.md) | Implement | Bootstrap a whole UX baseline into a project |
| [ux-audit](ux-audit.md) | Measure / Guide | Run a scored usability (heuristics) audit |
| [accessibility-audit](accessibility-audit.md) | Measure | Run a scored WCAG 2.2 AA audit |
| [ux-metrics](ux-metrics.md) | Measure | Set up Core Web Vitals, analytics, and SUS scoring |
| [design-tokens](design-tokens.md) | Implement | Scaffold or refactor a design token system |
| [accessible-components](accessible-components.md) | Implement | Scaffold accessible UI patterns + a11y linting |
| [interaction-feedback](interaction-feedback.md) | Implement / Guide | Add loading / empty / error / success states & toasts |
| [ux-copy](ux-copy.md) | Guide | Write or review microcopy, errors, CTAs |

## Commands

Slash commands are explicit entry points that drive one or more skills:

- **`/ux-audit [path\|url]`** → runs `ux-audit` + `accessibility-audit`, producing one consolidated scored report.
- **`/ux-bootstrap`** → runs `ux-foundations`, which orchestrates `design-tokens`, `accessible-components`, `interaction-feedback`, and `ux-metrics`.
- **`/ux-onboarding [path\|area]`** → a guided, part-by-part walkthrough of the project's existing UX/design choices and patterns, ending in a reimplement-a-recent-change exercise. Familiarization, not scaffolding or scoring.
- **`/ux-review [file\|url]`** → launches the `ux-reviewer` agent for a fast, scored review of a single artifact.

## Agent

- **`ux-reviewer`** — a specialized subagent that scores a single component or screen across four lenses (usability heuristics, accessibility, visual hierarchy, interaction feedback) from code, a screenshot, or a live page. Invoked by `/ux-review`, or ask to "review this component".

## How skills cooperate

Joining a codebase someone else built? Start with **`/ux-onboarding`** — it walks you through the existing design layer part by part and has you reimplement a recent change, so the loop below starts from understanding rather than guesswork.

A typical end-to-end loop:

1. **`/ux-bootstrap`** lays the foundation (`ux-foundations` → tokens, primitives, a11y lint, metrics).
2. You build features, with `accessible-components`, `interaction-feedback`, and `ux-copy` guiding the implementation.
3. **`/ux-audit`** measures the result (`ux-audit` + `accessibility-audit`), and `ux-metrics` tracks it quantitatively over time.
4. **`/ux-review`** gives quick feedback on individual artifacts along the way.
