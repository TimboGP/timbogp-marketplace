# Changelog — agentic-study-environment

All notable changes to the **agentic-study-environment** plugin.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the plugin manifest uses [Semantic Versioning](https://semver.org/). Releases are tagged `agentic-study-environment-vX.Y.Z`. Releases through `0.2.0` predate the per-plugin tag scheme and used the repo-wide `vX.Y.Z` tags (`v0.1.0`, `v0.2.0`). Marketplace-wide and cross-cutting changes are tracked in the [repo changelog](../../CHANGELOG.md).

## [Unreleased]

## [0.4.0] — 2026-06-24

### Added

- **`Tracking: local-only` sub-project option.** A sub-project can now opt out of the cross-project `.studyenv/PROGRESS.md` tracker. `bootstrap` accepts a `Tracking:` input (`global` default, or `local-only`); under `local-only` it skips creating/registering the tracker and records the field in the sub-project's `AGENTS.md`, and `stop-session` reads the field and skips the cross-project mirror without warning. This makes the "drop the harness onto one standalone project" case first-class, alongside the umbrella-of-many-sub-projects default. Absent field = `global`, so existing sub-projects are unaffected. Defined in [`reference/conventions.md`](reference/conventions.md) → *Tracking scope*; documented in [`docs/bootstrap.md`](docs/bootstrap.md).
- **`onboarding` generalized to a cross-domain session type.** The survey → part-by-part walkthrough (with comprehension checks) → reproduce-a-recent-change loop is now a generic protocol in [`reference/conventions.md`](reference/conventions.md) (*Onboarding session protocol (generic)*), available to any overlay that flavors it. `coding` keeps the canonical codebase flavor; `academic-research`, `legal-documents`, and `speech-therapy` inherit/flavor it for paper corpora, legal corpora, and clinical material.
- **`role-play` core session type.** A single in-character type — setup out of character → role-play in character → out-of-character debrief — parameterized by (agent's role, whose work is scrutinized, debrief rubric), with the `[square-bracket]` break-character convention defined once in [`reference/conventions.md`](reference/conventions.md) (*Role-play session protocol (generic)*). Speech-therapy `simulation` and academic-research `defense` are now flavors of it, and `coding` adds new `review` / `interview` flavors (agent as senior reviewer / technical interviewer; artifacts under `work/reviews/<change-id>/`).
- **Type-vs-flavor decision rule** in [`reference/conventions.md`](reference/conventions.md) (*Session types vs. flavors*): a **type** changes the session loop (the four core types are `theory`, `practice`, `role-play`, `onboarding`); a **flavor** keeps the loop and swaps scaffolding + review focus. Includes a worked classification table and guidance for overlay authors.

### Changed

- **De-duplicated the break-character convention and the onboarding/role-play protocol skeletons** into [`reference/conventions.md`](reference/conventions.md); the `coding`, `speech-therapy`, and `academic-research` overlays now reference the canonical protocols and carry only their domain-specific deltas. `start-session`, `stop-session`, `set-curriculum`, [`domains/ADDING_AN_OVERLAY.md`](domains/ADDING_AN_OVERLAY.md), and the per-skill docs were updated to enumerate the four core types and their flavors consistently.

All changes are backward compatible: `simulation`, `defense`, and `onboarding` remain valid curriculum values (now understood as flavors / a generic type), and an absent `Tracking:` field behaves exactly as before.

## [0.3.0] — 2026-06-23

### Added

- **`onboarding` session type for the `coding` overlay** ([`domains/coding.md`](domains/coding.md)) — a guided mode for getting up to speed on an existing codebase you didn't write. The agent surveys the repo, walks it **part by part** (explaining each subsystem, sending you to read the real code, and checking comprehension with questions), then picks a few **smaller recent changes** from the project's history and — your interactive pick — has you **reimplement one**, reviewing it against what the project actually shipped. Wired into `start-session` as a third coding session type alongside `theory`/`practice`, recorded by `stop-session`, and documented in [`reference/conventions.md`](reference/conventions.md) and [`docs/domains.md`](docs/domains.md); artifacts live under `work/onboarding/`.
- **Per-skill documentation** in [`docs/`](docs/README.md) — a usage guide for each lifecycle skill (bootstrap, set-curriculum, start-session, stop-session, adjust-level) plus a [domain-overlays overview](docs/domains.md).

## [0.2.0] — 2026-06-21

### Added

- **`legal-documents` domain overlay** in [`domains/legal-documents.md`](domains/legal-documents.md) — official public and legal documents (synonyms `official-documents`, `public-documents`). Prescribed-form drafting scaffolds and analysis frames (case briefs, statute breakdowns, redlines, plain-language rewrites); review focused on substantive accuracy, formal compliance, ambiguity, and citation correctness; per-instrument `/work/drafts/` layout and optional `source-materials/briefs/`. Carries a study-not-legal-advice guardrail with a strict no-fabricated-authority rule. No new session type — `theory` + `practice` (analysis and drafting flavors) cover it.
- **`academic-research` domain overlay** in [`domains/academic-research.md`](domains/academic-research.md) — the full research lifecycle (synonyms `research`, `scholarship`). Critical-reading and literature-synthesis frames, manuscript/proposal drafting scaffolds, peer-review-report and venue-fit exercises, and review focused on argumentation/contribution, methodological rigor, and citation integrity; flavored `/work/` layout (`reads/`, `lit-reviews/`, `proposals/`, `manuscripts/`, `reviews/`, `venues/`, `defenses/`) and optional `source-materials/papers/` and `source-materials/briefs/`. Carries a scholarly-integrity guardrail with a strict no-fabricated-citations/no-fabricated-data rule and a research-ethics stance. Adds a `defense` session type — the agent role-plays a committee / reviewer panel / Q&A audience and the user defends their work, ending in an out-of-character debrief (a sibling of the speech-therapy `simulation` type, wired into `start-session` and `stop-session`).

### Changed

- **Self-contained `.studyenv/` harness root.** All generated files now live under a single `.studyenv/` directory at the host project root — the cross-project tracker (`.studyenv/PROGRESS.md`), each sub-project folder (`.studyenv/<name>/`), and any optional global config (`.studyenv/AGENTS.md` / `.studyenv/CLAUDE.md`). The host project's own files are never read or modified, so the harness footprint is portable: gitignore, delete, zip, or sync it as one folder. See [`reference/conventions.md`](reference/conventions.md).

### Removed

- **Drop-in/umbrella mode distinction and tracker collision-handling.** Because `.studyenv/PROGRESS.md` is harness-owned it can never collide with a host's own `PROGRESS.md`, so `bootstrap`'s Case A/B/C collision report, the `LEARNING-PROGRESS.md` fallback, and the tracker shape-detection in `bootstrap` / `stop-session` are gone. Global `Language:` and cross-project conventions now live in an optional `.studyenv/AGENTS.md` instead of the host's root `AGENTS.md`.

### Migration

- **Breaking for existing root-level sub-projects.** If you used a pre-`.studyenv/` layout, move each `<name>/` sub-project directory and the cross-project `PROGRESS.md` into a new `.studyenv/` directory at the host root (e.g. `mkdir .studyenv && git mv <name> PROGRESS.md .studyenv/`). New bootstraps create `.studyenv/` automatically.

## [0.1.0] — 2026-06-06

Initial public release. The harness is packaged as a Claude Code plugin under [`plugin/agentic-study-environment/`](.) and is installable via `claude --plugin-dir` for local use, or via a marketplace once added (`/plugin marketplace add TimboGP/timbogp-marketplace` → `/plugin install agentic-study-environment@timbogp`).

### Added

- **Plugin packaging.** All harness behaviour ships as a Claude Code plugin with manifest at `.claude-plugin/plugin.json`.
- **Self-hosted marketplace manifest** at the repo's `.claude-plugin/marketplace.json` exposing this plugin under the marketplace name `timbogp`.
- **Four lifecycle skills** in [`skills/`](skills/):
  - `agentic-study-environment:bootstrap` — mint a new learning sub-project.
  - `agentic-study-environment:set-curriculum` — build or update a sub-project's teaching plan, source-faithfully.
  - `agentic-study-environment:start-session` — begin a bracketed learning session.
  - `agentic-study-environment:stop-session` — record progress and summarize.
- **One auxiliary skill**:
  - `agentic-study-environment:adjust-level` — rewrite the curriculum at a different difficulty level (simpler or harder); allowed to pull in external material and training knowledge, with every external addition explicitly labeled.
- **Drop-in–safe cross-project tracker.** `bootstrap` checks the host root's `PROGRESS.md` by shape: if it is not the harness tracker (e.g. a project's own changelog or roadmap), it does not append to it — it reports the mismatch and prompts the user to choose a separate tracker at the canonical fallback name `LEARNING-PROGRESS.md`, augment the existing file in place, or relocate it. `stop-session` resolves the tracker by the same rule (harness-shaped `PROGRESS.md`, else `LEARNING-PROGRESS.md`). See [`reference/conventions.md`](reference/conventions.md).
- **External-source labeling** convention in [`reference/conventions.md`](reference/conventions.md) — single source of truth for how the curriculum and other agent-generated artifacts distinguish in-source material from external material. Training knowledge counts as external. Citations must not be invented.
- **Two domain overlays** in [`domains/`](domains/):
  - `coding.md` — stub-file scaffolding, idiomacy review, conventional `/work/` layouts.
  - `speech-therapy.md` — therapist–patient simulation sessions with structured debriefs.
- **Templates and shared conventions** under `templates/` and `reference/conventions.md`.
- Repo-level docs: README, CONTRIBUTING, slim CLAUDE.md pointer, LICENSE (MIT).
- GitHub issue and PR templates under `.github/`.

### Notes

- Smoke testing (`claude --plugin-dir ...`) is recommended before relying on the plugin in production.

[Unreleased]: https://github.com/TimboGP/timbogp-marketplace/compare/agentic-study-environment-v0.4.0...HEAD
[0.4.0]: https://github.com/TimboGP/timbogp-marketplace/compare/agentic-study-environment-v0.3.0...agentic-study-environment-v0.4.0
[0.3.0]: https://github.com/TimboGP/timbogp-marketplace/compare/v0.2.0...agentic-study-environment-v0.3.0
[0.2.0]: https://github.com/TimboGP/timbogp-marketplace/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/TimboGP/timbogp-marketplace/releases/tag/v0.1.0
