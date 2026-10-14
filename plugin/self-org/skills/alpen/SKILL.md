---
name: alpen
description: This skill should be used when the user wants to plan or review a single day with Lothar Seiwert's ALPEN method — "plan my day", "plan tomorrow", "what should I do today?", "ALPEN", "Tagesplanung", "Tag planen", "review my day", "end-of-day review", "what didn't I finish?", "Tagesrückblick", "Nachkontrolle". Plan mode lists tasks and appointments, estimates durations, caps planned time at about 60% of the working day to keep buffer, cuts by Eisenhower quadrant until the plan fits, and writes a dated day note; review mode marks items done, partial, or not done, carries unfinished tasks forward, and records estimate accuracy and buffer use. For triaging a backlog without planning a day use eisenhower.
version: 0.1.0
---

# ALPEN — plan a realistic day, then review it

Plan one day with the five ALPEN steps — **A**ufgaben (tasks & appointments), **L**änge (estimate), **P**uffer (keep ~40 % free), **E**ntscheidungen (cut and prioritise), **N**achkontrolle (evening review) — and keep the result in a dated day note. Read `../../reference/workspace.md`, `../../reference/schema.md`, and `references/alpen-method.md` first; step E also uses `../eisenhower/references/eisenhower-matrix.md`. Method background and credits: `../../reference/methods.md`.

## Pick the mode

- **Plan** (A-L-P-E) — "plan my day / tomorrow / Friday". Morning, or the evening before.
- **Review** (N) — "review my day", "what didn't I finish". Evening, or the next morning before planning.

If the user just says "ALPEN" or "my day": before the end of their workday and no plan exists for today → plan; a plan exists and the workday is over (or nearly) → review.

## Core stance

- **Plan ~60 %, not 100 %.** The buffer is the method, not slack: interruptions and spontaneous work will come. Appointments count inside the 60 %.
- **Cut before you start, not at 6 pm.** If the list doesn't fit, decide now what moves — by quadrant, not by mood.
- **Task notes are the truth.** The day note's plan table is a snapshot; status, estimates, and dates live in the task notes.
- **Close the loop.** Every planned day gets a review; unfinished work is carried forward deliberately, never silently.

## Plan mode

1. **Preflight.** Resolve the planning root, read `<root>/AGENTS.md` (`Workday:`, `Workdays:`, `Planned share:`, `Estimate factor:`), get today's date and weekday — per `workspace.md`. Fix the **target date** (today, or the next workday for "tomorrow"); the note is `Days/<date> ALPEN.md`.
   - Day note already exists → re-plan inside it: update *Plan*, *Buffer*, and the plan fields in frontmatter; keep anything under *Review*.
   - The most recent earlier day note has no `reviewed: true` → offer to review it first (its carry-overs feed this plan).
2. **A — gather.** Collect open tasks (grep `Tasks/*.md`, see `references/alpen-method.md` for the exact selection): scheduled on or before the target date, due on or before it, Q1 tasks, delegated tasks due for a check-in, and offer up to ~5 Q2 candidates to pick from. Ask once for **appointments** (time, duration, title — kept in the day note only, never as task notes) and anything **new** on the user's mind (each becomes an unclassified task note from `../../templates/task.md`). Show the gathered list as one table.
3. **L — estimate.** For tasks without `timeEstimate`, propose minutes in 15-minute steps (multiply by `Estimate factor` if set, and say so). Confirm all estimates in one batch; write `timeEstimate` to the task notes.
4. **P — capacity.** Working window from `Workday:` (minus breaks), or ask with drafted options. `capacity = round(window × planned share)`; `planned = appointments + task estimates`. Show `planned / capacity` and the buffer that remains.
5. **E — decide.** First give unclassified tasks a quick Eisenhower pass (same heuristics and batch confirmation as `eisenhower`). If `planned > capacity`, propose cuts in this order until it fits: drop Q4 → delegate or move Q3 → move Q2 to another day (propose dates) → shrink scope (split off the part that fits today). If Q1 plus appointments alone exceed capacity, say plainly that the day is overbooked and ask what to renegotiate; if the user accepts the overload, note it under *Buffer*. Then order the plan: appointments at their times, Q1 first in the user's best focus slot, Q2 next, small tasks batched. Offer start times only if the user wants time blocks.
6. **Write.** Create or update the day note from `assets/day-template.md` (frontmatter per `schema.md`: `workdayMinutes`, `capacityMinutes`, `plannedMinutes`, `plannedCount`). On every planned task set `scheduled: <date>`; on moved tasks set their new `scheduled`; on dropped ones `status: dropped` — each with `dateModified`.
7. **Close.** Show the plan table and the buffer, list the notes written, and remind the user to run the review ("review my day") at the end of the day.

## Review mode

1. **Preflight** as above. Target date: today, a date the user names, or the most recent day note without `reviewed: true`.
2. **Load** the day note's plan and the current state of each linked task (something may already be marked done in Obsidian).
3. **Ask in one batch:** for each planned task *done / partial / not done*, with optional actual minutes (draft = the estimate); then *anything unplanned that took real time?* (what, roughly how long).
4. **Apply** to the task notes (targeted edits, `dateModified`):
   - **done** → `status: done`, `completedDate: <date>`; a task with `recurrence` → ask and leave completion to TaskNotes.
   - **partial** → stays open; ask for the remaining minutes and set `timeEstimate` to that; carry over.
   - **not done** → carry over to the next workday (default) or a date the user picks, re-triage it, or drop it.
   - A task now planned and missed on **3 or more** day notes (grep `Days/` for its link) → flag it: split it, re-triage, or drop.
5. **Record** in the day note: fill *Review* (table: task · result · estimate · actual · next) and the unplanned items, then the review fields in frontmatter — `reviewed: true`, `doneCount`, `actualMinutes`, `unplannedMinutes`, `bufferUsedMinutes`, `estimateRatio` (formulas in `references/alpen-method.md`; omit a number you have no data for). Draft one *Lessons* line and let the user edit it.
6. **Calibrate.** Over the last 5 reviewed day notes: average `estimateRatio` above ~1.2 → suggest an `Estimate factor:` in `<root>/AGENTS.md`; `bufferUsedMinutes` regularly above the buffer → suggest a lower `Planned share:`. Offer, never write `AGENTS.md` without a yes.
7. **Close.** Show done / carried / dropped counts, where each carry-over went, and offer to plan the next workday now.

## Output

`Days/YYYY-MM-DD ALPEN.md` — appointments, the plan table, the buffer, and after the evening the review table, unplanned work, numbers, and a lesson — plus updated task notes (`timeEstimate`, `scheduled`, `status`, `completedDate`). The `Today` and `Reviews` views in `Planning.base` read these fields.

## Related

- `eisenhower` — triage a backlog in depth; its heuristics drive step E.
- `smart-goals` — goals give Q2 tasks their importance.
- `references/alpen-method.md` — task selection for step A, the capacity arithmetic, the cut order, and the review formulas.
- `assets/day-template.md` — the day note format.
