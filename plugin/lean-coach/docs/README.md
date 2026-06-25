# lean-coach — Skill Documentation

How to use each skill in the **lean-coach** plugin. Skills activate automatically based on what you ask for — you rarely need to name them. This directory documents what each does, the phrases that trigger it, and the artifacts it writes to the `.lean/` workspace.

> New here? Start with the [plugin overview](../README.md). Install with `/plugin install lean-coach@timbogp`.

## The idea

**One coach, many hats.** The plugin guides a venture through Ash Maurya's *Running Lean* and steps into the roles you test it against. Two kinds of roles:

- **Guide roles** (the agent stays itself): **Coach** (navigator), **Strategist** (canvas + risk), **Analyst** (experiments + metrics).
- **Role-play roles** (the agent becomes a character, then debriefs): **Customer**, **Investor**, **Devil's advocate**, **Business partner**, **Mentor**.

The methodology spine: **document Plan A → identify the riskiest parts → systematically test**, iterating toward product/market fit. See [`reference/methodology.md`](../reference/methodology.md), [`reference/roles.md`](../reference/roles.md), and [`reference/workspace.md`](../reference/workspace.md).

## Skills

| Skill | Role | Use it to… |
|---|---|---|
| [lean-coach](lean-coach.md) | Coach | Orient: where am I, what's riskiest, what's next |
| [lean-canvas](lean-canvas.md) | Strategist | Build/refine the 9-block Lean Canvas |
| [prioritize-risks](prioritize-risks.md) | Strategist | Rank the riskiest assumptions; pick where to start |
| [customer-interview](customer-interview.md) | Customer | Role-play Problem/Solution/MVP interviews + debrief |
| [investor-pitch](investor-pitch.md) | Investor | Stress-test the pitch & traction story + debrief |
| [run-experiment](run-experiment.md) | Analyst | Falsifiable hypothesis + smallest Build-Measure-Learn test |
| [measure-fit](measure-fit.md) | Analyst | Funnels, cohorts, Sean Ellis test, product/market fit |
| [lean-roles](lean-roles.md) | Partner / Devil / Mentor | Switch persona and run the role-play protocol |
| [help](help.md) | — | Explain the plugin, or a specific item |

## Commands

Slash commands are explicit entry points that drive one or more skills (see [commands.md](commands.md)):

- **`/lean-coach [topic]`** → the navigator (`lean-coach`).
- **`/lean-canvas [idea|path]`** → build/review the canvas (`lean-canvas`).
- **`/lean-interview [problem|solution|mvp]`** → interview role-play (`customer-interview`).
- **`/lean-role [persona]`** → switch persona (`lean-roles`).
- **`/lean-help [topic]`** → the `help` skill.

## Agent

- **[lean-mentor](lean-mentor.md)** — a one-shot subagent that reads the `.lean/` workspace and returns a scored, prioritized "Lean review." Ask for a mentor review, or use `lean-roles` (Mentor) for an interactive version.

## Claude Code & Codex

The plugin ships for **both** named coding agents. Its **skills are the shared, cross-agent surface** — on Codex they're exposed as slash commands (`/lean-coach:lean-canvas`, `/lean-coach:customer-interview`, …) and trigger from natural language on either agent. The `/lean-*` commands and the `lean-mentor` agent are Claude-Code conveniences over those skills; on Codex, invoke the skills directly.

## How skills cooperate

A typical end-to-end loop:

1. **`/lean-coach`** orients you and onboards the `.lean/` workspace.
2. **`/lean-canvas`** documents Plan A on one page.
3. **`prioritize-risks`** finds the riskiest assumption to test first.
4. **`/lean-interview problem`** (then `solution`, then `mvp`) tests it with customers; **`run-experiment`** tests non-interview assumptions.
5. **`measure-fit`** verifies quantitatively whether you've built something people want.
6. Along the way, **`/lean-role`** lets you co-create (business partner), get attacked (devil's advocate), get reviewed (mentor), or **`investor-pitch`** rehearse a raise. The coach keeps you honest about which stage you're really in.
