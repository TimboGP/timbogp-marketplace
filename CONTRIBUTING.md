# Contributing

Contributions are welcome. This repo is the **`timbogp`** marketplace — it hosts three independent plugins that share a distribution channel and dev tooling but are otherwise unrelated:

- **`agentic-study-environment`** ([`plugin/agentic-study-environment/`](plugin/agentic-study-environment/)) — a learning harness that turns a coding agent into a tutor over your own source materials.
- **`ux-design`** ([`plugin/ux-design/`](plugin/ux-design/)) — a UX/UI toolkit: usability + accessibility audits, UX metrics, and stack-adaptive scaffolding.
- **`lean-coach`** ([`plugin/lean-coach/`](plugin/lean-coach/)) — a Lean business-development coach over Ash Maurya's _Running Lean_: Lean Canvas, risk prioritization, customer-interview and investor-pitch role-play, experiments, and product/market fit.

Pick the plugin your change belongs to and **keep each PR scoped to one plugin**. If you have an idea or hit something a plugin doesn't handle well, open an issue first; smaller fixes are fine as direct PRs.

If your change adds, renames, or re-versions a plugin, update **all** of its metadata together: both catalogs ([`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) and [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json)) and that plugin's own `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json` — `name`, `version`, and `description` must match across all of them.

## Coding-agent parity

The plugins here target multiple named coding agents — currently **Claude Code** and **Codex**. Keep support at parity: when a change adds or updates a plugin manifest, a marketplace entry, a skill, or install/usage docs for one agent, make the equivalent change for the other in the **same PR**. A plugin should never gain a capability for one agent and silently lack it for the other. Concretely, `.claude-plugin/plugin.json` ↔ `.codex-plugin/plugin.json` and [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) ↔ [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) move together. Codex exposes a plugin's **skills** as slash commands and has no `commands`/`agents` concept, so a Claude-Code command's parity equivalent is the skill it drives. When a new named coding agent is added to the supported set, bring every plugin up to parity for it.

---

## Contributing to `agentic-study-environment`

The goal for this plugin is to grow it into a **wholistic learning environment for all kinds of use cases** — any domain where a learner has source materials and wants a tutor to walk them through it.

### New domain overlays

New overlays under [`plugin/agentic-study-environment/domains/<domain>.md`](plugin/agentic-study-environment/domains/) are the highest-leverage contribution. Each overlay specializes the generic meta-framework for a particular kind of learning — math, language acquisition, music theory and ear training, history, design, the sciences, philosophy, anything where the *shape* of practice and review is recognizably different from coding or speech-therapy.

Follow the shape of the existing overlays:

- [`coding.md`](plugin/agentic-study-environment/domains/coding.md) — practice via stub-file scaffolding; review covers correctness and idiomacy; `/work/` is structured per language tooling (CMake, `pyproject.toml`, …); adds an `onboarding` session type for getting up to speed on an existing codebase.
- [`speech-therapy.md`](plugin/agentic-study-environment/domains/speech-therapy.md) — adds a `simulation` session type for therapist–patient role-play; `/work/` is case-folder shaped; patient profiles live in `source-materials/patients/`.

An overlay should specify, at minimum:

- which session types apply (theory, practice, and any domain-specific types like `simulation`)
- the scaffolding form for practice (stub file? blank prompt? structured worksheet? role-play prompt?)
- what review focuses on for that domain (correctness alone? craft? technique? performance?)
- the `/work/` layout convention
- any additional fields the sub-project's `AGENTS.md` should carry

There's an end-to-end walkthrough at [`domains/ADDING_AN_OVERLAY.md`](plugin/agentic-study-environment/domains/ADDING_AN_OVERLAY.md). Keep overlays additive — they refine the generic core defined in the plugin's [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md) and lifecycle skills, they do not replace them.

### Plugin / framework refinements

Improvements to the lifecycle skills under [`plugin/agentic-study-environment/skills/`](plugin/agentic-study-environment/skills/) — bootstrap, set-curriculum, start-session, stop-session, adjust-level — or to the shared [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md). These touch every sub-project in every host project, so be conservative and explain the motivation in the PR description.

When editing skills, mind the YAML front-matter `description` field — that's what the agent matches against user phrasing to decide whether to invoke the skill. Keep it explicit about *when* to trigger; aim for natural-sounding phrasings the way a user would actually say them.

### Templates

Per-sub-project `AGENTS.md`, `CLAUDE.md`, and `PROGRESS.md` templates live at [`plugin/agentic-study-environment/templates/`](plugin/agentic-study-environment/templates/). Edits here affect every future `bootstrap`.

---

## Contributing to `ux-design`

The goal for this plugin is correct, idiomatic, accessible-by-default UX guidance and scaffolding that adapts to whatever stack the user already has.

### Skills

The nine skills live under [`plugin/ux-design/skills/`](plugin/ux-design/skills/). Skill bodies are imperative and concise; deep detail belongs in each skill's `references/`. The implement skills must read the shared `references/stack-detection.md` in the `ux-foundations` skill (referenced by a relative path so it resolves on both Claude Code and Codex) before generating code, and generated code should prefer the project's existing idioms over introducing new dependencies. As with the other plugin, mind each skill's front-matter `description` — it drives triggering.

### Commands and the agent

Slash commands live in [`plugin/ux-design/commands/`](plugin/ux-design/commands/) (`/ux-audit`, `/ux-bootstrap`, `/ux-onboarding`, `/ux-review`) and the reviewer agent in [`plugin/ux-design/agents/`](plugin/ux-design/agents/). Keep them thin — they should orchestrate the skills, not re-implement them (e.g. `/ux-bootstrap` drives `ux-foundations`, `/ux-onboarding` drives `ux-onboarding`). These are Claude-Code-only conveniences; on Codex, where there is no command/agent concept, users invoke the underlying skills directly, so the real capability must live in a skill.

### Bundled CLI scripts and references

The zero-dependency CLI tools (contrast checker, type-scale generator, SUS scorer, contrast gate) live under their skills' `scripts/` directories and are covered by [`test/scripts.test.mjs`](test/scripts.test.mjs). **Any change to a script's math or exit codes must keep `npm test` and `npm run contrast:check` green** — add or update a test if you change the contract. Accessibility references (WCAG checklist, ARIA patterns) must cite the spec, not invent criteria.

---

## Contributing to `lean-coach`

The goal for this plugin is a faithful, practical coach for Ash Maurya's *Running Lean* — one that guides a venture through the methodology and convincingly role-plays the counterparts a founder tests it against.

### Skills

The nine skills live under [`plugin/lean-coach/skills/`](plugin/lean-coach/skills/). Skill bodies are imperative and concise; deep methodology detail belongs in each skill's `references/` and in the shared [`reference/`](plugin/lean-coach/reference/) (`methodology.md`, `roles.md`, `workspace.md`), referenced by relative path so it resolves on both Claude Code and Codex. As with the other plugins, mind each skill's front-matter `description` — it drives triggering. Keep methodology claims grounded in the source and credited to Ash Maurya; don't present a paraphrased benchmark as the plugin's own invention, and never invent citations.

### Roles and the role-play protocol

The plugin's distinctive surface is its **roles**. New or refined personas go in [`reference/roles.md`](plugin/lean-coach/reference/roles.md) and must follow the shared role-play protocol (Phase 0 set up out of character → Phases 1–2 in character → Phase 3 debrief; break character with `[square brackets]`; never break unprompted). A role-play role must never coach mid-scene — mistakes are debrief material.

### Commands and the agent

Slash commands live in [`plugin/lean-coach/commands/`](plugin/lean-coach/commands/) (`/lean-coach`, `/lean-canvas`, `/lean-interview`, `/lean-role`, `/lean-help`) and the `lean-mentor` agent in [`plugin/lean-coach/agents/`](plugin/lean-coach/agents/). Keep them thin — they orchestrate skills, they don't re-implement them. These are Claude-Code-only conveniences; on Codex the capability must live in a skill.

### The `.lean/` workspace

The plugin reads and writes only inside the host project's `.lean/` directory and never touches the host's own files. Workspace file templates live in the relevant skills' `assets/`. Don't commit a real `.lean/` to this repo — it's gitignored, like `.studyenv/`.

---

## Documentation, examples, clarifications

Better wording, missing edge cases, clearer templates, fixes to inconsistencies between skills, overlays, commands, and docs — welcome for either plugin.

## What does not belong here

- **Personal study sub-projects.** This repo is the harness, not anyone's learning history. Don't commit your own `.studyenv/` directory.
- **Source materials.** Books, papers, exercise sheets, prepared code projects — these are user-supplied per sub-project and stay local.
- **Progress logs.** The harness `.studyenv/PROGRESS.md` and per-sub-project `PROGRESS.md` files are written by the agent during use, not edited as content here.
- **New runtime dependencies for `ux-design`.** The bundled scripts are deliberately zero-dependency; keep them that way.

## Style

- English by default for structural tokens, status legends, field names (`Domain:`, `Language:`, `Status:`), skill names, and table headers. Conversational language is overridable via `Language:` but structural tokens are not.
- Keep skill bodies concise and operational. The audience is an AI agent loading the file when its skill triggers — every sentence should be actionable or load-bearing.
- When in doubt about format, mirror the closest existing file (`skills/bootstrap/SKILL.md` or `domains/coding.md` for the study harness; an existing skill under `plugin/ux-design/skills/` for the UX plugin).

## How to propose

- Larger ideas (a new overlay, a change to the session protocol, a new skill, a new command, a new trigger word): open an issue first so we can align on shape before you write it.
- Smaller fixes (typos, clarifications, a missing example): PR directly.
- Keep PRs focused — one overlay, one skill, or one framework change per PR, and scoped to a single plugin.
