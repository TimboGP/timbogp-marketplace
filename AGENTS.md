# AGENTS.md - agentic-study-environment

A coding-agent learning harness. The agent acts as a tutor over user-supplied source materials, organized as one or more **sub-projects** - each sub-project targets one topic (a paper, a piece of math, a language, a clinical case load, a programming domain, ...). The framework is domain-agnostic; per-domain refinement happens through **overlays**.

## Language

The default conversational language for all interactions is **English**. To change the default globally for this project, set `Language:` here. Sub-projects can override with their own `Language:` field. Structural tokens (status legends, field names like `Domain:`/`Language:`/`Status:`, table headers, the plugin's skill names) stay in English regardless - see [`plugin/agentic-study-environment/reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md) for the full rules.

<!-- Language: <BCP 47 tag, e.g. de, es, fr> -->

## How the harness works

The harness is shipped as a Claude Code and Codex plugin at [`plugin/agentic-study-environment/`](plugin/agentic-study-environment/). It exposes five lifecycle skills that handle the entire sub-project workflow:

| Trigger phrasing | Skill | What it does |
| --- | --- | --- |
| "bootstrap a project for X", "create a sub-project to learn Y" | `agentic-study-environment:bootstrap` | Mint a new sub-project (`<name>/`, per-project AGENTS.md, CLAUDE.md, and PROGRESS.md); register in root PROGRESS.md |
| "set curriculum for X" | `agentic-study-environment:set-curriculum` | Build or update the sub-project's `ai-agent-materials/curriculum.md` from source materials |
| "start session", "let's work on X" | `agentic-study-environment:start-session` | Begin a bracketed learning session (theory / practice / domain-specific types); load the active domain overlay |
| "stop session", "wrap up" | `agentic-study-environment:stop-session` | Update sub-project + root PROGRESS.md, summarize what was covered |
| "simplify the curriculum", "make it harder", "build up to this paper" | `agentic-study-environment:adjust-level` | Rewrite the curriculum at a different difficulty level - simpler or harder - pulling in external material with strict source labels |

Each skill is self-sufficient and reads the files it needs (PROGRESS.md, sub-project AGENTS.md with CLAUDE.md fallback, the relevant overlay) - there is no protocol duplicated in this file.

**Conventions**, **status legends**, **sub-project layout**, **curriculum format**, and the **language override rules** live in [`plugin/agentic-study-environment/reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md). Domain overlays live alongside at [`plugin/agentic-study-environment/domains/`](plugin/agentic-study-environment/domains/) - currently `coding.md` and `speech-therapy.md`.

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

## Repo layout

```text
/                              <- host project root (this is where sub-projects accumulate)
  AGENTS.md                    <- this file (host-project conventions; canonical)
  CLAUDE.md                    <- compatibility pointer to AGENTS.md
  .agents/plugins/marketplace.json <- Codex marketplace catalog
  PROGRESS.md                  <- cross-project tracker (Projects table + Journal)
  README.md
  CONTRIBUTING.md
  plugin/agentic-study-environment/ <- the plugin: skills, overlays, templates, conventions
  <sub-project>/               <- created by `bootstrap`
```
