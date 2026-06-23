---
description: Quick, scored UX review of a single component or screen — from code, a screenshot, or a live page — via the ux-reviewer agent.
argument-hint: [file|url|screenshot]
allowed-tools: [Read, Glob, Grep, Bash, Task]
---

# /ux-review

Get focused, scored feedback on one component or screen. Delegate to the **ux-reviewer** agent.

Target: `$ARGUMENTS` (a file path, a URL, or a screenshot). If empty, ask for the target.

## Procedure

1. Gather the target: read the file/component, fetch the URL, or take/inspect the screenshot.
2. Launch the `ux-reviewer` agent with the target and ask for a scored review across its four lenses: **usability heuristics, accessibility, visual hierarchy, and interaction feedback**.
3. Present the agent's findings: a short verdict, the per-lens scores, and the prioritized issues with concrete fixes.
4. Offer to apply fixes via the relevant implement skill (`accessible-components`, `interaction-feedback`, `design-tokens`, `ux-copy`).

This is the lightweight counterpart to `/ux-audit` — use it for a single artifact and a fast turnaround.
