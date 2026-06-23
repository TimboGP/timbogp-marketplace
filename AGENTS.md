# AGENTS.md - agentic-study-environment

A coding-agent learning harness. The agent acts as a tutor over user-supplied source materials, organized as one or more **sub-projects** - each sub-project targets one topic (a paper, a piece of math, a language, a clinical case load, a programming domain, ...). The framework is domain-agnostic; per-domain refinement happens through **overlays**.

## Language

The default conversational language for all interactions is **English**. To change the default globally across sub-projects, set `Language:` in an optional `.studyenv/AGENTS.md` (read if present). Sub-projects can override with their own `Language:` field. Structural tokens (status legends, field names like `Domain:`/`Language:`/`Status:`, table headers, the plugin's skill names) stay in English regardless - see [`plugin/agentic-study-environment/reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md) for the full rules.

## How the harness works

The harness is shipped as a Claude Code and Codex plugin at [`plugin/agentic-study-environment/`](plugin/agentic-study-environment/). It exposes five lifecycle skills that handle the entire sub-project workflow:

| Trigger phrasing | Skill | What it does |
| --- | --- | --- |
| "bootstrap a project for X", "create a sub-project to learn Y" | `agentic-study-environment:bootstrap` | Mint a new sub-project (`.studyenv/<name>/`, per-project AGENTS.md, CLAUDE.md, and PROGRESS.md); register in `.studyenv/PROGRESS.md` |
| "set curriculum for X" | `agentic-study-environment:set-curriculum` | Build or update the sub-project's `.studyenv/<name>/ai-agent-materials/curriculum.md` from source materials |
| "start session", "let's work on X" | `agentic-study-environment:start-session` | Begin a bracketed learning session (theory / practice / domain-specific types); load the active domain overlay |
| "stop session", "wrap up" | `agentic-study-environment:stop-session` | Update sub-project + `.studyenv/PROGRESS.md`, summarize what was covered |
| "simplify the curriculum", "make it harder", "build up to this paper" | `agentic-study-environment:adjust-level` | Rewrite the curriculum at a different difficulty level - simpler or harder - pulling in external material with strict source labels |

Each skill is self-sufficient and reads the files it needs (PROGRESS.md, sub-project AGENTS.md with CLAUDE.md fallback, the relevant overlay) - there is no protocol duplicated in this file.

**Conventions**, **status legends**, **sub-project layout**, **curriculum format**, and the **language override rules** live in [`plugin/agentic-study-environment/reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md). Domain overlays live alongside at [`plugin/agentic-study-environment/domains/`](plugin/agentic-study-environment/domains/) - currently `coding.md`, `speech-therapy.md`, `legal-documents.md`, and `academic-research.md`.

## Using the plugin

For Claude Code, install via the marketplace (works in any project, no clone required):

```sh
/plugin marketplace add TimboGP/agentic-study-environment
/plugin install agentic-study-environment@timbogp
```

For Codex, the repo-local marketplace catalog lives at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json). From a clone of this repo:

```sh
codex plugin marketplace add .
```

Or, if developing against a local clone:

```sh
claude --plugin-dir ./plugin/agentic-study-environment/
```

See [`plugin/agentic-study-environment/README.md`](plugin/agentic-study-environment/README.md) for full install paths and usage notes.

## Coding-agent parity

This repository's plugins target multiple **named coding agents** — currently **Claude Code** and **Codex**. Keep them at parity: any capability added or updated for one agent must ship for the other in the **same change**, never one without the other.

Concretely, when you touch a plugin:

- **Manifests** — a change to a plugin's `.claude-plugin/plugin.json` must be matched in its `.codex-plugin/plugin.json` (and vice versa). A plugin that ships for one agent ships for both.
- **Marketplace catalogs** — an added entry or a version bump in the Claude Code catalog [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) must be mirrored in the Codex catalog [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json).
- **Capabilities** — skills, overlays, templates, and conventions live in shared directories and already serve both agents; keep any agent-specific surface (e.g. Claude Code `commands/`) matched by an equivalent on the other agent.
- **Docs** — install and usage instructions must show the path for every supported agent.

If a plugin is not yet at parity, that is a gap to close, not a precedent to follow. When a new named coding agent joins the supported set, update this list and bring every plugin up to parity for it.

## Repo layout

```text
/                              <- host project root
  AGENTS.md                    <- this file (repo conventions; canonical)
  CLAUDE.md                    <- compatibility pointer to AGENTS.md
  .agents/plugins/marketplace.json <- Codex marketplace catalog
  README.md
  CONTRIBUTING.md
  plugin/agentic-study-environment/ <- the plugin: skills, overlays, templates, conventions
  .studyenv/                   <- created by `bootstrap`; the entire harness footprint
    PROGRESS.md                <- cross-project tracker (Projects table + Journal)
    AGENTS.md / CLAUDE.md      <- optional global config (default Language, conventions)
    <sub-project>/             <- one directory per learning sub-project
```
