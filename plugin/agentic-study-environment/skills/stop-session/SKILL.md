---
name: stop-session
description: End the current learning session — update the sub-project's PROGRESS.md (topics + journal), mirror status changes into the .studyenv/PROGRESS.md cross-project tracker (unless the sub-project is Tracking: local-only), and produce a concise summary of what was covered. Use whenever the user signals the session is over — phrases like "stop session", "let's wrap up", "end session", "we're done for today", or any out-of-character role-play debrief signal ("debrief", or a flavor-specific "end simulation" / "end defense" / "end review"). Do not invoke this skill proactively at the end of a long conversation unless the user signals it.
---

# Stop a learning session

This skill closes a bracketed session: it records what happened in `PROGRESS.md` and gives the user a summary. It pairs with `start-session`.

## When to use

The user explicitly signals the session is ending: "stop session", "let's wrap up for today", "end session", "we're done". For `role-play` sessions the signals also include "debrief" plus the flavor-specific signal per the active overlay — "end simulation" (`speech-therapy`), "end defense" (`academic-research`), "end review" (`coding`).

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

First read the sub-project `AGENTS.md` `Tracking:` field (`../../reference/conventions.md` → *Tracking scope*). **If `Tracking: local-only`, skip this section entirely** — the sub-project is self-tracked; do not mirror and do not warn about a missing cross-project tracker.

Otherwise (the `global` default, including an absent field), mirror any sub-project status change into the **Projects** table of `.studyenv/PROGRESS.md`. Update the Projects row for this sub-project; the Notes column is a one-line snapshot of where the project is now (typically the latest journal-entry summary, compressed). If `.studyenv/PROGRESS.md` is not found, the sub-project's own `PROGRESS.md` stays the source of truth — tell the user no tracker was located rather than creating one (`bootstrap` owns tracker creation).

## Summarize for the user

After updates are written, give the user a concise summary:

- What was covered (topic(s), session type).
- New status of any topic that moved.
- What looks like a natural next session — but **do not** start it; this skill only closes the current one.

Keep this short. The full record is now in `PROGRESS.md`; the summary is the human-readable highlight reel.

## Role-play debriefs (simulation, defense, review)

A `role-play` session runs a structured **debrief out of character** before the standard `stop-session` flow (see `../../reference/conventions.md` → *Role-play session protocol (generic)*, Phase 3). The generic move is the same — step out of character, debrief against the overlay's rubric, write artifacts, then run the normal updates below. The flavor supplies the rubric and the artifact path:

- **`simulation`** (`Domain: speech-therapy`) — see `../../domains/speech-therapy.md` Phase 3 (which conditions were uncovered vs. missed during anamnesis, clinical reasoning, communication, what a supervisor would flag). Artifacts go to `.studyenv/<name>/work/cases/<patient-id>/`.
- **`defense`** (`Domain: academic-research`) — see `../../domains/academic-research.md` Phase 3 (which questions were handled vs. fumbled, whether the contribution was defended, soundness of the method/stats answers, what a real committee would flag). Artifacts go to `.studyenv/<name>/work/defenses/<topic-id>/`.
- **`review` / `interview`** (`Domain: coding`) — see `../../domains/coding.md` *Review / interview session protocol* (were design choices justified and edge cases anticipated; for interviews, decomposition / correctness / complexity / communication; what a real reviewer or panel would flag). Artifacts go to `.studyenv/<name>/work/reviews/<change-id>/`.

After the debrief, this skill's normal `PROGRESS.md` updates still apply.

## Onboarding sessions

`onboarding` is **not** in-character, so there is no role-play debrief — it closes through the standard flow above, for any overlay that flavors it (`coding` ships the canonical codebase flavor). When recording it, the Journal entry notes which parts of the corpus were walked and at what comprehension, which recent change was reproduced and how the user's version compared to the real one, and the next part to onboard onto. Topics in the Topics table map to subsystems / areas of the corpus. Artifacts live under `work/onboarding/` (see the active overlay, e.g. `../../domains/coding.md`).

## Why these rules

- "Highest stage ever reached" status is what makes `PROGRESS.md` a useful map: it answers "have we ever exercised this?" rather than "what did we touch most recently?".
- Mirroring sub-project status into `.studyenv/PROGRESS.md` keeps the cross-project view consistent without requiring the user to do bookkeeping.
- A short human summary at session end matters even with the full record in `PROGRESS.md` — it cues the user's memory for next time.

## Related skills

- `start-session` — opened this session.
- `bootstrap`, `set-curriculum` — the other lifecycle skills.
