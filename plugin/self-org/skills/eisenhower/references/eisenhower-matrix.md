# Eisenhower matrix — heuristics and quadrant rules

Used by the `eisenhower` skill (step 3) and by `alpen`'s inline pass in step E. Origin and what the plugin adapts: `../../../reference/methods.md`.

## The quadrants

| | **Urgent** | **Not urgent** |
|---|---|---|
| **Important** | **Q1 — Do.** Deadlines, real crises, things others are blocked on. `priority: high` | **Q2 — Schedule.** Goal work, preparation, relationships, health, improvement. `priority: normal` |
| **Not important** | **Q3 — Delegate** (or do quickly / schedule / drop). Interruptions, many requests, some meetings. `priority: low` | **Q4 — Drop.** Busywork, habit, "might be nice". `priority: none`, `status: dropped` |

## Is it urgent?

Urgent means **the consequence of not acting lands soon** — not that it feels pressing.

Mark `urgent: true` if any of these hold:

1. `due` (or a hard external date mentioned in the task) falls within the **urgency window**: the next **3 workdays** by default, or `Urgent within:` from `<root>/AGENTS.md`.
2. **Someone is blocked or waiting** on it right now (a reviewer, a customer, a colleague's next step).
3. **A window closes** soon: an offer expires, a slot is only available this week, a cost rises after a date.

Otherwise `urgent: false`. "It's been on the list for ages" and "someone asked loudly" are not urgency by themselves.

## Is it important?

Important means **it matters whether it ever gets done** — by the user's own goals and obligations, not by someone else's urgency.

Mark `important: true` if any of these hold:

1. It links to an **active goal** (`goal:`) or an **active project** (`projects:`) and moves it forward.
2. **Real cost if it's never done:** health, money, legal or contractual obligations, commitments to people the user cares about.
3. It **prevents future Q1 crises** (maintenance, preparation, a conversation that unblocks later work).

Otherwise `important: false`. Test question: *would the user put this on their own list if nobody had asked?*

If you genuinely can't tell (no links, no due date, vague title), say "unclear" in the proposal table and let the user decide — don't guess silently.

## Follow-up rules (step 5)

- **Q1 Do** — priority high; offer to schedule today. More than about a day's worth of Q1 means overload: name it, and ask which items can be renegotiated (a later due date is a legitimate outcome).
- **Q2 Schedule** — priority normal; every Q2 task leaves with a `scheduled` date. Spread them over the coming days; respect `due`. Covey's point: Q2 shrinks Q1 over time, but only if it's actually booked.
- **Q3 Delegate** — priority low; `delegatedTo` names a person, and a `scheduled` date marks when to check back. Solo users often have nobody to delegate to — then *do quickly* (≤ ~15 min), *schedule a short slot*, or *drop*.
- **Q4 Drop** — confirm once per batch, then `status: dropped`. Dropping is a decision, not a failure; the note stays in the vault.

## Writing the result

Set `urgent`, `important`, and `priority` together; never store a quadrant field (the dashboard derives it). Edit only changed frontmatter fields, set `dateModified`, never touch the body. See `../../../reference/schema.md`.
