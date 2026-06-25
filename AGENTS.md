# AGENTS.md — timbogp marketplace

This repository is the **`timbogp`** marketplace: a curated catalog of Claude Code plugins (also published for Codex). It currently hosts **three plugins**, which are independent of each other — the marketplace is just the shared distribution channel and the place their dev tooling lives.

| Plugin | Directory | What it is |
| --- | --- | --- |
| `agentic-study-environment` | [`plugin/agentic-study-environment/`](plugin/agentic-study-environment/) | A coding-agent learning harness — structured tutor sessions over user-supplied source materials, with swappable domain overlays. |
| `ux-design` | [`plugin/ux-design/`](plugin/ux-design/) | A UX/UI toolkit — scored usability + accessibility audits, UX metrics, and stack-adaptive scaffolding (skills, commands, an agent, and zero-dependency CLI tools). |
| `lean-coach` | [`plugin/lean-coach/`](plugin/lean-coach/) | A Lean business-development coach — guide a venture through Ash Maurya's _Running Lean_ (Lean Canvas, riskiest-assumption testing, customer interviews, experiments, product/market fit) and role-play the customer, investor, devil's-advocate, business-partner, and mentor you test it with. |

Each plugin is independently versioned and self-documenting; work on one rarely touches the other. When working **inside a plugin**, read that plugin's `README.md` (and its `docs/`) first — they carry the operational detail this file intentionally does not duplicate.

## The two catalogs

The marketplace is published in two manifest formats that must stay in sync — when you add, rename, or re-version a plugin, update **both**:

- [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) — the Claude Code catalog (lists all three plugins).
- [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) — the Codex catalog (lists all three plugins).

Each plugin additionally carries its own manifests: `<plugin>/.claude-plugin/plugin.json` (Claude) and `<plugin>/.codex-plugin/plugin.json` (Codex, with an `interface` block). A plugin's `version` and `description` must match across its own two manifests **and** the catalog entries.

## Coding-agent parity

This repository's plugins target multiple **named coding agents** — currently **Claude Code** and **Codex**. Keep them at parity: any capability added or updated for one agent must ship for the other in the **same change**, never one without the other.

Concretely, when you touch a plugin:

- **Manifests** — a change to a plugin's `.claude-plugin/plugin.json` must be matched in its `.codex-plugin/plugin.json` (and vice versa). A plugin that ships for one agent ships for both.
- **Marketplace catalogs** — an added entry or a version bump in the Claude Code catalog [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) must be mirrored in the Codex catalog [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json).
- **Capabilities** — skills, overlays, templates, and conventions live in shared directories and serve both agents. Codex exposes a plugin's **skills** as namespaced slash commands (`plugin:skill`); it has no `commands/` or `agents/` concept, so keep any Claude-Code-only surface (the `commands/` and `agents/` directories) as a thin convenience over skills that work on both agents.
- **Docs** — install and usage instructions must show the path for every supported agent.

If a plugin is not yet at parity, that is a gap to close, not a precedent to follow. When a new named coding agent joins the supported set, update this list and bring every plugin up to parity for it.

## Installing (end users)

For Claude Code — add the marketplace once, then install whichever plugins you want:

```sh
/plugin marketplace add TimboGP/timbogp-marketplace
/plugin install agentic-study-environment@timbogp
/plugin install ux-design@timbogp
```

For Codex — from a clone of this repo:

```sh
codex plugin marketplace add .
```

then open `/plugins`, choose the `TimboGP` marketplace, and install a plugin.

For local development against a single plugin:

```sh
claude --plugin-dir ./plugin/<plugin-name>/
```

The marketplace is named **`timbogp`**; the repo is named `timbogp-marketplace`.

## The agentic-study-environment plugin

A domain-agnostic tutor harness. The agent acts as a tutor over user-supplied source materials, organized as one or more **sub-projects** — each targeting one topic (a paper, a piece of math, a language, a clinical case load, a programming domain, …). Per-domain refinement happens through **overlays**.

It exposes five lifecycle skills that handle the whole sub-project workflow (plus a `help` skill — backed by the `/study-help` command — that explains the harness or any one skill, domain, session type, or convention):

| Trigger phrasing | Skill | What it does |
| --- | --- | --- |
| "bootstrap a project for X" | `agentic-study-environment:bootstrap` | Mint a new sub-project (`.studyenv/<name>/`, per-project AGENTS.md, CLAUDE.md, PROGRESS.md); register in `.studyenv/PROGRESS.md` |
| "set curriculum for X" | `agentic-study-environment:set-curriculum` | Build/update the sub-project's `.studyenv/<name>/ai-agent-materials/curriculum.md` from source materials |
| "start session", "let's work on X" | `agentic-study-environment:start-session` | Begin a bracketed learning session (theory / practice / domain-specific types); load the active overlay |
| "stop session", "wrap up" | `agentic-study-environment:stop-session` | Update sub-project + `.studyenv/PROGRESS.md`, summarize what was covered |
| "simplify the curriculum", "make it harder" | `agentic-study-environment:adjust-level` | Rewrite the curriculum at a different difficulty, pulling in external material with strict source labels |

**Conventions**, **status legends**, **sub-project layout**, **curriculum format**, and the **language override rules** live in [`plugin/agentic-study-environment/reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md). Domain overlays live at [`plugin/agentic-study-environment/domains/`](plugin/agentic-study-environment/domains/) — currently `coding.md` (with an `onboarding` session type), `speech-therapy.md`, `legal-documents.md`, and `academic-research.md`.

All generated learning state lives under a single `.studyenv/` directory at the host project root (gitignored here) — the harness never reads or modifies the host project's own files.

### Language

The default conversational language for all interactions is **English**. To change it globally across sub-projects, set `Language:` in an optional `.studyenv/AGENTS.md` (read if present); sub-projects can override with their own `Language:` field. Structural tokens (status legends, field names like `Domain:`/`Language:`/`Status:`, table headers, skill names) stay in English regardless — see [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md) for the full rules.

## The ux-design plugin

A UX/UI toolkit that works in three modes — **guide**, **measure**, and **implement**. It ships **ten skills** (`ux-foundations`, `ux-onboarding`, `ux-audit`, `accessibility-audit`, `ux-metrics`, `design-tokens`, `accessible-components`, `interaction-feedback`, `ux-copy`, `help`), **five commands** (`/ux-audit`, `/ux-bootstrap`, `/ux-onboarding`, `/ux-review`, `/ux-help`), a `ux-reviewer` agent, and zero-dependency CLI tools (contrast checker, type-scale generator, SUS scorer, contrast gate).

On Codex, the plugin's **skills** are the cross-agent surface (exposed as `/ux-design:<skill>`); the slash commands and the `ux-reviewer` agent are Claude-Code conveniences over them. When generating code, the implement skills first read the shared `references/stack-detection.md` in the `ux-foundations` skill (referenced by relative path so it resolves on both agents) and prefer the project's existing idioms over new dependencies. Full detail: [`plugin/ux-design/README.md`](plugin/ux-design/README.md) and [`plugin/ux-design/docs/`](plugin/ux-design/docs/README.md).

## The lean-coach plugin

A Lean business-development coach built on **Ash Maurya's _Running Lean_** (which adapts Eric Ries, Steve Blank, and Osterwalder). Concept: **one coach, many hats** — it guides a venture through the methodology *and* role-plays the counterparts you test it against, then breaks character to debrief.

It works across the methodology's spine — **document Plan A (Lean Canvas) → identify the riskiest parts → systematically test** (Build-Measure-Learn) — iterating toward product/market fit. It ships **nine skills** (`lean-coach`, `lean-canvas`, `prioritize-risks`, `customer-interview`, `investor-pitch`, `run-experiment`, `measure-fit`, `lean-roles`, `help`), **five commands** (`/lean-coach`, `/lean-canvas`, `/lean-interview`, `/lean-role`, `/lean-help`), and a `lean-mentor` agent.

The **roles** are the distinctive surface — guide roles (Coach, Strategist, Analyst) and role-play personas (Customer, Investor, Devil's advocate, Business partner, Mentor) — defined with a shared role-play protocol (in-character rehearsal → break character with `[square brackets]` → out-of-character debrief) in [`plugin/lean-coach/reference/roles.md`](plugin/lean-coach/reference/roles.md). The methodology spine lives in [`plugin/lean-coach/reference/methodology.md`](plugin/lean-coach/reference/methodology.md).

All venture state persists under a single gitignored **`.lean/`** workspace at the host project root (`canvas.md`, `risks.md`, `experiments/`, `interviews/`, `pitch/`, `metrics/`, `PROGRESS.md`); the plugin owns `.lean/` and never reads or modifies the host project's own files — see [`plugin/lean-coach/reference/workspace.md`](plugin/lean-coach/reference/workspace.md). On Codex the **skills** are the cross-agent surface; the `/lean-*` commands and the `lean-mentor` agent are Claude-Code conveniences over them. Full detail: [`plugin/lean-coach/README.md`](plugin/lean-coach/README.md) and [`plugin/lean-coach/docs/`](plugin/lean-coach/docs/README.md).

## Dev tooling

The repo root carries the shared developer tooling (the plugins themselves are pure markdown / skill definitions and need no build):

- [`package.json`](package.json) — `npm test` runs the `node:test` suite; `npm run contrast:check` runs the design-token contrast gate.
- [`test/scripts.test.mjs`](test/scripts.test.mjs) — black-box tests for ux-design's bundled CLI scripts (key computed values + exit codes).
- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — runs the tests and the contrast gate on push/PR. Zero dependencies to install.

## Repo layout

```text
/                                    <- marketplace root
  AGENTS.md                          <- this file (repo conventions; canonical)
  CLAUDE.md                          <- compatibility pointer to AGENTS.md
  README.md  CONTRIBUTING.md  CHANGELOG.md  LICENSE  PRIVACY.md
  package.json                       <- dev tooling (tests for ux-design's CLI scripts)
  test/                              <- node:test suite for the bundled scripts
  .claude-plugin/marketplace.json    <- Claude Code catalog (all three plugins)
  .agents/plugins/marketplace.json   <- Codex catalog (all three plugins)
  .github/                           <- CI, issue templates, PR template
  plugin/
    agentic-study-environment/       <- study-harness plugin (skills, overlays, templates, conventions, docs)
    ux-design/                       <- UX plugin (skills, commands, agent, docs, bundled scripts)
    lean-coach/                      <- Lean business-dev plugin (skills, commands, agent, reference, docs)
```

## Working in this repo

- **Touch both catalogs together.** Adding/renaming/re-versioning a plugin means editing both `marketplace.json` files plus that plugin's own `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json`; keep `name`, `version`, and `description` consistent across all of them (see *Coding-agent parity* above).
- **Keep changes plugin-scoped.** One plugin per PR where possible; the plugins are independent.
- **Record changes** in the affected plugin's own changelog ([`plugin/agentic-study-environment/CHANGELOG.md`](plugin/agentic-study-environment/CHANGELOG.md) or [`plugin/ux-design/CHANGELOG.md`](plugin/ux-design/CHANGELOG.md)); the root [`CHANGELOG.md`](CHANGELOG.md) tracks marketplace-wide and cross-cutting changes. Plugins are versioned and tagged independently (`<plugin>-vX.Y.Z`).
- See [`CONTRIBUTING.md`](CONTRIBUTING.md) for per-plugin contribution guidance.
