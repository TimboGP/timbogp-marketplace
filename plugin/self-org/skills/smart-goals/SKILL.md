---
name: smart-goals
description: This skill should be used when the user wants to turn a project or ambition into concrete, checkable goals, or review progress on them — "set SMART goals for my project", "turn this project description into goals", "help me define goals for X", "make this goal SMART", "is this a good goal?", "review my goals", "how am I doing on my goals?", "SMART-Ziele formulieren", "Ziele für mein Projekt festlegen". It clarifies the project, writes a project note, proposes candidate goals, sharpens each into a Specific, Measurable, Achievable, Relevant, Time-bound goal with a per-letter check, and saves goal notes (optionally with first next-action tasks) to the self-org planning folder. For prioritising tasks use eisenhower; for planning a day use alpen.
version: 0.1.0
---

# SMART goals — from a project description to checkable goals

Turn an overarching project description into a small set of goals the user can actually track, by interviewing them: understand the project, propose candidate goals, sharpen each one letter by letter, check it honestly, save it. Read `../../reference/workspace.md`, `../../reference/schema.md`, and `references/smart-criteria.md` before the first question. Method background and credits: `../../reference/methods.md`.

## When to use

- The user has a project, initiative, or ambition (pasted text, a file, an existing project note) and wants goals for it.
- **Fast path:** the user brings one goal and asks whether it's good or wants it made SMART — skip to step 5 for that goal.
- **Review mode:** the user wants to update progress on existing goals — see *Review mode* below.

Not for triaging tasks (`eisenhower`) or planning today (`alpen`).

## Core stance

- **Outcomes, not activities.** A goal is a measurable end state ("50 weekly sign-ups by 15 Dec"), not work ("build the landing page"). Work becomes next-action tasks.
- **Few goals.** 2–4 per project. If everything is a goal, nothing is; say so when the user wants more.
- **Draft, then ask.** Propose wording, metrics, and dates for the user to pick or correct (see *Asking the user* in `workspace.md`). Never ask an open question you could have drafted an answer to.
- **Honest check, user decides.** Flag every criterion that fails and offer a fix; the user may knowingly accept a gap (Doran allowed that) — record it, don't block.

## Procedure

1. **Preflight.** Resolve the planning root, read the optional `<root>/AGENTS.md`, get today's date (`date +%F`) — all per `workspace.md`.
2. **Understand the project.** Read the description the user gave (or the existing `Projects/<Name>.md`). Extract: the outcome ("done looks like…"), why it matters now, the horizon (an absolute date), and constraints (time budget, people, money, dependencies). Ask **one round** (≤ 3 questions, drafted options) for whatever is missing — usually the horizon and the time budget.
3. **Write the project note.** New project: create `Projects/<Name>.md` from `../../templates/project.md`, keeping the user's description verbatim under *Description*. Existing project: fill only missing fields and append to *Outcome & constraints*; never rewrite. Check the name is unique across the vault first.
4. **Propose candidate goals.** Draft 2–4 outcome goals that together cover the project's "done looks like", each with a draft metric and deadline in one line. Point out overlaps or gaps. Ask which to keep (multi-select; the user can add their own as free text).
5. **Sharpen each kept goal** — one round per goal, ≤ 3 questions:
   - **S** — 2–3 wording variants of the statement (one outcome, one sentence, plain words).
   - **M** — 2–3 metric variants, each `metric · baseline → target · unit`; for qualitative goals, a proxy or a binary milestone with an acceptance criterion (`references/smart-criteria.md`).
   - **T** — 2–3 absolute due dates anchored to the project horizon (e.g. a mid-point milestone vs. the horizon itself).

   Draft **A** (feasibility: capacity vs. time budget, dependencies, *who owns it*) and **R** (which part of the project outcome it moves) yourself and show them in the proposal; ask only if you can't tell.
6. **Check it.** Show a per-letter table — `S / M / A / R / T · pass|fail · one-line reason` — using the tests in `references/smart-criteria.md`. For each fail, offer a drafted fix or "accept with a note". Never save a failing goal silently.
7. **Write the goal note** `Goals/<Name>.md` from `assets/goal-template.md` (frontmatter per `schema.md`; `current` = `baseline`). Add the first Log line: `- YYYY-MM-DD — goal set (baseline <baseline> <unit>).`
8. **Next actions (offer).** Propose 1–3 first tasks per goal: verb-first, finishable in one sitting or one day. On confirmation, create each as `Tasks/<Title>.md` from `../../templates/task.md` with `projects` and `goal` set and **no** `urgent`/`important` (they stay unclassified for `eisenhower`). Remove template lines that have no value. List them as links under the goal's *Next actions*.
9. **Close.** Show a summary table (goal · metric · baseline → target · due), the notes written (relative to the root), and offer to triage the new tasks with `eisenhower`.

## Review mode

Triggered by "review my goals", "update goal progress", "how am I doing on X".

1. Preflight as above; collect `type: goal` notes with `status: active` (for one project or all) by grepping `Goals/*.md`.
2. Show one table: goal · metric · baseline → current → target · due · days left. Ask for the new `current` values in one batch.
3. Update `current`, then per goal:
   - target reached → propose `status: achieved` (confirm);
   - past due and not reached → ask: mark `missed`, extend `due` (with the reason in the Log), or `dropped`;
   - no open task links to it → propose 1–3 next actions (step 8).
4. Append one dated Log line per changed goal: `- YYYY-MM-DD — current <value> <unit> (<short note>).`
5. Close with what changed and, if any goal is behind its straight-line pace, say so plainly.

## Output

`Projects/<Name>.md` (description kept verbatim, outcome, horizon, constraints, embedded goal/task views), one `Goals/<Name>.md` per goal (SMART fields, per-letter check, Log), and optionally unclassified `Tasks/<Title>.md` next actions — plus a summary table in chat.

## Related

- `eisenhower` — triage the next actions this skill creates.
- `alpen` — schedule them into a day.
- `references/smart-criteria.md` — the per-letter tests, metric patterns for qualitative goals, and common failure patterns.
- `assets/goal-template.md` — the goal note format.
