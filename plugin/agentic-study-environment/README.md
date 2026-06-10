# agentic-study-environment plugin

A coding-agent plugin that turns the agent into a **structured tutor** over your own source materials. Drop it into any project; the bundled skills handle the full lifecycle of a "learning sub-project" — scaffold, plan, study, record.

## What you get

Four lifecycle skills plus one auxiliary skill:

| Skill | Use when |
| --- | --- |
| `agentic-study-environment:bootstrap` | You want to start studying something new. Scaffolds a new sub-project (`<name>/AGENTS.md`, `<name>/CLAUDE.md`, `<name>/PROGRESS.md`, `<name>/source-materials/`); registers it in the host project's root `PROGRESS.md`. |
| `agentic-study-environment:set-curriculum` | You've added source materials and want an ordered teaching plan. Writes `<name>/ai-agent-materials/curriculum.md` source-faithfully. |
| `agentic-study-environment:start-session` | You want to actively study. Begins a bracketed session (theory / practice / domain-specific types) with the agent as tutor. |
| `agentic-study-environment:stop-session` | You're done for now. Records progress and summarizes. |
| `agentic-study-environment:adjust-level` | The curriculum's level doesn't match your starting point. Rewrites it simpler or harder, allowed to pull in external material with strict labels (every external addition is named so the user knows what came from their source vs. elsewhere). |

Plus two domain overlays:

- [`domains/coding.md`](domains/coding.md) — coding sub-projects: stub-file scaffolding, idiomacy review, conventional `/work/` layouts.
- [`domains/speech-therapy.md`](domains/speech-therapy.md) — speech-therapy / logopedics: therapist–patient simulation sessions with structured debriefs.

Sub-projects without a declared `Domain:` fall back to neutral defaults (theory + practice over markdown notes under `/work/`).

## Install

### Claude Code marketplace

The repo ships its own marketplace manifest at the repo root, so users can add it as a marketplace and install the plugin in two commands inside Claude Code:

```
/plugin marketplace add TimboGP/agentic-study-environment
/plugin install agentic-study-environment@timbogp
```

The marketplace is named `timbogp`; the plugin is named `agentic-study-environment`. From then on, the lifecycle skills are available from any conversation in the project where you ran the install.

### Codex marketplace

The repo also ships a Codex marketplace catalog at `.agents/plugins/marketplace.json`. From a clone of this repo, run:

```
codex plugin marketplace add .
```

Then open `/plugins` in Codex, choose the `TimboGP` marketplace, and install `agentic-study-environment`.

### From a local clone (development / fork)

```
claude --plugin-dir /path/to/agentic-study-environment/plugin/agentic-study-environment/
```

You can omit the `.claude-plugin/` segment — Claude Code finds the manifest automatically when pointed at the plugin root.

## Usage

Once the plugin is installed, the four skills are available from any conversation in that project. Trigger them with natural phrasing:

1. **Bootstrap:** *"Bootstrap a project called `seam-carver` to study the seam-carving paper, `Domain: coding`."*
2. **Drop materials:** put PDFs / notes / links / prepared code into `seam-carver/source-materials/`.
3. **Set curriculum:** *"Set curriculum for `seam-carver`."*
4. **Study:** *"Start a session on `seam-carver`."* — the agent proposes a topic and session type. Override as you like.
5. **Wrap up:** *"Stop session."* — progress is recorded.

Progress lives in two places:

- The sub-project's `<name>/PROGRESS.md` — Topics, Status, Journal for that sub-project.
- The host project's root `PROGRESS.md` — Projects table + cross-project Journal. Bootstrap creates a row; stop-session mirrors status updates here.

## Conventions

Status legends, sub-project layout, curriculum format, and language override rules live in [`reference/conventions.md`](reference/conventions.md). Skills load that file when they need a specific legend or layout — there is no duplicated convention text across skill bodies.

Quick reference:

- **Topic status:** `introduced` · `exercised` · `reviewed` (record the highest stage reached).
- **Sub-project status:** `created` · `ready` · `in progress` · `blocked` (reason logged) · `stopped` · `finished`.
- **Default conversational language:** English. Override per-sub-project with a `Language:` field (BCP 47 tag). Structural tokens (status legends, skill names, field names) stay English regardless.

## Layout

```
plugin/agentic-study-environment/
  .claude-plugin/plugin.json   ← plugin manifest (name, description, version)
  .codex-plugin/plugin.json    ← Codex plugin manifest (skills + interface metadata)
  README.md                    ← this file
  skills/
    bootstrap/SKILL.md
    set-curriculum/SKILL.md
    start-session/SKILL.md
    stop-session/SKILL.md
  domains/
    coding.md                  ← Domain: coding overlay
    speech-therapy.md          ← Domain: speech-therapy (synonym: logopedics) overlay
  templates/
    sub-project-agents.md      ← rendered into <name>/AGENTS.md by `bootstrap`
    sub-project-claude.md      ← rendered into <name>/CLAUDE.md as a compatibility pointer
    sub-project-progress.md    ← rendered into <name>/PROGRESS.md by `bootstrap`
  reference/
    conventions.md             ← status legends, layout, language rules, curriculum format
```

Skills read shared resources via relative paths from their `SKILL.md` (e.g. a skill at `skills/bootstrap/SKILL.md` references `../../templates/sub-project-agents.md`).

## Contributing

See [CONTRIBUTING.md](https://github.com/TimboGP/agentic-study-environment/blob/main/CONTRIBUTING.md) on GitHub. New domain overlays — math, language acquisition, music theory, history, design, the sciences — are the highest-leverage contribution.
