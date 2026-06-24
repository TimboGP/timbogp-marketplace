---
description: Explain the ux-design plugin — everything it offers, or a specific skill, command, agent, or tool if you name one.
argument-hint: [skill|command|agent|tool|topic — optional]
allowed-tools: [Read, Glob, Grep]
---

# /ux-help

Explain the **ux-design** plugin. Drive this with the `help` skill.

Topic: `$ARGUMENTS` (a skill, command, agent, bundled tool, or concept like "tokens" or "accessibility"). If empty, explain everything.

## Procedure

1. **No topic** → give the full overview from the `help` skill: the three modes (guide / measure / implement), every skill, the four `/ux-*` commands plus `/ux-help`, the `ux-reviewer` agent, and the bundled CLI tools — each in a line — then point to `docs/` and suggest a starting command.
2. **A topic** → resolve it to the matching skill/command/agent/tool (see the mapping in the `help` skill), read that item's `docs/<item>.md` (or its `SKILL.md`), and explain just that one: what it does, when it triggers, how to invoke it on both Claude Code and Codex (`/ux-design:<skill>`), and what it produces. If ambiguous, list the close matches and ask which they meant.

Lead with a one-line answer, keep it skimmable, and link rather than dumping file contents.
