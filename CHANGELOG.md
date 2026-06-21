# Changelog

All notable changes to the agentic-study-environment harness will be documented here.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the plugin manifest uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.2.0] — 2026-06-21

### Added

- **`legal-documents` domain overlay** in [`plugin/agentic-study-environment/domains/legal-documents.md`](plugin/agentic-study-environment/domains/legal-documents.md) — official public and legal documents (synonyms `official-documents`, `public-documents`). Prescribed-form drafting scaffolds and analysis frames (case briefs, statute breakdowns, redlines, plain-language rewrites); review focused on substantive accuracy, formal compliance, ambiguity, and citation correctness; per-instrument `/work/drafts/` layout and optional `source-materials/briefs/`. Carries a study-not-legal-advice guardrail with a strict no-fabricated-authority rule. No new session type — `theory` + `practice` (analysis and drafting flavors) cover it.

### Changed

- **Self-contained `.studyenv/` harness root.** All generated files now live under a single `.studyenv/` directory at the host project root — the cross-project tracker (`.studyenv/PROGRESS.md`), each sub-project folder (`.studyenv/<name>/`), and any optional global config (`.studyenv/AGENTS.md` / `.studyenv/CLAUDE.md`). The host project's own files are never read or modified, so the harness footprint is portable: gitignore, delete, zip, or sync it as one folder. See [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md).

### Removed

- **Drop-in/umbrella mode distinction and tracker collision-handling.** Because `.studyenv/PROGRESS.md` is harness-owned it can never collide with a host's own `PROGRESS.md`, so `bootstrap`'s Case A/B/C collision report, the `LEARNING-PROGRESS.md` fallback, and the tracker shape-detection in `bootstrap` / `stop-session` are gone. Global `Language:` and cross-project conventions now live in an optional `.studyenv/AGENTS.md` instead of the host's root `AGENTS.md`.

### Migration

- **Breaking for existing root-level sub-projects.** If you used a pre-`.studyenv/` layout, move each `<name>/` sub-project directory and the cross-project `PROGRESS.md` into a new `.studyenv/` directory at the host root (e.g. `mkdir .studyenv && git mv <name> PROGRESS.md .studyenv/`). New bootstraps create `.studyenv/` automatically.

## [0.1.0] — 2026-06-06

Initial public release. The harness is packaged as a Claude Code plugin under [`plugin/agentic-study-environment/`](plugin/agentic-study-environment/) and is installable via `claude --plugin-dir` for local use, or via a marketplace once added (`/plugin marketplace add TimboGP/agentic-study-environment` → `/plugin install agentic-study-environment@timbogp`).

### Added

- **Plugin packaging.** All harness behaviour ships as a Claude Code plugin at [`plugin/agentic-study-environment/`](plugin/agentic-study-environment/) with manifest at `.claude-plugin/plugin.json`.
- **Self-hosted marketplace manifest** at `.claude-plugin/marketplace.json` exposing this plugin under the marketplace name `timbogp`.
- **Four lifecycle skills** in [`plugin/agentic-study-environment/skills/`](plugin/agentic-study-environment/skills/):
  - `agentic-study-environment:bootstrap` — mint a new learning sub-project.
  - `agentic-study-environment:set-curriculum` — build or update a sub-project's teaching plan, source-faithfully.
  - `agentic-study-environment:start-session` — begin a bracketed learning session.
  - `agentic-study-environment:stop-session` — record progress and summarize.
- **One auxiliary skill**:
  - `agentic-study-environment:adjust-level` — rewrite the curriculum at a different difficulty level (simpler or harder); allowed to pull in external material and training knowledge, with every external addition explicitly labeled.
- **Drop-in–safe cross-project tracker.** `bootstrap` checks the host root's `PROGRESS.md` by shape: if it is not the harness tracker (e.g. a project's own changelog or roadmap), it does not append to it — it reports the mismatch and prompts the user to choose a separate tracker at the canonical fallback name `LEARNING-PROGRESS.md`, augment the existing file in place, or relocate it. `stop-session` resolves the tracker by the same rule (harness-shaped `PROGRESS.md`, else `LEARNING-PROGRESS.md`). See [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md).
- **External-source labeling** convention in [`plugin/agentic-study-environment/reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md) — single source of truth for how the curriculum and other agent-generated artifacts distinguish in-source material from external material. Training knowledge counts as external. Citations must not be invented.
- **Two domain overlays** in [`plugin/agentic-study-environment/domains/`](plugin/agentic-study-environment/domains/):
  - `coding.md` — stub-file scaffolding, idiomacy review, conventional `/work/` layouts.
  - `speech-therapy.md` — therapist–patient simulation sessions with structured debriefs.
- **Templates and shared conventions** under `templates/` and `reference/conventions.md`.
- Repo-level docs: [README.md](README.md), [CONTRIBUTING.md](CONTRIBUTING.md), slim [CLAUDE.md](CLAUDE.md) pointer, [LICENSE](LICENSE) (MIT).
- GitHub issue and PR templates under [`.github/`](.github/).

### Notes

- Smoke testing (`claude --plugin-dir ...`) is recommended before relying on the plugin in production.

[Unreleased]: https://github.com/TimboGP/agentic-study-environment/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/TimboGP/agentic-study-environment/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/TimboGP/agentic-study-environment/releases/tag/v0.1.0
