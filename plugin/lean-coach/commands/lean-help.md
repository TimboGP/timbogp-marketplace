---
description: Explain the lean-coach plugin — everything it offers, or a specific skill, command, agent, or role if you name one.
argument-hint: [skill|command|agent|role|topic — optional]
allowed-tools: [Read, Glob, Grep]
---

# /lean-help

Explain the **lean-coach** plugin. Drive this with the `help` skill.

Topic: `$ARGUMENTS` (a skill, command, agent, role, or concept like "canvas", "risk", "product/market fit"). If empty, explain everything.

## Procedure

1. **No topic** → give the full overview from the `help` skill: the "one coach, many hats" concept, the guide roles and role-play personas, every skill, the `/lean-*` commands, the `lean-mentor` agent, and the `.lean/` workspace — each in a line — then point to `docs/` and suggest a starting move.
2. **A topic** → resolve it to the matching skill/command/agent/role (see the mapping in the `help` skill), read that item's `${CLAUDE_PLUGIN_ROOT}/docs/<item>.md` (or its `SKILL.md`), and explain just that one: what it does, when it triggers, how to invoke it on both Claude Code and Codex (`/lean-coach:<skill>`), and what it produces. If ambiguous, list close matches and ask.

Lead with a one-line answer, keep it skimmable, and link rather than dumping file contents.
