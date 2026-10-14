---
name: help
description: This skill should be used when the user asks for help with the self-org plugin — what it does, which skills or commands it ships, how to set up its planning folder (SELF_ORG_HOME, Obsidian, TaskNotes, write permissions), or how to use one of them. Triggers on /self-org:help and phrases like "help with self-org", "what can the planning coach do", "how does the ALPEN skill work", "where are my tasks stored", "how do I set up self-org". With no topic, give the full overview; with a named skill, command, method, or setup topic, explain just that. Do not use for actually setting goals, triaging, or planning — that's the individual skills.
version: 0.1.0
---

# self-org help

Explain the **self-org** plugin to the user — "what can this do?" and "how do I use X?" — without making them read the docs tree. Read-only: never write notes from this skill.

## How to respond

Look at what the user asked for (the argument to `/self-org:help`, or the topic named in natural language):

- **No topic** → give the **full overview** below, then suggest a starting move.
- **A topic** → resolve it with the mapping below, read that item's `docs/<item>.md` (or its `SKILL.md`), and explain just that: what it does, when it triggers, how to invoke it on Claude Code and Codex (`/self-org:<skill>`), and what it writes. If ambiguous, list close matches and ask.

Lead with a one-line answer, keep it skimmable, link rather than dumping file contents.

## Full overview (use when no topic is named)

**self-org** is a self-organization coach that chains three classic methods (credits: `reference/methods.md`):

```
project description ─▶ SMART goals ─▶ Eisenhower triage ─▶ ALPEN day plan ─▶ evening review
```

### Skills (the cross-agent surface)

| Skill | Method | What it does |
|---|---|---|
| `smart-goals` | SMART (Doran) | Project description → 2–4 checked goals + first next actions; also reviews goal progress. Writes `Projects/`, `Goals/`, `Tasks/`. |
| `eisenhower` | Eisenhower matrix (Covey) | Proposes urgent/important per open task, confirms in one batch, records do / schedule / delegate / drop. Edits `Tasks/`. |
| `alpen` | ALPEN (Seiwert) | Plans a day at ~60 % of capacity, cuts by quadrant, writes `Days/YYYY-MM-DD ALPEN.md`; the evening review carries unfinished work forward. |
| `help` | — | This guide. |

Skills trigger from natural language — "turn this into SMART goals", "prioritise my tasks", "plan my day", "review my day".

### Invoking
Each skill is its own slash command on both Claude Code and Codex: `/self-org:smart-goals`, `/self-org:eisenhower`, `/self-org:alpen`, `/self-org:help [topic]`. There are no separate commands or agents.

### Where things are saved
One visible planning folder (by convention `Planning/` in an Obsidian vault), found via `SELF_ORG_HOME` or asked once: `Projects/`, `Goals/`, `Tasks/` (one note per task, TaskNotes-compatible), `Days/`, and a `Planning.base` dashboard (Today, Eisenhower, Goals, Reviews). Nothing is ever deleted. Details: `reference/workspace.md`, `reference/schema.md`; setup: `docs/setup.md`.

### Where to go next
- First time: `docs/setup.md` (set `SELF_ORG_HOME`, allow writes to the folder).
- Typical loop: `smart-goals` once per project → `eisenhower` when tasks pile up → `alpen` every morning, `alpen` review every evening → `smart-goals` review weekly.

## Resolving a named topic

- **"smart", "goal", "objective", "Ziel", "project description"** → `smart-goals` (`docs/smart-goals.md`).
- **"eisenhower", "matrix", "urgent", "important", "prioritise", "triage", "delegate", "drop"** → `eisenhower` (`docs/eisenhower.md`).
- **"alpen", "day", "plan", "today", "tomorrow", "buffer", "60 %", "review", "carry over", "Tagesplanung"** → `alpen` (`docs/alpen.md`).
- **"setup", "SELF_ORG_HOME", "folder", "where", "Obsidian", "Bases", "TaskNotes", "permissions", "iCloud"** → `docs/setup.md`, `reference/workspace.md`, `reference/schema.md`.
- **"credits", "who invented", "source"** → `reference/methods.md`.
- **"commands", "how do I invoke"** → `docs/commands.md`.
