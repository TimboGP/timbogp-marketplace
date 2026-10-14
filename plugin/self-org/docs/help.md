# Help — `help`

> Explain the plugin — everything it offers, or a specific skill, method, or setup topic.

## What it does
The plugin's built-in guide. With no topic it gives the full overview — the method chain, the three method skills, how to invoke them on each agent, and where notes are saved. With a named skill, method ("ALPEN", "Eisenhower"), or setup topic ("SELF_ORG_HOME", "TaskNotes", "permissions") it explains just that one, reading its `docs/` page, `SKILL.md`, or the shared `reference/` files. It never writes notes.

## When it triggers
- "help with self-org" / "what can the planning coach do?"
- "how does the ALPEN skill work?" / "where are my tasks stored?"
- "how do I set up self-org?"

## How to use it
- **Just ask:** "What can self-org do?" / "How does the Eisenhower skill decide what's urgent?"
- **Explicitly (both agents):** `/self-org:help [topic]`.

## What you get
A skimmable answer: a one-line summary first, then the detail — the full overview, or a focused explanation of the named item (what it does, when it triggers, how to invoke it on Claude Code and Codex, and what it writes).

## Works well with
Points you to the right method skill; the [docs index](README.md), [setup](setup.md), and the [plugin README](../README.md) for more.
