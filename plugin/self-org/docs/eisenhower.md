# Eisenhower — `eisenhower`

> Triage open tasks into do, schedule, delegate, or drop — in one batch.

## What it does
Collects open task notes that haven't been triaged yet (or all open tasks, when you ask to re-prioritise), plus anything you list in the conversation. For each it proposes **urgent** (consequences land within ~3 workdays, someone is blocked, or a window closes) and **important** (moves an active goal or project, real cost if never done, or prevents future crises), with a one-line reason each. You confirm the whole table at once and correct only what's wrong. Then it records the outcome:

- **Q1 Do** — `priority: high`, offered for today.
- **Q2 Schedule** — `priority: normal`, a concrete `scheduled` date.
- **Q3 Delegate** — `priority: low`, `delegatedTo` plus a check-in date; or *do quickly / schedule / drop* if there's nobody to hand it to.
- **Q4 Drop** — `status: dropped` (the note is never deleted).

## When it triggers
- "prioritise my tasks" / "what should I focus on?"
- "Eisenhower matrix" / "urgent vs important" / "triage my to-do list"
- "what can I drop or delegate?" / "Aufgaben priorisieren"

## How to use it
- **Just ask:** "Prioritise my open tasks." or paste a list: "Triage these: …"
- **Explicitly:** `/self-org:eisenhower`.
- **Typical flow:** collect → proposal table → *Accept all / Adjust some / One by one* → dates for Q2, people for Q3, one confirmation for Q4 → counts per quadrant → offer `alpen`.

## What you get
Updated `Tasks/*.md` frontmatter (`urgent`, `important`, `priority`, and as applicable `scheduled`, `delegatedTo`, `status`), new task notes for anything you listed, and a summary with your Q2 tasks and their dates. In Obsidian, the **Eisenhower** view of `Planning.base` groups open tasks by quadrant (derived from `urgent`/`important`, so editing a checkbox there re-sorts it).

## Reference files
- `skills/eisenhower/references/eisenhower-matrix.md` — the urgency and importance tests, the quadrant table, and the follow-up rules.
- `reference/methods.md` — Eisenhower (1954), Covey (1989/1994), and what the plugin adapts.

## Works well with
- **smart-goals** — goal links are what make tasks important.
- **alpen** — fits Q1 and chosen Q2 tasks into today.
