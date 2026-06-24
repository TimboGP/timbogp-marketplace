---
description: Explain the agentic-study-environment harness — everything it offers, or a specific skill, domain overlay, session type, or convention if you name one.
argument-hint: [skill|domain|session-type|convention|topic — optional]
allowed-tools: [Read, Glob, Grep]
---

# /study-help

Explain the **agentic-study-environment** learning harness. Drive this with the `help` skill.

Topic: `$ARGUMENTS` (a lifecycle skill, a domain overlay, a session type, or a convention like "tracking", "language", or "curriculum"). If empty, explain everything.

## Procedure

1. **No topic** → give the full overview from the `help` skill: what the harness is, the lifecycle skills and their loop, the four session types and their domain flavors, the domain overlays, and the key conventions (language, status, tracking) — then point to `docs/` and the getting-started steps.
2. **A topic** → resolve it to the matching skill/overlay/type/convention (see the mapping in the `help` skill), read the matching `docs/<skill>.md`, `domains/<name>.md`, or `reference/conventions.md` section, and explain just that one. If ambiguous, list the close matches and ask.

This command only explains — it never creates or edits `.studyenv/` files. If the user actually wants to study, hand off to `bootstrap`, `set-curriculum`, `start-session`, `stop-session`, or `adjust-level`. Lead with a one-line answer, keep it skimmable, and link rather than dumping file contents.
