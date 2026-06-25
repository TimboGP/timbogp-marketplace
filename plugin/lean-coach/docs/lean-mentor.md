# Lean Mentor agent — `lean-mentor`

> A one-shot, scored Lean review of a venture's whole model.

## What it does
A specialized subagent (Claude Code) that reads the `.lean/` workspace — canvas, risks, progress, and any interview/experiment/metrics artifacts — and returns a prioritized **Lean review**: the current stage with the evidence for it, the riskiest untested assumptions ranked, the weakest canvas blocks, and the single next experiment to run. It scores five lenses (stage honesty, canvas quality, risk prioritization, evidence/validation, next-step focus) 1–5 and leads with an honest one-line verdict. It frames findings as advice to apply, not orders to follow (the advisor paradox).

## When to use it
- "review my whole business model and tell me what to focus on"
- "give me a mentor review" / "what would an advisor say about my plan?"
- "where are the holes in my startup?" / a fast outside-in read before deciding what's next

Prefer it for a **fast, whole-venture verdict** from the persisted state. For an **interactive** mentor (or devil's-advocate) conversation, use the [`lean-roles`](lean-roles.md) skill. For building the canvas or testing one assumption, use [`lean-canvas`](lean-canvas.md) / [`customer-interview`](customer-interview.md) / [`run-experiment`](run-experiment.md).

## How to use it
- **Just ask:** "Run a mentor review over my workspace." Claude Code launches the agent.
- It reads `.lean/` (read-only — `tools: [Read, Grep, Glob]`) and returns the report; it doesn't modify your files.

## What you get
A compact scored report: verdict, five lens scores, ranked riskiest untested assumptions (each with the smallest test), weakest canvas blocks with how to sharpen them, the single thing to do next, and genuine strengths.

## Claude Code & Codex
This agent is a **Claude Code convenience**. On Codex there is no agent concept — use the [`lean-roles`](lean-roles.md) skill's **Mentor** role for the same review, interactively.
