# ALPEN — procedure details

Used by the `alpen` skill. Origin and what the plugin adapts: `../../../reference/methods.md`. Field definitions: `../../../reference/schema.md`.

## A — which tasks to gather

From `Tasks/*.md`, open tasks only (`status` not `done`/`dropped`), for target date `D`:

| Source | Selection | Default |
|---|---|---|
| Carry-overs / scheduled | `scheduled <= D` | include |
| Deadlines | `due <= D` (overdue or due that day) | include |
| Q1 | `urgent: true` and `important: true`, not yet scheduled after `D` | include |
| Delegated check-ins | `delegatedTo` set and `scheduled <= D` | include as a 5-minute "check in with …" item |
| Q2 candidates | `important: true`, `urgent: false`, no `scheduled` or `scheduled` within the next week | offer up to ~5, user picks |
| Unclassified | no `urgent`/`important` | include only if scheduled/due as above; triaged in step E |

Plus **appointments** the user lists (fixed time, duration — day note only) and **new tasks** the user mentions (new task notes, unclassified). Don't pull in Q3/Q4 tasks unless they are scheduled or due.

## L — estimating

- Minutes, in 15-minute steps, minimum 15 (5 for delegated check-ins).
- Base the proposal on the title, the body, and similar finished tasks if any.
- If `Estimate factor:` is set in `<root>/AGENTS.md`, multiply proposals by it and say so ("×1.3 from your recent reviews").
- Tasks over ~3 hours: suggest splitting off the part for today (new task note for the remainder, same `projects`/`goal`).

## P — capacity arithmetic

```
window    = working window in minutes, minus breaks     (Workday: or asked)
capacity  = round(window × planned share)               (Planned share: default 60 %)
planned   = Σ appointment minutes + Σ task timeEstimate
buffer    = window − planned
```

Example: 08:00–17:00 with a 60-minute break → window 480, capacity 288. Appointments count inside `planned` — a day with 4 hours of meetings leaves ~48 minutes for tasks, and that's the honest answer.

## E — cut order and ordering

When `planned > capacity`, propose cuts in this order, stopping as soon as it fits:

1. **Q4** in the list → drop (`status: dropped`).
2. **Q3** → delegate (`delegatedTo` + check-in date) or move to another day.
3. **Q2** → move to another day (propose concrete dates; respect `due`).
4. **Shrink scope** → split a task, keep the part that fits today.

Never cut Q1 silently. If Q1 + appointments > capacity, the day is overbooked: ask what to renegotiate (a deadline, a meeting, a delegation) or record the user's knowing acceptance under *Buffer*.

Ordering the plan: appointments at their times; Q1 in the user's best focus slot (ask once if unknown, remember it in `AGENTS.md` only with a yes); then Q2; batch small tasks (≤ 15 min) into one block.

## N — review numbers

Over the planned tasks of the day (appointments excluded):

```
doneCount          = tasks marked done
actualMinutes      = Σ actual minutes reported (done + partial)
unplannedMinutes   = Σ minutes of unplanned work reported
overrun            = Σ max(0, actual − timeEstimate) over tasks with an actual
bufferUsedMinutes  = unplannedMinutes + overrun
estimateRatio      = Σ actual ÷ Σ timeEstimate, over tasks with an actual (2 decimals)
```

Omit a field when there's no data for it (e.g. no actuals given → no `actualMinutes`, no `estimateRatio`). Use the estimate *as planned that morning* (from the day note's plan table), not a value lowered for a partial carry-over.

**Carry-over:** default `scheduled` = next workday per `Workdays:`; never more than once per review without asking. A task that appears in the *Plan* of 3 or more day notes and is still open gets flagged for splitting, re-triage, or dropping.

**Calibration:** look at the last 5 day notes with `reviewed: true`. Mean `estimateRatio` > ~1.2 → suggest `Estimate factor: <mean, rounded to 0.1>`. `bufferUsedMinutes` above `window − capacity` on most of those days → suggest lowering `Planned share:` by 10 points. Suggest only; write `AGENTS.md` only after a yes.
