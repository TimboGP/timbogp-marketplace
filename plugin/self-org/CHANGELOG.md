# Changelog — self-org

All notable changes to the **self-org** plugin.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the plugin manifest uses [Semantic Versioning](https://semver.org/). Releases are tagged `self-org-vX.Y.Z`. Marketplace-wide and cross-cutting changes are tracked in the [repo changelog](../../CHANGELOG.md).

## [Unreleased]

## [0.1.0] — 2026-10-14

### Added

- **Initial release.** A self-organization coach shipping for **Claude Code** and **Codex** that chains three methods into one interactive loop: project description → SMART goals → Eisenhower triage → ALPEN day plan → evening review.
- **Four skills** (the cross-agent surface) under [`skills/`](skills/): `smart-goals` (project description → checked SMART goals and next actions; goal review mode), `eisenhower` (batch urgent/important triage → do / schedule / delegate / drop), `alpen` (A-L-P-E day planning at a 60 % planned share, and the N evening review with carry-over and estimate calibration), and `help`.
- **No separate commands or agents** — every skill is its own slash command on both agents (`/self-org:smart-goals`, `/self-org:eisenhower`, `/self-org:alpen`, `/self-org:help`). Claude Code namespaces plugin commands, so a help command would only have duplicated `/self-org:help`.
- **The planning folder** — a visible (non-dot) folder, found via a named path, `SELF_ORG_HOME`, or the current folder, so it can live in an Obsidian vault: `Projects/`, `Goals/`, `Tasks/`, `Days/`, and a `Planning.base` dashboard (Obsidian core Bases: Today, Eisenhower, Goals, Reviews; table views only, compatible with Obsidian 1.10+). Rules in [`reference/workspace.md`](reference/workspace.md): created lazily, edit-in-place, never delete, absolute dates, vault-unique note names, a shared "asking the user" protocol with a numbered-list fallback for agents without a structured-question tool.
- **TaskNotes-compatible task notes** — one note per task using TaskNotes' default fields (`tags: [task]`, `status`, `priority`, `due`, `scheduled`, `timeEstimate`, `projects`, …) plus custom `goal`, `urgent`, `important`, `delegatedTo`, and a `dropped` status; the Eisenhower quadrant is derived, never stored. Schema in [`reference/schema.md`](reference/schema.md).
- **Shared references** under [`reference/`](reference/): `workspace.md`, `schema.md`, `methods.md` (method summaries and the single place for credits); shared templates under [`templates/`](templates/) (`task.md`, `project.md`, `planning.base`).
- **Docs** — per-skill usage guides and a setup guide (environment variable, write permissions per agent, iCloud, Obsidian, adopting TaskNotes) under [`docs/`](docs/README.md).
- **Credits & trademark notice** ([`NOTICE`](NOTICE) and the README) — credits Doran, Eisenhower/Covey, and Seiwert; states the plugin is unofficial and not affiliated with FranklinCovey, Obsidian, or TaskNotes.
