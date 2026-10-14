# SMART goals — `smart-goals`

> Turn an overarching project description into a few goals you can actually track.

## What it does
Interviews you about a project — outcome, why now, horizon, constraints — and writes a project note that keeps your description verbatim. Then it proposes 2–4 candidate outcome goals, sharpens each one (statement, metric with baseline → target, due date; feasibility and relevance drafted for you), and checks it letter by letter: **S**pecific, **M**easurable, **A**chievable (including *who owns it*, from Doran's original "Assignable"), **R**elevant, **T**ime-bound. Failing criteria get a drafted fix, or you accept the gap knowingly and it's recorded. Finally it offers 1–3 next-action tasks per goal, left unclassified for `eisenhower`.

In **review mode** it updates each active goal's current value, proposes `achieved` / `missed` / extend / drop where due, and appends a dated Log line.

## When it triggers
- "set SMART goals for my project" / "turn this project description into goals"
- "make this goal SMART" / "is this a good goal?"
- "review my goals" / "how am I doing on my goals?"
- "SMART-Ziele formulieren" / "Ziele für mein Projekt festlegen"

## How to use it
- **Just ask:** "Here's my project: … — turn it into SMART goals." (Paste text, or point at a file or an existing project note.)
- **Explicitly:** `/self-org:smart-goals`.
- **Typical flow:** clarify the project (one round of questions) → project note → pick candidate goals → sharpen each → per-letter check → goal notes → next actions → hand off to `eisenhower`.

## What you get
- `Projects/<Name>.md` — description, outcome, horizon, constraints, and an embedded view of its goals and tasks.
- `Goals/<Name>.md` — `metric`, `baseline`, `target`, `current`, `unit`, `due`, `status`; statement, why it matters, feasibility, the SMART check table, next actions, and a dated Log.
- Optionally `Tasks/<Title>.md` next actions (TaskNotes-compatible, unclassified).

## Reference files
- `skills/smart-goals/references/smart-criteria.md` — the per-letter pass tests, metric patterns for qualitative goals, and the common failure patterns it names.
- `skills/smart-goals/assets/goal-template.md` — the goal note format.
- `reference/methods.md` — Doran (1981) and what the plugin adapts.

## Works well with
- **eisenhower** — triage the next actions.
- **alpen** — schedule them into a day.
