# self-org — Skill Documentation

How to use each skill in the **self-org** plugin. Skills activate automatically based on what you ask for — you rarely need to name them. This directory documents what each does, the phrases that trigger it, and the notes it writes to the planning folder.

> New here? Start with the [plugin overview](../README.md), then [setup](setup.md). Install with `/plugin install self-org@timbogp`.

## The idea

Three classic self-organization methods, chained and made interactive:

```
project description ─▶ SMART goals ─▶ Eisenhower triage ─▶ ALPEN day plan ─▶ evening review
```

- **SMART** decides *what* to achieve — a few checkable goals per project.
- **Eisenhower** decides *which work matters now* — do, schedule, delegate, drop.
- **ALPEN** decides *what fits into today* — and closes the loop each evening.

Everything is saved as plain Markdown notes in one visible planning folder, with TaskNotes-compatible task frontmatter and an Obsidian Bases dashboard. See [`reference/workspace.md`](../reference/workspace.md), [`reference/schema.md`](../reference/schema.md), and the method credits in [`reference/methods.md`](../reference/methods.md).

## Skills

| Skill | Method | Use it to… |
|---|---|---|
| [smart-goals](smart-goals.md) | SMART | Turn a project description into 2–4 checked goals and first next actions; review goal progress |
| [eisenhower](eisenhower.md) | Eisenhower matrix | Triage open tasks into do / schedule / delegate / drop |
| [alpen](alpen.md) | ALPEN | Plan a realistic day (60 % rule) and review it in the evening |
| [help](help.md) | — | Explain the plugin, or a specific item |

## Invoking the skills

There are no separate commands: each skill is its own slash command — `/self-org:smart-goals`, `/self-org:eisenhower`, `/self-org:alpen`, `/self-org:help` — or just ask in natural language. See [commands.md](commands.md).

## Claude Code & Codex

The plugin ships for **both** named coding agents. Its **skills are the shared, cross-agent surface** — they're exposed as the same slash commands (`/self-org:alpen`, …) and trigger from natural language on either agent; the plugin has no Claude-Code-only surface. Interviews use the agent's structured-question tool when it has one and fall back to numbered lists otherwise.

## How skills cooperate

A typical rhythm:

1. **Once per project:** `smart-goals` — paste the project description, pick and sharpen 2–4 goals, accept a few next actions.
2. **When tasks pile up:** `eisenhower` — triage everything unclassified in one batch; Q2 tasks get dates.
3. **Every morning (or the evening before):** `alpen` — gather, estimate, keep 40 % buffer, cut by quadrant, write the day note.
4. **Every evening:** `alpen` review — done / partial / not done, carry-overs, estimate accuracy.
5. **Weekly:** `smart-goals` review — update each goal's current value and status.

Open `Planning.base` in Obsidian for the Today, Eisenhower, Goals, and Reviews views.
