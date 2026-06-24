# ux-design help — `help` skill · `/ux-help`

> Explain the plugin — everything it offers, or a specific skill, command, agent, or tool if you name one.

## What it does
The plugin's built-in guide. Asked with no topic, it gives the full overview — the three modes (guide / measure / implement), every skill, the four `/ux-*` commands plus `/ux-help`, the `ux-reviewer` agent, and the bundled CLI tools. Asked about a specific item, it explains just that one in depth, reading its detailed doc or `SKILL.md` and showing how to invoke it on both Claude Code and Codex.

## When it triggers
Skills activate automatically based on your request. This one triggers on:
- "help with ux-design", "what can ux-design do", "how does this plugin work"
- "list the ux-design commands", "what skills are there"
- "how do I use ux-audit", "explain design-tokens", "what's the contrast checker"
- the `/ux-help` command

## How to use it
- **Just ask:**
  - "What can ux-design do?" → full overview.
  - "How do I use the accessibility audit?" → focused explanation of `accessibility-audit` + the bundled `contrast.mjs`.
  - "What's the difference between /ux-audit and /ux-review?" → both, compared.
- **Or run the command:**
  - `/ux-help` → everything.
  - `/ux-help design-tokens` → just the design-tokens skill.
  - `/ux-help accessibility` → resolves the concept to `accessibility-audit` (+ `accessible-components` for building).

## Notes & tips
- **Explains, doesn't do.** For the actual work, the named capability skill runs (e.g. `design-tokens`, `ux-audit`). This skill only orients you.
- **Cross-agent.** On Codex it's `/ux-design:help`; the `/ux-help` command is the Claude Code convenience over it.
- **Topic resolution.** Plain-language topics map to the right item — "tokens" → `design-tokens`, "a11y"/"contrast" → `accessibility-audit`, "states"/"toast" → `interaction-feedback`, "copy" → `ux-copy`, and so on (full map in the skill).
