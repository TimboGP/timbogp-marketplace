# Help — `agentic-study-environment:help` · `/study-help`

> Explain the harness — everything it offers, or a specific skill, domain overlay, session type, or convention if you name one.

## What it does
The plugin's built-in guide. Asked with no topic, it gives the full overview — what the harness is, the lifecycle skills and their loop, the four session types and their domain flavors, the domain overlays, and the key conventions (language, status, tracking). Asked about a specific item, it explains just that one, reading the matching `docs/` page, `domains/<name>.md`, or `reference/conventions.md` section. It never creates or edits `.studyenv/` files — it only explains.

## When it triggers
Skills activate automatically based on your request. This one triggers on questions about the harness *itself* (not requests to study something):
- "help with agentic-study-environment", "what can the study harness do", "how does this plugin work"
- "list the study skills", "how do I use set-curriculum"
- "what domains are there", "explain the session types", "what's tracking local-only"
- the `/study-help` command

## How to use it
- **Just ask:**
  - "What can the study harness do?" → full overview.
  - "How does set-curriculum work?" → focused explanation, reading `docs/set-curriculum.md`.
  - "What domain overlays ship?" → the overlay overview from `docs/domains.md`.
  - "What's the difference between a session type and a flavor?" → the rule from `reference/conventions.md`.
- **Or run the command:**
  - `/study-help` → everything.
  - `/study-help adjust-level` → just that skill.
  - `/study-help tracking` → the `global` vs `local-only` convention.

## Notes & tips
- **Explains, doesn't do.** To actually study, hand off to `bootstrap`, `set-curriculum`, `start-session`, `stop-session`, or `adjust-level`.
- **Cross-agent.** On Codex it's `/agentic-study-environment:help`; the `/study-help` command is the Claude Code convenience over it.
- **Read-only.** This skill touches no files — safe to call anytime to get your bearings.
