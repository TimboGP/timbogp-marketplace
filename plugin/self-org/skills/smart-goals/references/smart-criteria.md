# SMART criteria — the per-letter tests

Used by the `smart-goals` skill for drafting (step 5) and checking (step 6). Origin and what the plugin adapts: `../../../reference/methods.md`.

Each letter has a **pass test** you can apply to the written goal alone, without asking the user. If you can't decide from the text, that's a fail ("unclear") — offer a fix.

## S — Specific

**Pass if** the statement names one outcome, in one sentence, that a stranger could tell apart from neighbouring outcomes.

- Fail: "Improve the website" (which part? improved how?).
- Fail: two outcomes joined by "and" → split into two goals or drop one.
- Pass: "New visitors can sign up for the beta from the landing page."

## M — Measurable

**Pass if** there is a metric, a baseline, a target, and a unit, and it's clear *where the number comes from* (analytics, a count, a test result, a yes/no check).

Patterns when the goal is qualitative:

- **Proxy metric** — something countable that moves when the real thing does ("weekly active users" for "people find it useful"; "pages drafted" for "write the thesis").
- **Binary milestone with acceptance criterion** — baseline 0, target 1, unit "milestone", plus the concrete check that makes it 1 ("published on the company site and linked from the docs"). Use sparingly — they hide progress until the end.
- **Scale rating** — self-rated 1–10 against a written description of 3/6/9, re-rated at the same interval. Weakest option; say so.

Fails: no baseline ("get more users"), a vanity metric that can rise while the outcome doesn't (page views for "people sign up"), a target with no unit.

## A — Achievable (keeps Doran's "Assignable")

**Pass if** all three hold:

1. **Owner** — one person is accountable (by default, the user). "The team" is a fail unless the user owns the team.
2. **Capacity** — the effort plausibly fits the time budget before the due date. Rough is fine: estimate the effort in days/weeks and compare with the available hours from the project's constraints.
3. **Dependencies** — anything outside the owner's control is named, with what happens if it slips.

Stretch goals are fine if the user says they are; record "stretch" in the note.

## R — Relevant

**Pass if** you can name which part of the project's "done looks like" this goal moves, in one line. If the project would be done without it, it's not relevant to *this* project — suggest moving it or dropping it.

## T — Time-bound

**Pass if** `due` is an absolute date (`YYYY-MM-DD`), on or before the project horizon (or deliberately after, with a note), and not in the past.

- Fail: "soon", "Q4", "by the end of the year" → convert to a date and confirm.
- For long goals (> ~3 months), suggest a dated mid-point checkpoint in the Log or as a separate goal.

## Common failure patterns (call these out by name)

- **Activity goal** — "build X", "write Y": the work, not the result. Ask "what will be true once that's done?"
- **Vanity metric** — a number that's easy to raise without the outcome changing.
- **Missing baseline** — progress can't be shown later; ask for today's value or measure it as a first task.
- **Too many goals** — more than four for one project; ask which two would make the others easier or unnecessary.
- **Hidden dependency** — the goal only moves when someone else acts; make that explicit under *Feasibility*.
