---
description: Run or practice a customer interview (Problem, Solution, or MVP) — the agent role-plays a realistic customer, then debriefs.
argument-hint: [problem | solution | mvp — optional]
allowed-tools: [Read, Write, Edit, Glob, Grep]
---

# /lean-interview

Run a **customer interview** role-play. Drive this with the `customer-interview` skill (Customer role-play role).

Flavor: `$ARGUMENTS` (`problem`, `solution`, or `mvp`). If empty, infer from the venture's stage in `.lean/PROGRESS.md` and propose one.

## Procedure

1. Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-interview/references/interview-scripts.md` for the chosen flavor's script, and `.lean/canvas.md` for the Customer Segment / Early Adopter to base the persona on.
2. Run the **role-play protocol** (`${CLAUDE_PLUGIN_ROOT}/reference/roles.md`): Phase 0 set up the scene out of character (confirm flavor, format, and the `debrief` / `[bracket]` signals); Phases 1–2 stay in character as a believable customer (realistic friction, no rescue, no coaching mid-scene); Phase 3 break character on `debrief` and assess against the technique + learning rubric.
3. Write the result to `.lean/interviews/<flavor>/<YYYY-MM-DD>-<label>.md` using the debrief template; update `.lean/PROGRESS.md`.

If the user only wants prep (scripts/questions, or a critique of their own script), do that instead of role-play.
