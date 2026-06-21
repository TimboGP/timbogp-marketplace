---
name: stop-session
description: End the current learning session — update the sub-project's PROGRESS.md (topics + journal), mirror status changes into the .studyenv/PROGRESS.md cross-project tracker, and produce a concise summary of what was covered. Use whenever the user signals the session is over — phrases like "stop session", "let's wrap up", "end session", "we're done for today", or any out-of-character debrief signal (for speech-therapy simulations — "debrief", "end simulation"). Do not invoke this skill proactively at the end of a long conversation unless the user signals it.
---

# Stop a learning session

This skill closes a bracketed session: it records what happened in `PROGRESS.md` and gives the user a summary. It pairs with `start-session`.

## When to use

The user explicitly signals the session is ending: "stop session", "let's wrap up for today", "end session", "we're done". For speech-therapy `simulation` sessions, the signals also include "debrief" and "end simulation" (per the simulation overlay).

Do **not** invoke this skill proactively just because a conversation got long. The user brackets sessions explicitly; respect that.

## What to update

### Sub-project PROGRESS.md

Read and update `.studyenv/<name>/PROGRESS.md` (the sub-project the session ran in):

1. **Topics table** — for each topic touched this session, set the topic's status to the highest stage reached:
   - `introduced` — covered in theory this session (raise from blank)
   - `exercised` — practiced via a practice session (raise from `introduced`)
   - `reviewed` — exercise output / proofs / artifacts reviewed and pushed deeper (raise from `exercised`)

   A topic's status is the **highest stage ever reached** — never downgrade. If a topic was `exercised` and this session only touched theory on it, keep `exercised`.

2. **Status line** — if the sub-project's overall status changed (e.g. `created` → `ready` after first materials added, `ready` → `in progress` after first session), update it. Valid statuses: `created`, `ready`, `in progress`, `blocked` (with reason logged), `stopped`, `finished`. See `../../reference/conventions.md` for definitions.

3. **Journal** — append an entry under today's date summarizing what happened: topics touched and at what new status, exercise outcomes, any notable misconceptions surfaced or breakthroughs, blockers if any.

### Cross-project tracker (`.studyenv/PROGRESS.md`)

Mirror any sub-project status change into the **Projects** table of `.studyenv/PROGRESS.md`. Update the Projects row for this sub-project; the Notes column is a one-line snapshot of where the project is now (typically the latest journal-entry summary, compressed). If `.studyenv/PROGRESS.md` is not found, the sub-project's own `PROGRESS.md` stays the source of truth — tell the user no tracker was located rather than creating one (`bootstrap` owns tracker creation).

## Summarize for the user

After updates are written, give the user a concise summary:

- What was covered (topic(s), session type).
- New status of any topic that moved.
- What looks like a natural next session — but **do not** start it; this skill only closes the current one.

Keep this short. The full record is now in `PROGRESS.md`; the summary is the human-readable highlight reel.

## Simulation debriefs (speech-therapy)

If this session was a `simulation` session under `Domain: speech-therapy`, the active overlay specifies a structured **debrief** that runs out of character before the standard `stop-session` flow. See `../../domains/speech-therapy.md` Phase 3 for the debrief protocol — which conditions were uncovered vs. missed during anamnesis, clinical reasoning, communication, what a supervisor would flag. The session artifacts (transcript, debrief) are written to `.studyenv/<name>/work/cases/<patient-id>/` per the speech-therapy `/work/` layout. After the debrief, this skill's normal `PROGRESS.md` updates still apply.

## Why these rules

- "Highest stage ever reached" status is what makes `PROGRESS.md` a useful map: it answers "have we ever exercised this?" rather than "what did we touch most recently?".
- Mirroring sub-project status into `.studyenv/PROGRESS.md` keeps the cross-project view consistent without requiring the user to do bookkeeping.
- A short human summary at session end matters even with the full record in `PROGRESS.md` — it cues the user's memory for next time.

## Related skills

- `start-session` — opened this session.
- `bootstrap`, `set-curriculum` — the other lifecycle skills.
