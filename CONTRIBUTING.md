# Contributing

Contributions are welcome. The goal is to grow this into a **wholistic learning environment for all kinds of use cases** — any domain where a learner has source materials and wants a tutor to walk them through it.

If you have an idea or run into something the framework doesn't handle well, open an issue and let's talk it through. Smaller fixes and additions are fine as direct PRs.

## What contributions look like

### New domain overlays

New overlays under [`plugin/agentic-study-environment/domains/<domain>.md`](plugin/agentic-study-environment/domains/) are the highest-leverage contribution. Each overlay specializes the generic meta-framework for a particular kind of learning — math, language acquisition, music theory and ear training, history, design, the sciences, philosophy, anything where the *shape* of practice and review is recognizably different from coding or speech-therapy.

Follow the shape of the existing overlays:

- [`coding.md`](plugin/agentic-study-environment/domains/coding.md) — practice via stub-file scaffolding; review covers correctness and idiomacy; `/work/` is structured per language tooling (CMake, `pyproject.toml`, …).
- [`speech-therapy.md`](plugin/agentic-study-environment/domains/speech-therapy.md) — adds a `simulation` session type for therapist–patient role-play; `/work/` is case-folder shaped; patient profiles live in `source-materials/patients/`.

An overlay should specify, at minimum:

- which session types apply (theory, practice, and any domain-specific types like `simulation`)
- the scaffolding form for practice (stub file? blank prompt? structured worksheet? role-play prompt?)
- what review focuses on for that domain (correctness alone? craft? technique? performance?)
- the `/work/` layout convention
- any additional fields the sub-project's `AGENTS.md` should carry

Keep overlays additive — they refine the generic core defined in the plugin's [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md) and lifecycle skills, they do not replace them.

### Plugin / framework refinements

Improvements to the lifecycle skills under [`plugin/agentic-study-environment/skills/`](plugin/agentic-study-environment/skills/) — bootstrap, set-curriculum, start-session, stop-session, adjust-level — or to the shared [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md). These touch every sub-project in every host project, so be conservative and explain the motivation in the PR description.

When editing skills, mind the YAML front-matter `description` field — that's what Claude matches against user phrasing to decide whether to invoke the skill. Keep it explicit about *when* to trigger; aim for natural-sounding phrasings the way a user would actually say them.

### Templates

Per-sub-project `AGENTS.md`, `CLAUDE.md`, and `PROGRESS.md` templates live at [`plugin/agentic-study-environment/templates/`](plugin/agentic-study-environment/templates/). Edits here affect every future `bootstrap`.

### Documentation, examples, clarifications

Better wording, missing edge cases, clearer templates, fixes to inconsistencies between the skills and overlays.

## Coding-agent parity

The plugins here target multiple named coding agents — currently **Claude Code** and **Codex**. Keep support at parity: when a change adds or updates a plugin manifest, a marketplace entry, a skill, or install/usage docs for one agent, make the equivalent change for the other in the **same PR**. A plugin should never gain a capability for one agent and silently lack it for the other. Concretely, `.claude-plugin/plugin.json` ↔ `.codex-plugin/plugin.json` and [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) ↔ [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) move together. When a new named coding agent is added to the supported set, bring every plugin up to parity for it.

## What does not belong here

- **Personal sub-projects.** This repo is the harness, not anyone's learning history. Don't commit your own `.studyenv/` directory.
- **Source materials.** Books, papers, exercise sheets, prepared code projects — these are user-supplied per sub-project and stay local.
- **Progress logs.** The harness `.studyenv/PROGRESS.md` and per-sub-project `PROGRESS.md` files are written by the agent during use, not edited as content here.

## Style

- English by default for structural tokens, status legends, field names (`Domain:`, `Language:`, `Status:`), skill names, and table headers. Conversational language is overridable via `Language:` but structural tokens are not.
- Keep skill bodies concise and operational. The audience is an AI agent loading the file when its skill triggers — every sentence should be actionable or load-bearing.
- When in doubt about format, mirror the closest existing file (`skills/bootstrap/SKILL.md` for new skills; `domains/coding.md` or `domains/speech-therapy.md` for new overlays).

## How to propose

- Larger ideas (a new overlay, a change to the session protocol, a new skill, a new trigger word): open an issue first so we can align on shape before you write it.
- Smaller fixes (typos, clarifications, a missing example): PR directly.
- Keep PRs focused — one overlay or one framework change per PR.
