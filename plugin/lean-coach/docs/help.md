# Help — `help`

> Explain the plugin — everything it offers, or a specific skill, command, agent, or role.

## What it does
The plugin's built-in guide. With no topic it gives the full overview — the "one coach, many hats" concept, the guide roles and role-play personas, every skill, the `/lean-*` commands, the `lean-mentor` agent, and the `.lean/` workspace. With a named skill, command, agent, role, or concept (e.g. "canvas", "risk", "product/market fit") it resolves the topic and explains just that one, reading its `docs/` page or `SKILL.md`.

## When it triggers
- "help with lean-coach" / "what can lean-coach do?"
- "list the lean commands" / "what roles can the coach play?"
- "how do I use customer-interview?" / "explain the lean canvas skill"

## How to use it
- **Just ask:** "What can the lean coach do?" / "How does measure-fit work?"
- **Via command:** `/lean-help [topic]`.

## What you get
A skimmable answer: a one-line summary first, then the detail — the full overview, or a focused explanation of the named item (what it does, when it triggers, how to invoke it on both Claude Code and Codex, and what it produces).

## Works well with
Points you to the right capability skill; the [docs index](README.md) and the [plugin README](../README.md) for more.
