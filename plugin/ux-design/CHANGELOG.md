# Changelog — ux-design

All notable changes to the **ux-design** plugin.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the plugin manifest uses [Semantic Versioning](https://semver.org/). Releases are tagged `ux-design-vX.Y.Z`. Marketplace-wide and cross-cutting changes are tracked in the [repo changelog](../../CHANGELOG.md).

## [Unreleased]

## [0.3.0] — 2026-06-23

### Added

- **Codex support.** `ux-design` now ships for **Codex** as well as Claude Code. Added a Codex plugin manifest ([`.codex-plugin/plugin.json`](.codex-plugin/plugin.json)) and registered the plugin in the repo's Codex catalog ([`.agents/plugins/marketplace.json`](../../.agents/plugins/marketplace.json)). On Codex the plugin's **skills** are the cross-agent surface — exposed as slash commands (`/ux-design:<skill>`) and via natural language; the Claude Code `/ux-*` commands and the `ux-reviewer` agent remain Claude-Code conveniences over those same skills (Codex has no command/agent concept).
- **`ux-onboarding` skill** ([`skills/ux-onboarding/`](skills/ux-onboarding/SKILL.md)) — the onboarding capability (previously only the `/ux-onboarding` command) is now a skill, so it reaches Codex too. The `/ux-onboarding` command delegates to it.

### Changed

- **Portable skill references.** Skills now reference the shared `stack-detection.md` and other bundled files by **relative path** instead of `${CLAUDE_PLUGIN_ROOT}`, so they resolve on both Claude Code and Codex.

## [0.2.0] — 2026-06-23

### Added

- **`/ux-onboarding` command** ([`commands/ux-onboarding.md`](commands/ux-onboarding.md)) — a guided, part-by-part walkthrough of a project's existing UX/design choices and patterns (tokens, components, accessibility, interaction feedback, copy). It surveys the design layer, teaches it one part at a time (explaining, sending you to read the real code, and checking comprehension with questions), then has you **reimplement a smaller recent UX change** of your choosing and reviews it against what the project actually shipped. Familiarization, not scaffolding (`/ux-bootstrap`) or scoring (`/ux-audit`). Brings the command count to four (`/ux-audit`, `/ux-bootstrap`, `/ux-onboarding`, `/ux-review`).

## [0.1.0] — 2026-06-22

Initial release — a second plugin in the `timbogp` marketplace that helps guide, measure, and implement UX best practices. Install with `/plugin install ux-design@timbogp`; per-skill guides in [`docs/`](docs/README.md).

### Added

- **Eight skills** — `ux-foundations`, `ux-audit`, `accessibility-audit`, `ux-metrics`, `design-tokens`, `accessible-components`, `interaction-feedback`, `ux-copy`. Covers scored usability (Nielsen heuristics) and WCAG 2.2 AA accessibility audits, quantitative measures (Core Web Vitals, SUS), and stack-adaptive scaffolding — design tokens, accessible WAI-ARIA APG component patterns (with React/Vue/Svelte/vanilla examples), and interaction-feedback states.
- **Three commands** — `/ux-audit`, `/ux-bootstrap`, `/ux-review`.
- **A `ux-reviewer` agent** — scores a single component or screen across four lenses (usability heuristics, accessibility, visual hierarchy, interaction feedback).
- **Bundled zero-dependency CLI tools** — WCAG contrast checker, modular type-scale generator, SUS scorer, and a design-token contrast gate — covered by a `node:test` suite ([`test/scripts.test.mjs`](../../test/scripts.test.mjs)) and a CI workflow ([`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)).

[Unreleased]: https://github.com/TimboGP/timbogp-marketplace/compare/ux-design-v0.3.0...HEAD
[0.3.0]: https://github.com/TimboGP/timbogp-marketplace/compare/ux-design-v0.2.0...ux-design-v0.3.0
[0.2.0]: https://github.com/TimboGP/timbogp-marketplace/releases/tag/ux-design-v0.2.0
[0.1.0]: https://github.com/TimboGP/timbogp-marketplace/pull/3
