---
name: eisenhower
description: This skill should be used when the user wants to triage or prioritise tasks by urgency and importance — "prioritise my tasks", "what should I focus on?", "Eisenhower matrix", "urgent vs important", "what can I drop or delegate?", "triage my to-do list", "sort my backlog", "Aufgaben priorisieren", "Eisenhower-Matrix". It gathers open, not-yet-triaged task notes plus any tasks the user lists, proposes urgent/important with a one-line reason each, confirms them in one batch, and records the outcome — do, schedule (with a date), delegate (to whom), or drop (status dropped, never deleted) — in TaskNotes-compatible task notes in the self-org planning folder. For fitting tasks into today use alpen; for setting goals use smart-goals.
version: 0.1.0
---

# Eisenhower — triage tasks by urgent and important

Sort open work into four quadrants and record what happens to each task: **Do**, **Schedule**, **Delegate**, or **Drop**. You propose, the user confirms in one batch, you write the result into the task notes. Read `../../reference/workspace.md`, `../../reference/schema.md`, and `references/eisenhower-matrix.md` first. Method background and credits: `../../reference/methods.md`.

## When to use

- The user has a pile of tasks (task notes, a pasted list, "everything on my mind") and wants to know what deserves attention.
- After `smart-goals` created next actions, or before `alpen` when tasks are unclassified (`alpen` can also run a quick pass inline).
- **Re-triage:** "re-prioritise everything" — include already-classified open tasks, since urgency changes as dates approach.

Not for setting goals (`smart-goals`) or deciding what fits into today (`alpen`).

## Core stance

- **Two separate questions.** Judge urgent and important independently; never infer one from the other. Urgency is about *when consequences land*, importance about *whether they matter* (`references/eisenhower-matrix.md`).
- **Goals make things important.** A task linked to an active goal or project is important by default; an unlinked one has to earn it.
- **Q2 is the point.** Important-not-urgent work is where goals move; after every triage, make sure Q2 tasks get a date rather than drifting.
- **Never delete.** Drop means `status: dropped` — the note stays.

## Procedure

1. **Preflight.** Resolve the planning root, read the optional `<root>/AGENTS.md` (`Urgent within:` overrides the urgency window), get today's date — per `workspace.md`.
2. **Collect tasks.** Grep `Tasks/*.md` frontmatter for open tasks (`status` not `done`/`dropped`) that lack `urgent` or `important` (or all open tasks when re-triaging, optionally only one project's). Add any tasks the user lists in the conversation: check for an existing note with the same title first, otherwise create one from `../../templates/task.md` (drop template lines that have no value). If more than ~10 tasks, work in batches of 10, oldest `dateCreated` first.
3. **Propose.** For each task, decide `urgent` and `important` using the heuristics in `references/eisenhower-matrix.md`, with a one-line reason each (due date, who is waiting, which goal/project it serves). Read a task's body only when its title and frontmatter don't decide it.
4. **Confirm in one batch.** Show a table — `# · task · due · urgent (why) · important (why) · → action` — and ask once: *Accept all / Adjust some / One by one* (see *Asking the user* in `workspace.md`). Change only the rows the user corrects.
5. **Follow up per quadrant**, batched by quadrant:
   - **Q1 Do** → `priority: high`; offer `scheduled: <today>` (or the next workday if the day is over).
   - **Q2 Schedule** → `priority: normal`; propose a date for each (before `due` if there is one, otherwise within the next week, spread out rather than stacked) and set `scheduled`.
   - **Q3 Delegate** → `priority: low`; ask who and set `delegatedTo`, plus a `scheduled` follow-up date to check on it. If there's nobody to delegate to, offer: *do quickly* (only if ≤ ~15 min — schedule today with a small `timeEstimate`), *schedule* a short slot, or *drop*.
   - **Q4 Drop** → list them and ask for one confirmation; set `status: dropped`, `priority: none`. Anything the user wants to keep moves to Q2 or Q3 instead.
6. **Write.** For each task, edit only the frontmatter fields that changed (`urgent`, `important`, `priority`, `scheduled`, `delegatedTo`, `status`) and set `dateModified`. Never rewrite the body.
7. **Close.** Show counts per quadrant and the Q2 tasks with their dates. If Q1 holds more than about a day's work, say so: that's firefighting, and some of it needs renegotiating. Offer `alpen` to plan today. List the notes created or changed.

## Output

Every triaged task note carries `urgent`, `important`, and a `priority` matching its quadrant; Q2 tasks have a `scheduled` date, Q3 tasks a `delegatedTo` (or an alternative), Q4 tasks `status: dropped`. The `Eisenhower` view of `Planning.base` groups open tasks by quadrant from these fields.

## Related

- `smart-goals` — creates the goal links that make tasks important.
- `alpen` — fits Q1 and the chosen Q2 tasks into today; uses this skill's heuristics for its inline pass.
- `references/eisenhower-matrix.md` — urgency/importance tests, the quadrant table, and the follow-up rules.
