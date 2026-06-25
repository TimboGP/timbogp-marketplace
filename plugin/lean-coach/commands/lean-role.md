---
description: Put the coach into a specific Lean role — business partner, devil's advocate, mentor, customer, or investor.
argument-hint: [business-partner | devils-advocate | mentor | customer | investor — optional]
allowed-tools: [Read, Write, Edit, Glob, Grep]
---

# /lean-role

Switch the agent into a **role/persona**. Drive this with the `lean-roles` skill.

Role: `$ARGUMENTS`. If empty or "what can you play?", list the cast (one line each from `${CLAUDE_PLUGIN_ROOT}/reference/roles.md`) and ask which.

## Procedure

1. Map the argument to a role:
   - **business-partner** → collaborative co-founder (brainstorm, honest sparring) → `lean-roles`.
   - **devils-advocate** → relentless skeptic (pre-mortem, attack the riskiest assumption) → `lean-roles`.
   - **mentor** → direct advisor (review the model, prioritize next moves) → `lean-roles` (or the `lean-mentor` agent for a one-shot review).
   - **customer** → interview counterpart → hand to `customer-interview`.
   - **investor** → pitch counterpart → hand to `investor-pitch`.
2. Load `.lean/` so the persona engages this venture, then run the **role-play protocol** (`${CLAUDE_PLUGIN_ROOT}/reference/roles.md`): announce entering character, stay in role (honor `[bracket]` breaks), debrief on `debrief`.
3. Capture anything load-bearing into `.lean/risks.md` / `.lean/PROGRESS.md`, then hand back to the coach or route onward.

Name the role on entry so the user always knows whether they're talking to the coach or a character.
