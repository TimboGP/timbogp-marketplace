# Note schema

Shared reference for the `self-org` plugin: the frontmatter of the four note types, how tasks stay compatible with the TaskNotes Obsidian plugin, and how the `Planning.base` dashboard reads them. Read with [`workspace.md`](workspace.md).

**Omit fields that have no value** rather than writing empty keys — a missing `urgent`/`important` is how a task reads as "not yet triaged", both to the skills and to the dashboard.

## Task — `Tasks/<Title>.md`

One note per task. The field names and values are **TaskNotes' defaults**, so the notes work today as plain Markdown and Obsidian Bases, and later as TaskNotes tasks without migration.

```yaml
---
title: Draft the landing page copy
status: open                    # none | open | in-progress | done | dropped
priority: normal                # none | low | normal | high
due: 2026-10-24                 # hard deadline (optional)
scheduled: 2026-10-16           # the day you intend to work on it (optional)
timeEstimate: 90                # minutes (optional until alpen estimates it)
projects:
  - "[[Website relaunch]]"
contexts:
  - writing
goal: "[[Launch site by November]]"   # custom field: the SMART goal it serves
urgent: false                         # custom field: Eisenhower assessment
important: true                       # custom field: Eisenhower assessment
delegatedTo: Alex                     # custom field: only for delegated tasks
tags:
  - task
dateCreated: 2026-10-14T09:12:00+0200
dateModified: 2026-10-14T09:12:00+0200
completedDate: 2026-10-16       # only once status is done
---

Optional free-text notes: context, links, acceptance criteria.
```

- **`tags: [task]` is required** — it's how TaskNotes (default "tag-based identification") and the dashboard recognise a task.
- **`status`**: TaskNotes' four defaults plus **`dropped`** for Eisenhower's "drop" (never delete). `done` and `dropped` are the closed states.
- **`priority` follows the quadrant** whenever the eisenhower or alpen skill classifies a task:

  | urgent | important | Quadrant | Action | priority |
  |---|---|---|---|---|
  | true | true | Q1 | Do | `high` |
  | false | true | Q2 | Schedule | `normal` |
  | true | false | Q3 | Delegate (or do quickly) | `low` |
  | false | false | Q4 | Drop | `none` + `status: dropped` |

  The quadrant itself is **never stored** — it's derived from `urgent`/`important` so it can't drift when the user edits a checkbox in Obsidian.
- **`recurrence`** (written by TaskNotes, RRULE): if a task has it, never set `status: done` — ask the user and leave completion to TaskNotes.
- **Don't write** TaskNotes' `timeEntries`, `blockedBy`, or `reminders`; actual minutes belong in the day note.

### Adopting TaskNotes later

Install TaskNotes, then in its settings: set the default tasks folder to `<root>/Tasks`; keep tag-based identification with `task`; add a status `dropped` marked as *completed*; register `goal`, `urgent`, `important`, `delegatedTo` as user fields. Existing notes need no changes.

## Goal — `Goals/<Name>.md`

```yaml
---
type: goal
project: "[[Website relaunch]]"
status: active                  # active | achieved | missed | dropped
metric: Weekly sign-ups from the new landing page
baseline: 0
target: 50
current: 0
unit: sign-ups/week
due: 2026-12-15
dateCreated: 2026-10-14T09:20:00+0200
---
```

Body sections (from `skills/smart-goals/assets/goal-template.md`): **Statement**, **Why it matters** (R), **Feasibility** (A), **SMART check** (table), **Next actions** (links to task notes), **Log** (dated progress lines, newest last).

## Project — `Projects/<Name>.md`

```yaml
---
type: project
status: active                  # active | paused | done | dropped
description: One-sentence summary of the outcome
due: 2027-03-31                 # optional horizon
dateCreated: 2026-10-14T09:15:00+0200
---
```

Body (from `../templates/project.md`): **Description** (the user's overarching description, kept verbatim), **Outcome & constraints**, and an embedded ` ```base ` block that lists the goals and tasks linking to this project via `file.hasLink(this.file)`.

## Day — `Days/YYYY-MM-DD ALPEN.md`

```yaml
---
type: day
date: 2026-10-14
workdayMinutes: 480             # the working window
capacityMinutes: 288            # workdayMinutes × planned share (default 60 %)
plannedMinutes: 270             # appointments + task estimates in the plan
plannedCount: 6                 # planned task count (appointments excluded)
# written by the evening review:
reviewed: true
doneCount: 4
actualMinutes: 300              # time actually spent on planned tasks
unplannedMinutes: 45            # time on things that weren't in the plan
bufferUsedMinutes: 75           # unplannedMinutes + overruns of planned tasks
estimateRatio: 1.11             # actual ÷ estimate, over planned tasks with actuals
---
```

Body (from `skills/alpen/assets/day-template.md`): **Appointments**, **Plan** (a snapshot table — the task notes stay the source of truth), **Buffer**, **Review** (filled in the evening), **Lessons**.

## The `Planning.base` dashboard

Created from `../templates/planning.base`. It uses only features available since Obsidian 1.10 (table views, `groupBy`, formulas) — no Kanban view, no `groupOrder`.

- A **global filter** `file.inFolder("<vault-relative root>")` keeps it to the planning root.
- **Note types** are told apart by `file.hasTag("task")` (tasks) and `type == "goal"` / `type == "day"`.
- **`formula.quadrant`** derives the Eisenhower group, with a sortable number prefix:

  ```
  if(!file.hasProperty("urgent") || !file.hasProperty("important"), "0 Unclassified",
    if(urgent && important, "1 Do",
      if(important, "2 Schedule",
        if(urgent, "3 Delegate", "4 Drop"))))
  ```

- **Views:** *Today* (open tasks scheduled or due on or before today), *Eisenhower* (open tasks grouped by `formula.quadrant`), *Goals* (grouped by `project`), *Reviews* (day notes, newest first, with the review numbers).

If a view misbehaves on an older Obsidian (e.g. grouping by a formula), the fallback is for the skills to also store a `quadrant` field and group by that — record such a change in the plugin changelog.
