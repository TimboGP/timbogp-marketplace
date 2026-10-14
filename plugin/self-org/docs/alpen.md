# ALPEN — `alpen`

> Plan a realistic day with Lothar Seiwert's ALPEN method, then review it in the evening.

## What it does
**Plan mode** walks the five steps for one day:

- **A — Aufgaben:** gathers open tasks scheduled or due by that day, Q1 tasks, delegated check-ins, and a few Q2 candidates to pick from; asks for appointments and anything new on your mind.
- **L — Länge:** proposes estimates in 15-minute steps (scaled by your calibration factor, if you have one) and saves them as `timeEstimate`.
- **P — Puffer:** caps planned time — appointments included — at 60 % of your working window (configurable), so 40 % stays free for the unexpected.
- **E — Entscheidungen:** triages unclassified tasks, then cuts until the plan fits: drop Q4 → delegate/move Q3 → move Q2 → shrink scope. If Q1 alone overflows, it says the day is overbooked and asks what to renegotiate.
- Writes `Days/YYYY-MM-DD ALPEN.md` and sets `scheduled` on every planned task.

**Review mode** — **N, Nachkontrolle:** asks done / partial / not done (and optional actual minutes) for each planned task plus any unplanned work; marks tasks done, carries the rest to the next workday (or re-triages / drops them), flags tasks carried over three or more times, and records the day's numbers — `doneCount`, `actualMinutes`, `unplannedMinutes`, `bufferUsedMinutes`, `estimateRatio` — and one lesson. After a few reviews it suggests an estimate factor or a different planned share.

## When it triggers
- "plan my day" / "plan tomorrow" / "what should I do today?" / "ALPEN" / "Tag planen"
- "review my day" / "end-of-day review" / "what didn't I finish?" / "Tagesrückblick"

## How to use it
- **Just ask:** "Plan my day — I have a 10:00 stand-up (15 min) and a 14:00 review (60 min)."
- **Explicitly:** `/self-org:alpen`.
- **Settings** (optional, in `<planning root>/AGENTS.md`): `Workday: 08:30–17:00, 45 min break`, `Workdays: Mon–Fri`, `Planned share: 60%`, `Estimate factor: 1.2`.

## What you get
- `Days/YYYY-MM-DD ALPEN.md` — appointments, the plan table (task, quadrant, estimate, optional start time), the buffer arithmetic, and after the evening the review table, unplanned work, the numbers, and a lesson.
- Updated task notes: `timeEstimate`, `scheduled`, `status`, `completedDate`.
- In Obsidian, the **Today** and **Reviews** views of `Planning.base`.

## Reference files
- `skills/alpen/references/alpen-method.md` — task selection for A, the capacity arithmetic, the cut order, the review formulas, and calibration.
- `skills/alpen/assets/day-template.md` — the day note format.
- `reference/methods.md` — Seiwert, the 60:40 rule, and what the plugin adapts.

## Works well with
- **eisenhower** — triage a backlog in depth before planning.
- **smart-goals** — goals give Q2 tasks their importance; review goals weekly.
