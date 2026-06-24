# Stop a learning session — `agentic-study-environment:stop-session`

> Close the current session: update the sub-project's `PROGRESS.md`, mirror status into the cross-project tracker, and hand back a concise summary.

## What it does

This skill ends a bracketed session. It records what happened in the sub-project's `PROGRESS.md` — raising topic statuses to the highest stage reached, updating the overall Status line if it changed, and appending a dated journal entry — then mirrors any status change into the `.studyenv/PROGRESS.md` cross-project tracker. Finally it gives you a short human-readable summary of what was covered and a suggested next session (without starting it). It pairs with `start-session`.

## When it triggers

Skills activate automatically based on your request. This one triggers on phrases like:
- "stop session"
- "let's wrap up" / "let's wrap up for today"
- "end session"
- "we're done for today"
- **Role-play debrief signals:** "debrief", plus the flavor-specific signal — "end simulation" (speech-therapy), "end defense" (academic-research), "end review" (coding).

It is **not** invoked proactively just because a conversation got long — you bracket sessions explicitly.

## How to use it

- **Just ask:**
  - "Okay, stop session."
  - "We're done for today, wrap up."
  - "Debrief and end the simulation."
- **Where it sits in the lifecycle:** `bootstrap → set-curriculum → start-session ⇄ stop-session` — this is the closing half of the recurring study loop.
- **Typical flow:**
  1. For a `role-play` session (`simulation`/`defense`/`review`), run the overlay's structured out-of-character **debrief** first.
  2. Update the sub-project's `.studyenv/<name>/PROGRESS.md` Topics table — set each touched topic to its highest stage (`introduced` → `exercised` → `reviewed`), never downgrading.
  3. Update the sub-project Status line if it changed (e.g. `ready` → `in progress`); log a reason if `blocked`.
  4. Append a dated journal entry summarizing topics touched, exercise outcomes, misconceptions, breakthroughs, blockers.
  5. Mirror the status change into the Projects table of `.studyenv/PROGRESS.md` — unless the sub-project is `Tracking: local-only`, in which case this step is skipped.
  6. Give the user a concise summary.

## Reads / writes

Reads and writes the sub-project's `.studyenv/<name>/PROGRESS.md` (Topics table, Status line, dated Journal). Unless the sub-project is `Tracking: local-only`, it also mirrors the sub-project's status and a one-line Notes snapshot into the Projects table of the cross-project tracker `.studyenv/PROGRESS.md`. For `role-play` debriefs, transcript/debrief artifacts go to `.studyenv/<name>/work/cases/<patient-id>/` (`simulation`), `.studyenv/<name>/work/defenses/<topic-id>/` (`defense`), or `.studyenv/<name>/work/reviews/<change-id>/` (coding `review`/`interview`). Under `global` tracking, if `.studyenv/PROGRESS.md` is not found the sub-project's own `PROGRESS.md` stays the source of truth — the skill tells you no tracker was located rather than creating one (`bootstrap` owns tracker creation).

## Notes & tips

- **Role-play debriefs:** `role-play` flavors (`simulation`, `defense`, coding `review`/`interview`) run a structured overlay-defined debrief before the standard updates — e.g. which conditions/questions were handled vs. missed, and what a supervisor, committee, or reviewer would flag.
- **The overlay shapes the close:** overlays refine `stop-session` only for the `role-play` type's debrief; otherwise the generic update flow applies.
- **Tracking scope:** under `Tracking: local-only` the cross-project mirror is skipped entirely (and no missing-tracker warning is shown); only the sub-project's own `PROGRESS.md` is updated.
- **Start ⇄ stop pairing:** this is where the session is actually saved. `start-session` records nothing — if you skip `stop-session`, no topic status, journal entry, or tracker update is written.
- **Status legends touched here:** topic statuses `introduced` · `exercised` · `reviewed` (highest stage ever reached, never downgraded), and sub-project statuses `created` · `ready` · `in progress` · `blocked` (reason logged) · `stopped` · `finished`.
