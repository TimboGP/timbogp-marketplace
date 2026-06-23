---
description: Run a combined usability + accessibility audit on a page, component, or screenshot and produce a single scored report.
argument-hint: [path|url|screenshot]
allowed-tools: [Read, Glob, Grep, Bash]
---

# /ux-audit

Audit the target for both **usability** and **accessibility**, then produce one consolidated, scored report.

Target: `$ARGUMENTS` (a file path, a URL, a screenshot, or — if empty — ask what to audit, defaulting to the current project's entry HTML/page if obvious).

## Procedure

1. **Identify the target.** Resolve `$ARGUMENTS`. If it is source code or a project, locate the relevant view(s). If a URL/file, prefer running automated checks.
2. **Usability pass.** Apply the `ux-audit` skill: evaluate against Nielsen's 10 heuristics + IA/navigation + task flow + content hierarchy + consistency. Rate each finding on the 0–4 severity scale.
3. **Accessibility pass.** Apply the `accessibility-audit` skill: WCAG 2.2 AA via POUR. Run the bundled `contrast.mjs` on key color pairs and, for a live URL/HTML file, `axe-scan.mjs` if its deps are available. Assign Critical/Serious/Moderate/Minor severities mapped to success criteria.
4. **Consolidate & score.** Merge into one report:
   - A **summary scorecard**: usability verdict + heuristic scores, accessibility verdict (Fail/Conditional/Pass for AA) + counts by severity.
   - **Top issues** ranked by severity × frequency × impact.
   - **Findings** grouped by area, each with location, impact, and a concrete fix.
   - A **Quick wins vs. larger investments** split.
5. **Offer next steps.** Where fixes mean code, offer to apply them via `accessible-components`, `interaction-feedback`, `design-tokens`, or `ux-copy`.

Keep the report skimmable. Lead with the verdict and the top issues.
