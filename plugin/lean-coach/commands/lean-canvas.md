---
description: Build or refine your one-page Lean Canvas (9 blocks) and save it to the .lean/ workspace.
argument-hint: [idea, segment, or path to an existing canvas — optional]
allowed-tools: [Read, Write, Edit, Glob, Grep]
---

# /lean-canvas

Build or revise the **Lean Canvas**. Drive this with the `lean-canvas` skill.

Input: `$ARGUMENTS` (a one-line idea, a customer segment to brainstorm, or a path/“my existing canvas”; if empty, work from `.lean/canvas.md` or ask for the idea).

## Procedure

1. Read `${CLAUDE_PLUGIN_ROOT}/skills/lean-canvas/references/canvas-blocks.md` for per-block guidance, and `.lean/canvas.md` if it exists.
2. Fill the nine blocks **in the recommended order** (Customer Segments → Problem → UVP → Solution → Channels → Revenue → Cost → Key Metrics → Unfair Advantage), interrogating the assumption behind each rather than just filling boxes. Keep entries terse; every block is a hypothesis.
3. Write `.lean/canvas.md` from the template at `${CLAUDE_PLUGIN_ROOT}/skills/lean-canvas/assets/canvas-template.md`, with a dated revision note. Brainstorm variants as separate canvases when there are plausibly different segments/models.
4. End with the one assumption that looks riskiest, and offer to hand off to `prioritize-risks`.

Don't let the Solution block balloon — the model is the product, not the solution.
