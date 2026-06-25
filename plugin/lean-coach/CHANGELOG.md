# Changelog — lean-coach

All notable changes to the **lean-coach** plugin.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the plugin manifest uses [Semantic Versioning](https://semver.org/). Releases are tagged `lean-coach-vX.Y.Z`. Marketplace-wide and cross-cutting changes are tracked in the [repo changelog](../../CHANGELOG.md).

## [Unreleased]

## [0.1.0] — 2026-06-24

### Added

- **Initial release.** A Lean business-development coach built on Ash Maurya's _Running Lean_, shipping for **Claude Code** and **Codex**. Concept: "one coach, many hats" — guide a venture through the methodology (document Plan A → identify the riskiest parts → systematically test) and role-play the people you test it with, then debrief.
- **Nine skills** (the cross-agent surface) under [`skills/`](skills/): `lean-coach` (navigator), `lean-canvas` (9-block Lean Canvas), `prioritize-risks` (rank riskiest assumptions), `customer-interview` (Problem/Solution/MVP interview role-play), `investor-pitch` (investor stress-test role-play), `run-experiment` (Build-Measure-Learn experiments), `measure-fit` (funnels, cohorts, Sean Ellis test, product/market fit), `lean-roles` (persona front door), and `help`.
- **Five commands** (Claude Code conveniences) under [`commands/`](commands/): `/lean-coach`, `/lean-canvas`, `/lean-interview`, `/lean-role`, `/lean-help` — each driving the matching skill.
- **`lean-mentor` agent** ([`agents/lean-mentor.md`](agents/lean-mentor.md)) — a one-shot scored review of the venture's `.lean/` workspace (stage honesty, riskiest assumptions, weak canvas blocks, next experiment). On Codex the Mentor role lives in the `lean-roles` skill.
- **Role-play personas** — Customer, Investor, Devil's advocate, Business partner, Mentor — defined with a shared role-play protocol (in-character rehearsal → break character with `[square brackets]` → out-of-character debrief) in [`reference/roles.md`](reference/roles.md).
- **Shared references** under [`reference/`](reference/): `methodology.md` (the Running Lean spine), `roles.md` (the persona catalog + protocol), `workspace.md` (the `.lean/` layout).
- **The `.lean/` workspace** — a gitignored, host-independent directory persisting the canvas, risks, interviews, experiments, pitch artifacts, metrics, and progress, so the coach continues across sessions.
- **Docs** — per-skill usage guides under [`docs/`](docs/README.md).
- **Credits & trademark notice** ([`NOTICE`](NOTICE) and the README's *Credits & trademarks* section) — credits Ash Maurya and the methodology's authors, acknowledges the "Lean Canvas" / "Lean Startup" / "Business Model Canvas" trademarks (used nominatively), and states the plugin is unofficial and not affiliated with or endorsed by them.
